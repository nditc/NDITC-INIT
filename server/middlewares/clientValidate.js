const { CAs, Participants, sequelize, PageSettings } = require('../models');
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
    if (isEmailThere) {
      throw new UnauthenticatedError(`Already registered with ${email}`);
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
    req.eventsRel = { eventInfo: JSON.stringify(eventInfo), clientQR: code };
    req.user = data;
    next();
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};
const parRegValidate = async (req, res, next) => {
  // cmnt
  const { fullName, fb, institute, className, address, email, phone, password, CAref } = req.body;
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
        const targetCAused = targetCACode[0][0].used;
        const increasedUsed = Number(targetCAused) + 1;
        await CAs.update({ used: increasedUsed }, { where: { code: CAref } });
      } else {
        deleteFile(req.file.path);
        throw new BadRequestError(
          'Please provide the correct CA reference code or simply ingnore the CAref field'
        );
      }
    }

    const hashedPass = hashSync(password, hashSalt);
    const image = req.file.path;
    const code = fullName.split(' ')[0].toLowerCase() + uniqid.time();

    //working with events fees (paid)
    const events = { snack: 0, lunch: 0 };

    const data = {
      qrCode: code,
      caRef: CAref || null,
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
  const { fullName, fb, institute, className, address, email, phone, CAref } = req.body;

  const password = process.env.D_PASS || 'default';

  if (fullName && email) {
    const isEmailThere = await Participants.findOne({ where: { email: email } });
    if (isEmailThere) {
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

    const hashedPass = hashSync(password, hashSalt);
    const image = 'https://dummyimage.com/500x500/24124b/FFFFFF.jpg&text=B';
    const code = fullName.split(' ')[0].toLowerCase() + uniqid.time();

    //working with events fees (paid)
    const events = { snack: 0, lunch: 0 };

    const data = {
      qrCode: code,
      caRef: CAref || null,
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
  parRegValidateAdmin,
};
