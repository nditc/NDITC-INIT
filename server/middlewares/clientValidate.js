const { CAs, Participants, sequelize, PageSettings, CPartners } = require('../models');
const uniqid = require('uniqid');
const { validate } = require('deep-email-validator');
const { UnauthenticatedError, BadRequestError } = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const deleteFile = require('../utils/deleteFile');
const hashSalt = Number(process.env.SALT);

const passwordValidate = async (req, res, next) => {
  const { id, mode } = req.user;
  const { password } = req.body;
  if (!password) {
  }
  if (mode === 'par') {
    const clientUser = await Participants.findByPk(id, {
      attributes: ['password'],
    });
    const match = await compare(password, clientUser.password);
    if (!match) {
      throw new UnauthenticatedError('wrong password entered');
    } else next();
  } else if (mode === 'ca') {
    const clientUser = await CAs.findByPk(id, { attributes: ['password'] });
    const match = await compare(password, clientUser.password);
    if (!match) {
      throw new UnauthenticatedError('wrong password entered');
    } else next();
  }
};

// permit validates
const caPermitValidate = async (req, res, next) => {
  const [isCAPermitted] = await PageSettings.findAll({
    attributes: ['caRegPermit'],
  });
  if (isCAPermitted.caRegPermit === true) {
    next();
  } else {
    res.status(400).json({
      succeed: false,
      msg: 'We are not taking CA right now. The registration portal is turned off.',
    });
  }
};

const cpartnerPermitValidate = async (req, res, next) => {
  const [isCPPermitted] = await PageSettings.findAll({
    attributes: ['cpartnerRegPermit'],
  });
  if (isCPPermitted.cpartnerRegPermit === true) {
    next();
  } else {
    res.status(400).json({
      succeed: false,
      msg: 'We are not taking Campus Partners right now. The registration portal is turned off.',
    });
  }
};

const caRegValidate = async (req, res, next) => {
  const {
    fullName,
    fb,
    institute,
    className,
    address,
    email,
    phone,
    description,
    image,
    userName,
  } = req.body;
  if (fullName && fb && institute && className && address && email && phone && image) {
    const isEmailThere = await CAs.findOne({ where: { email: email } });
    const isPartner = await CPartners.findOne({ where: { email: email } });
    const userData = await Participants.findOne({ where: { email: email } });

    if (!userData) {
      throw new UnauthenticatedError(`Not a valid user`);
    }
    if (isEmailThere) {
      throw new UnauthenticatedError(`Already registered CA with ${email}`);
    }
    if (isPartner) {
      throw new UnauthenticatedError(`You are already a Club Partner and cannot apply as a CA.`);
    }

    const code = uniqid.time();
    const eventInfo = { snack: 0, lunch: 0 };
    const data = {
      code: code,
      blocked: true,
      fullName: fullName.trim(),
      fb,
      institute,
      className,
      address,
      image,
      email,
      phone: phone.trim(),
      userName,
      description,
    };

    req.mode = 'ca';
    req.user = data;
    req.userData = userData;
    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

const cpartnerRegValidate = async (req, res, next) => {
  const {
    fullName,
    fb,
    institute,
    clubName,
    designation,
    address,
    email,
    phone,
    description,
    image,
    userName,
  } = req.body;
  if (fullName && fb && institute && clubName && designation && address && email && phone && image) {
    const isEmailThere = await CPartners.findOne({ where: { email: email } });
    const isCA = await CAs.findOne({ where: { email: email } });
    const userData = await Participants.findOne({ where: { email: email } });

    if (!userData) {
      throw new UnauthenticatedError(`Not a valid user`);
    }
    if (isEmailThere) {
      throw new UnauthenticatedError(`Already registered Partner with ${email}`);
    }
    if (isCA) {
      throw new UnauthenticatedError(`You are already a CA and cannot apply as a Club Partner.`);
    }

    const code = uniqid.time();
    const data = {
      code: code,
      blocked: true,
      fullName: fullName.trim(),
      fb,
      institute,
      clubName,
      designation,
      address,
      image,
      email,
      phone: phone.trim(),
      userName,
      description,
    };

    req.mode = 'cpartner';
    req.user = data;
    req.userData = userData;
    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

const parRegValidate = async (req, res, next) => {
  // cmnt
  const { fullName, fb, institute, className, address, email, phone, password, CAref, CPref } = req.body;
  if (fullName && fb && institute && className && address && email && phone && password) {
    const isEmailThere = await Participants.findOne({ where: { email: email } });
    if (isEmailThere) {
      deleteFile(req.file.path);
      throw new UnauthenticatedError(`Already registered with ${email}`);
    }

    //ca ref update
    let targetCACode;
    if (CAref) {
      targetCACode = await sequelize.query(`SELECT used FROM cas WHERE code='${CAref}'`);
      if (targetCACode[0].length > 0) {
        // Do Something
      } else {
        deleteFile(req.file.path);
        throw new BadRequestError(
          'Please provide the correct CA reference code or simply ingnore the CAref field'
        );
      }
    }

    //partner ref update
    if (CPref) {
      const targetCPCode = await sequelize.query(`SELECT used FROM cpartners WHERE code='${CPref}'`);
      if (targetCPCode[0].length === 0) {
        deleteFile(req.file.path);
        throw new BadRequestError(
          'Please provide the correct Partner reference code or simply ignore the CPref field'
        );
      }
    }

    const hashedPass = hashSync(password, hashSalt);
    const image = req.file.path;
    const code = 'NOT_SET';

    //working with events fees (paid)
    const events = { snack: 0, lunch: 0 };

    const data = {
      qrCode: code,
      caRef: CAref || null,
      cpRef: CPref || null,
      fullName: fullName.trim(),
      fb,
      institute,
      className,
      address,
      image,
      email,
      phone: phone.trim(),
      userName: req.userName,
      password: hashedPass,
    };

    req.mode = 'participant';
    req.eventsRel = {
      eventInfo: JSON.stringify({ ...events }),
      clientQR: code,
    };
    req.user = data;
    next();
  } else {
    deleteFile(req.file.path);
    throw new BadRequestError('Input fields should not be empty');
  }
};

const parRegValidateAdmin = async (req, res, next) => {
  // cmnt
  const { fullName, fb, institute, className, address, email, phone, CAref, CPref, boothFee, checkedIn } =
    req.body;

  const password = process.env.D_PASS || 'default';

  if (fullName && email) {
    const isEmailThere = await Participants.findOne({ where: { email: email } });
    if (isEmailThere) {
      await Participants.increment('boothFee', { by: boothFee, where: { email: email } });

      res.json({ succeed: true, msg: `Already registered with ${email}` });
    }

    //ca ref update
    let targetCACode;
    if (CAref) {
      targetCACode = await sequelize.query(`SELECT used FROM cas WHERE code='${CAref}'`);
      if (targetCACode[0].length > 0) {
        const targetCAused = targetCACode[0][0].used;
        const increasedUsed = Number(targetCAused) + 1;
        await CAs.update({ used: increasedUsed }, { where: { code: CAref } });
      } else {
        throw new BadRequestError(
          'Please provide the correct CA reference code or simply ingnore the CAref field'
        );
      }
    }

    //partner ref update
    if (CPref) {
      const targetCPCode = await sequelize.query(`SELECT used FROM cpartners WHERE code='${CPref}'`);
      if (targetCPCode[0].length > 0) {
        const targetCPused = targetCPCode[0][0].used;
        const increasedUsed = Number(targetCPused) + 1;
        await CPartners.update({ used: increasedUsed }, { where: { code: CPref } });
      } else {
        throw new BadRequestError(
          'Please provide the correct Partner reference code or simply ignore the CPref field'
        );
      }
    }

    const hashedPass = hashSync(password, hashSalt);
    const image = 'https://dummyimage.com/500x500/24124b/FFFFFF.jpg&text=B';
    const code = 'NOT_SET';

    //working with events fees (paid)
    const events = { snack: 0, lunch: 0 };

    const data = {
      qrCode: code,
      caRef: CAref || null,
      cpRef: CPref || null,
      fullName: fullName.trim(),
      fb: fb || '',
      institute: institute || '',
      className: className || '',
      address: address || '',
      image,
      email,
      phone: phone.trim(),
      userName: req.userName || fullName + '@' + Math.floor(Math.random() * 10),
      password: hashedPass,
      boothReg: true,
      boothFee: boothFee || 0,
      checkedIn: checkedIn == 'on' ? true : false,
    };

    req.mode = 'participant';
    req.eventsRel = {
      eventInfo: JSON.stringify({ ...events }),
      clientQR: code,
    };
    req.user = data;
    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

module.exports = {
  caRegValidate,
  parRegValidate,
  passwordValidate,
  caPermitValidate,
  cpartnerPermitValidate,
  parRegValidateAdmin,
  cpartnerRegValidate,
};
