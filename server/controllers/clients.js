const { CAs, ParEvents, Participants, sequelize, CPartners } = require('../models');
const { BadRequestError, UnauthenticatedError, NotFoundError } = require('../errors');
const { hashSync, compare } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { attachTokenToResponse } = require('../utils/createToken');
const deleteFile = require('../utils/deleteFile');
const mailer = require('../utils/sendMail');
const sendSMS = require('../utils/sendSMS');
const { where } = require('sequelize');
const { Op } = require('@sequelize/core');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const registration = async (req, res) => {
  if (req.mode === 'ca') {
    const newCA = await CAs.create(req.user);

    await ParEvents.update({ CAId: newCA.id }, { where: { parId: req.userData.id } });

    // mailer({ client: newCA, event }, 'ca').catch((err) => {
    //   // // cmnt
    // });
  } else if (req.mode === 'cpartner') {
    const newCPartner = await CPartners.create(req.user);

    await ParEvents.update({ CPartnerId: newCPartner.id }, { where: { parId: req.userData.id } });
  } else {
    const newPar = await Participants.create(req.user);

    let qrCode = Number(newPar.id).toString(16);

    qrCode = 'u' + '0'.repeat(Math.max(4 - qrCode.length, 0)) + qrCode;

    req.eventsRel.parId = newPar.id;
    req.eventsRel.clientQR = qrCode;

    const event = await ParEvents.create(req.eventsRel);
    await Participants.update({ qrCode }, { returning: true, where: { id: newPar.id } });

    const updatedNewPar = await Participants.findByPk(newPar.id);

    // console.log(updatedNewPar);

    function SendVerificationMail() {
      let sendMode = 'email'; // TODO: decide sendMode based on the req.body
      // // const { email, mode, sendMode, number } = req.body;
      // let finder = {
      //   [sendMode === "sms" ? "phone" : "email"]:
      //     sendMode === "sms" ? number : email,
      // };

      // 1. Create a fingerprint using the user's current record
      const fingerprint = crypto
        .createHash('sha256')
        .update(updatedNewPar.updatedAt.toString() + newPar.verified)
        .digest('hex')
        .substring(0, 10);

      const claims = {
        sub: newPar.id, // The "Subject" (the real ID you need)
        fp: fingerprint, // The security stamp
      };

      const secretKey = process.env.JWT_SECRET || 'your-very-secure-and-long-secret-key';

      // Shorter expiry is safer for URL-based tokens
      const options = {
        expiresIn: '1h',
        issuer: 'nditc',
      };

      const token = jwt.sign(claims, secretKey, options);

      // URL-safe encoding is crucial
      let verificationLink = `${req.headers.origin}/verify?token=${encodeURIComponent(token)}`;

      // mailing and sms the verification link
      if (sendMode === 'sms' && number) {
        let hostUrl = undefined;
        if (req.headers.origin) hostUrl = new URL(req.headers.origin);
        sendSMS(
          number,
          `Your ${hostUrl.host || 'verifyAccount'} verification link is ${verificationLink}`
        )
          .then((res) => {
            // // cmnt
          })
          .catch((err) => {});
      } else if (sendMode === 'email') {
        mailer(
          {
            client: {
              fullName: req.user.fullName,
              email: req.user.email,
            },
            info: {
              verificationLink: verificationLink,
            },
          },
          'verifyAccount'
        ).catch((err) => {});
      } else {
        throw new BadRequestError('Email id or number must be provided');
      }
    }

    SendVerificationMail();

    // mailer({ client: newPar, event }, 'par').catch((err) => {
    //   // // cmnt
    // });
  }

  res.status(StatusCodes.CREATED).json({
    succeed: true,
    msg: 'Finalize your registration by verifying your account. Please check your email or mobile for the verification link.',
  });
};

const login = async (req, res) => {
  let clientUser;
  const { email, password, mode } = req.body;

  if (!email || !password)
    return res.json({
      succeed: false,
      msg: 'Email or Password should not be empty.',
    });
  if (mode === 'par') {
    clientUser = await Participants.findOne({ where: { email: email } });
  } else if (mode === 'ca') {
    clientUser = await CAs.findOne({ where: { email: email } });
  } else if (mode === 'cpartner') {
    clientUser = await CPartners.findOne({ where: { email: email } });
  } else {
    throw new BadRequestError('wrong mode value');
  }

  if (!clientUser)
    return res.json({
      succeed: false,
      msg: `${email} does not exist for ${mode === 'par' ? 'participant' : 'CA'}`,
    });

  const match = await compare(password, clientUser.password);
  if (!match) {
    if (req.signedCookies) {
      res.clearCookie('token');
    }
    return res.json({
      succeed: false,
      msg: 'Wrong email and password combination.',
    });
  }

  if (clientUser.verified === false) {
    res.clearCookie('token');
    return res.json({
      succeed: false,
      msg: 'Your email is not verified. Please verify your email to complete login.',
    });
  }

  const user = {
    id: clientUser.id,
    userName: clientUser.userName,
    mode: mode,
  };

  const token = sign(user, process.env.CLIENT_SECRET, {
    expiresIn: 60 * 60 * 24 * 30,
  });
  attachTokenToResponse('token', { res, token, expiresInDay: 30 });
  res.json({
    succeed: true,
    msg: `Successfully logged in as ${clientUser.fullName}`,
    username: clientUser.userName,
  });
};

const logout = (req, res) => {
  res.clearCookie('token');
  res.json({
    succeed: true,
    msg: 'Successfully logged out. Please login again to access your account.',
  });
};

const getUser = async (req, res) => {
  const { mode, id } = req.user;
  const events = await ParEvents.findOne({
    where: { [mode === 'par' ? 'parId' : mode === 'ca' ? 'CAId' : 'CPartnerId']: id },
    attributes: ['eventInfo'],
  });
  let extraInfo = null;

  if (mode === 'par') {
    extraInfo = await Participants.findOne({
      where: { id },
      attributes: [
        'fullName',
        'image',
        'email',
        'phone',
        'institute',
        'className',
        'userName',
        'address',
        'fb',
        'qrCode',
      ],
    });
  } else if (mode === 'ca') {
    extraInfo = await CAs.findOne({
      where: { id },
      attributes: [
        'fullName',
        'image',
        'email',
        'phone',
        'institute',
        'className',
        'userName',
        'address',
        'fb',
      ],
    });
  } else if (mode === 'cpartner') {
    extraInfo = await CPartners.findOne({
      where: { id },
      attributes: [
        'fullName',
        'image',
        'email',
        'phone',
        'institute',
        'clubName',
        'designation',
        'userName',
        'address',
        'fb',
      ],
    });
  }

  if (!extraInfo) {
    throw new NotFoundError('User profile not found');
  }

  let parsedEventInfo = {};
  try {
    const rawEventInfo = events?.dataValues?.eventInfo;
    parsedEventInfo = rawEventInfo ? JSON.parse(rawEventInfo) : {};
  } catch {
    parsedEventInfo = {};
  }

  let found;
  if (mode === 'cpartner') {
    found = await CPartners.findOne({
      where: { userName: extraInfo.dataValues.userName },
      attributes: ['blocked', 'used', 'code'],
    });
  } else {
    found = await CAs.findOne({
      where: { userName: extraInfo.dataValues.userName },
      attributes: ['blocked', 'used', 'code'],
    });
  }

  extraInfo.dataValues.isAppliedClient = found !== null;
  if (found) {
    extraInfo.dataValues.isApproved = !found?.dataValues?.blocked;
  } else {
    extraInfo.dataValues.isApproved = false;
  }

  const result = {
    ...req.user,
    ...extraInfo.dataValues,
    clientData: { points: found?.dataValues?.used, code: found?.dataValues?.code },
    clientEvents: Object.keys(parsedEventInfo),
  };
  // cmnt
  res.json({ succeed: true, result });
};

const deleteClient = async (req, res) => {
  const { password } = req.body;
  const id = req.user.id;
  const mode = req.user.mode;
  if (!password) throw new BadRequestError('you should provide the password first');

  let clientUser = null;
  if (mode === 'par') {
    clientUser = await Participants.findByPk(id, {
      attributes: ['password', 'image'],
    });
    const match = await compare(password, clientUser.password);
    if (!match) {
      throw new UnauthenticatedError('wrong password Entered');
    }
    await Participants.destroy({ where: { id: id } });
  } else if (mode === 'ca') {
    clientUser = await CAs.findByPk(id, { attributes: ['password', 'image'] });
    const match = await compare(password, clientUser.password);

    if (!match) {
      throw new UnauthenticatedError('wrong password Entered');
    }
    await CAs.destroy({ where: { id: id } });
  } else if (mode === 'cpartner') {
    clientUser = await CPartners.findByPk(id, { attributes: ['password', 'image'] });
    const match = await compare(password, clientUser.password);

    if (!match) {
      throw new UnauthenticatedError('wrong password Entered');
    }
    await CPartners.destroy({ where: { id: id } });
  }

  if (clientUser && clientUser.image) deleteFile(clientUser.image);
  res.clearCookie('token');
  res.json({ succeed: true, msg: 'delete succeed' });
};

const resetPassSetToken = async (req, res) => {
  let clientUser;
  const { email, mode, sendMode, number } = req.body;
  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']: sendMode === 'sms' ? number : email,
  };

  if (mode === 'par') {
    clientUser = await Participants.findOne({
      attributes: ['email', 'phone', 'fullName'],
      where: finder,
    });
  } else if (mode === 'ca') {
    clientUser = await CAs.findOne({
      attributes: ['email', 'phone', 'fullName'],
      where: finder,
    });
  } else if (mode === 'cpartner') {
    clientUser = await CPartners.findOne({
      attributes: ['email', 'phone', 'fullName'],
      where: finder,
    });
  } else {
    throw new UnauthenticatedError('wrong mode value entered');
  }
  if (!clientUser) {
    throw new NotFoundError(
      `user with this ${sendMode === 'sms' ? 'number' : 'email'} does not exist`
    );
  }
  let otp = new Date().getTime().toString() + Math.random().toString().slice(2);
  otp = otp.substring(otp.length - 4, otp.length);

  // mailing and sms the otp
  if (sendMode === 'sms' && number) {
    let hostUrl = undefined;
    if (req.headers.origin) hostUrl = new URL(req.headers.origin);
    sendSMS(number, `Your ${hostUrl.host || 'resetPass'} OTP code is ${otp}`)
      .then((res) => {
        // // cmnt
      })
      .catch((err) => {});
  } else if (email) {
    mailer(
      {
        client: {
          fullName: clientUser.fullName,
          email: clientUser.email,
        },
        info: {
          otp,
        },
      },
      'resetPass'
    ).catch((err) => {
      console.log(err);
    });
  } else {
    throw new BadRequestError('Email id or number must be provided');
  }

  const minute = 10;
  const expiresIn = (Date.now() + minute * 60 * 1000).toString();
  let metadata;

  const updateObj = {
    otp: otp,
    otpTime: expiresIn,
    otpCount: 0,
  };

  if (mode === 'par') {
    [metadata] = await Participants.update(updateObj, { where: finder });
  } else if (mode === 'ca') {
    [metadata] = await CAs.update(updateObj, { where: finder });
  } else if (mode === 'cpartner') {
    [metadata] = await CPartners.update(updateObj, { where: finder });
  }

  if (metadata == 0) {
    res.json({
      succeed: false,
      msg: 'Something went wrong. Please try again later',
    });
  }

  res.json({
    succeed: true,
    msg: `${sendMode === 'sms' ? 'A sms' : 'An email'} with OTP was sent to ${
      sendMode === 'sms' ? clientUser.phone : clientUser.email
    }`,
  });
};

const resetPassVerify = async (req, res) => {
  const { email, otp, password, mode, phone, clientMode, sendMode } = req.body;
  const maxOtpCount = 10;

  // cmnt

  let finder = {
    [sendMode === 'sms' ? 'phone' : 'email']: sendMode === 'sms' ? phone : email,
  };

  let otpData;
  if (clientMode === 'par') {
    otpData = await Participants.findOne({
      attributes: ['otp', 'otpCount', 'otpTime'],
      where: finder,
    });
  } else if (clientMode === 'ca') {
    otpData = await CAs.findOne({
      attributes: ['otp', 'otpCount', 'otpTime'],
      where: finder,
    });
  } else if (clientMode === 'cpartner') {
    otpData = await CPartners.findOne({
      attributes: ['otp', 'otpCount', 'otpTime'],
      where: finder,
    });
  }

  if (!otpData)
    throw new UnauthenticatedError(
      'did not match any record, please try with the correct email or mobile number'
    );

  if (mode === 'ov' && Date.now() <= Number(otpData.otpTime)) {
    if (clientMode === 'par') await Participants.increment('otpCount', { by: 1, where: finder });
    else if (clientMode === 'ca') await CAs.increment('otpCount', { by: 1, where: finder });
    else if (clientMode === 'cpartner')
      await CPartners.increment('otpCount', { by: 1, where: finder });
  }

  if (Date.now() > Number(otpData.otpTime))
    throw new UnauthenticatedError('OTP timeout. Please request for another.');
  else if (otpData.otpCount > maxOtpCount)
    throw new UnauthenticatedError('OTP became invalid. Please request for another.');
  else if (otp !== otpData.otp) throw new UnauthenticatedError('Invalid OTP entered.');

  if (mode === 'ov') {
    return res.json({ succeed: true, msg: 'otp verifyed', type: mode });
  }

  if (mode !== 'ov') {
    const hassedPass = hashSync(password, Number(process.env.SALT));

    if (clientMode === 'par') {
      await Participants.update(
        { password: hassedPass, verified: true },
        { where: { [email ? 'email' : 'phone']: email ? email : phone } }
      );
    } else if (clientMode === 'ca') {
      await CAs.update({ password: hassedPass }, { where: { email: email } });
    } else if (clientMode === 'cpartner') {
      await CPartners.update({ password: hassedPass }, { where: { email: email } });
    } else {
      throw new UnauthenticatedError('wrong mode value entered');
    }

    res.json({
      succeed: true,
      msg: 'Your password was changed successfully. Please login with the new password',
    });
  }
};

const finalizeVerification = async (req, res) => {
  try {
    const body = req.body;
    const token = body.token;
    if (!token) return res.status(400).json({ succeed: false, msg: 'Missing token.' });

    const secretKey = process.env.JWT_SECRET || 'your-very-secure-and-long-secret-key';

    // 1. Decipher the token
    const decoded = jwt.verify(token, secretKey);
    const parID = decoded.sub;
    const tokenFingerprint = decoded.fp;

    // 2. Fetch the user from the DB using the parID from the token
    const user = await Participants.findOne({ where: { id: parID } });
    if (!user) return res.status(404).json({ succeed: false, msg: 'User not found.' });

    const currentFingerprint = crypto
      .createHash('sha256')
      .update(user.updatedAt.toString() + user.verified)
      .digest('hex')
      .substring(0, 10);

    if (tokenFingerprint !== currentFingerprint) {
      return res.status(401).json({ succeed: false, msg: 'Link is invalid or already used.' });
    }

    // 4. Verification successful!
    await Participants.update({ verified: true }, { where: { id: parID } });

    res.status(StatusCodes.OK).json({
      succeed: true,
      msg: 'Your account has been successfully verified.',
    });
  } catch (err) {
    return res.status(401).json({ succeed: false, msg: 'Invalid or expired link.' });
  }
};

const getEventBasedCount = async (req, res) => {
  const value = req.params.value;
  const searchKey = req.query.searchKey || '';

  let countResult;
  if (value === 'allPar') {
    [[countResult]] = await sequelize.query(
      `SELECT COUNT(*) FROM participants WHERE email LIKE '${searchKey}%' OR fullName LIKE '${searchKey}%'`
    );
  } else if (value === 'cas') {
    [[countResult]] = await sequelize.query(
      `SELECT COUNT(*) FROM cas WHERE email LIKE '${searchKey}%' OR fullName LIKE '${searchKey}%'`
    );
  } else if (value === 'cpartners') {
    [[countResult]] = await sequelize.query(
      `SELECT COUNT(*) FROM cpartners WHERE email LIKE '${searchKey}%' OR fullName LIKE '${searchKey}%'`
    );
  } else {
    [[countResult]] = await sequelize.query(
      `SELECT COUNT(*) FROM participants as par LEFT JOIN parevents as pe ON par.id=pe.parId LEFT JOIN teams as teamd ON JSON_VALUE(pe.teamName, "$.${value}")=teamd.name WHERE (par.email LIKE '${searchKey}%' OR par.fullName LIKE '${searchKey}%') and (JSON_EXTRACT(eventInfo, "$.${value}") =0 or JSON_EXTRACT(eventInfo, "$.${value}") =1);`
    );
  }

  res.json({ succeed: true, result: countResult['COUNT(*)'] });
};

const allPointOrderedCAs = async (req, res) => {
  const { skip, rowNum } = req.body;
  if (skip === '' || skip === null || skip === undefined || !rowNum) {
    throw new BadRequestError('skip or rows field must not be empty');
  }
  const result = await CAs.findAll({
    attributes: [
      'id',
      'fullName',
      'image',
      'used',
      'institute',
      'code',
      'userName',
      'email',
      'className',
      'address',
    ],
    order: [['used', 'DESC']],
    offset: Number(skip),
    limit: Number(rowNum),
    where: { blocked: false },
  });
  res.json({ succeed: true, result: result });
};

const getAllClients = async (req, res) => {
  const mode = req.params.mode;
  const { skip, rowNum, searchKey } = req.body;
  if (skip === '' || skip === null || skip === undefined || !rowNum)
    throw new BadRequestError('skip or rows field must not be empty');

  let result;
  if (mode === 'allPar') {
    [result] = await sequelize.query(
      `SELECT par.id,par.qrCode,par.fullName,par.checkedIn,par.fb,par.institute,par.className,par.address,par.image,par.email,par.phone,par.userName, pe.eventInfo,pe.teamName,pe.paidEvent,pe.fee,pe.transactionID,pe.transactionNum,pe.SubLinks,pe.SubNames,pe.roll_no FROM participants as par LEFT JOIN parevents as pe ON par.id=pe.parId WHERE par.email LIKE '${searchKey}%' OR par.fullName LIKE '${searchKey}%' LIMIT ${skip},${rowNum};`
    );
  } else if (mode === 'cas') {
    result = await CAs.findAll({
      include: {
        model: ParEvents,
        as: 'ParEvent',
        attributes: ['eventInfo'],
      },
      attributes: { exclude: ['password'] },
      offset: Number(skip),
      limit: Number(rowNum),
      order: [['used', 'DESC']],
      where: {
        [Op.or]: {
          fullName: { [Op.like]: searchKey + '%' },
          email: { [Op.like]: searchKey + '%' },
        },
      },
    });
  } else if (mode === 'cpartners') {
    result = await CPartners.findAll({
      include: {
        model: ParEvents,
        as: 'ParEvent',
        attributes: ['eventInfo'],
      },
      attributes: { exclude: ['password'] },
      offset: Number(skip),
      limit: Number(rowNum),
      order: [['used', 'DESC']],
      where: {
        [Op.or]: {
          fullName: { [Op.like]: searchKey + '%' },
          email: { [Op.like]: searchKey + '%' },
        },
      },
    });
  } else {
    [result] = await sequelize.query(
      `SELECT par.id,par.qrCode,par.fullName,par.fb,par.institute,par.className,par.address,par.image,teamd.members,par.email,par.phone,par.userName, pe.eventInfo,pe.teamName,pe.paidEvent,pe.fee,pe.transactionID,pe.transactionNum,pe.SubLinks,pe.SubNames,pe.roll_no FROM participants as par LEFT JOIN parevents as pe ON par.id=pe.parId LEFT JOIN teams as teamd ON JSON_VALUE(pe.teamName, "$.${mode}")=teamd.name   WHERE (par.email LIKE '${searchKey}%' or par.fullName LIKE '${searchKey}%') and (JSON_EXTRACT(pe.eventInfo, "$.${mode}") =0 or JSON_EXTRACT(pe.eventInfo, "$.${mode}") =1) LIMIT ${skip},${rowNum};`
    );
  }
  res.json({ succeed: true, result: result });
};

const getClientOnId = async (req, res) => {
  const { id, userName, mode } = req.user;
  const username = req.params.username;
  if (userName !== username) {
    return res.json({
      succeed: false,
      type: 'rdView',
      msg: 'access denied',
    });
  }
  let clientUser;
  if (mode === 'par') {
    clientUser = await Participants.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
      include: {
        model: ParEvents,
        as: 'ParEvent',
      },
    });

    res.json({
      succeed: true,
      mode: mode,
      result: clientUser,
      msg: 'participant found',
    });
  } else if (mode === 'ca') {
    clientUser = await CAs.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
      include: {
        model: ParEvents,
        as: 'ParEvent',
      },
    });
    res.json({
      succeed: true,
      mode: mode,
      result: clientUser,
      msg: 'CA found',
    });
  } else if (mode === 'cpartner') {
    clientUser = await CPartners.findOne({
      where: { id: id },
      attributes: { exclude: ['password'] },
      include: {
        model: ParEvents,
        as: 'ParEvent',
      },
    });
    res.json({
      succeed: true,
      mode: mode,
      result: clientUser,
      msg: 'Partner found',
    });
  } else {
    res.json({
      succeed: false,
      msg: 'something went wrong finding the client',
    });
  }
};

const profileView = async (req, res) => {
  const userName = req.params.username;
  let targetClient = undefined;
  targetClient = await Participants.findOne({
    attributes: ['fullName', 'userName', 'institute', 'image'],
    where: { userName: userName },
  });
  if (!targetClient) {
    targetClient = await CAs.findOne({
      attributes: ['fullName', 'userName', 'institute', 'image', 'code', 'used'],
      where: { userName: userName },
    });
  }
  if (!targetClient) {
    targetClient = await CPartners.findOne({
      attributes: ['fullName', 'userName', 'institute', 'image', 'code', 'used', 'clubName', 'designation'],
      where: { userName: userName },
    });
  }

  if (!targetClient) {
    res.json({
      succeed: false,
      msg: 'Could not find any participant, CA or Partner',
      result: {},
    });
  } else {
    res.json({
      succeed: true,
      msg: 'Successfully found',
      result: targetClient,
    });
  }
};

module.exports = {
  registration,
  finalizeVerification,
  login,
  logout,
  getUser,
  deleteClient,
  resetPassSetToken,
  resetPassVerify,
  getEventBasedCount,
  allPointOrderedCAs,
  getAllClients,
  getClientOnId,
  profileView,
};
