const { QRAdmins, Events, sequelize, CAs } = require('../models');
const { BadRequestError, UnauthorizedError, UnauthenticatedError } = require('../errors');
const { sign } = require('jsonwebtoken');
const { hashSync, compare } = require('bcryptjs');
const saltRounds = process.env.SALT;
const { attachTokenToResponse } = require('../utils/createToken');

const qrAdminReg = async (req, res) => {
  const { userName, password, event } = req.body;
  if (userName && password && event) {
    const isAlreadyExist = await QRAdmins.findOne({
      where: { userName: userName },
    });
    if (isAlreadyExist) {
      return res.json({ succeed: false, msg: 'account already exist' });
    }
    const hashedPass = hashSync(password, Number(saltRounds));
    const newQRAdmin = await QRAdmins.create({
      userName,
      password: hashedPass,
      event,
    });
    delete newQRAdmin.password;
    res.status(201).json({ succeed: true, result: newQRAdmin });
  } else {
    throw new BadRequestError('Input fields should not be empty');
  }
};

const qrAdminLogin = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    throw new BadRequestError('Username or Password should not be empty');
  }
  const qrAdmin = await QRAdmins.findOne({ where: { userName: userName } });
  if (!qrAdmin) {
    throw new BadRequestError(`${userName} does not exist`);
  }
  const match = await compare(password, qrAdmin.password);
  if (!match) {
    throw new BadRequestError('Wrong username and password combination');
  }
  const user = {
    id: qrAdmin.id,
    userName: qrAdmin.userName,
    event: qrAdmin.event,
  };
  const token = sign(user, process.env.QR_SECRET, {
    expiresIn: '5h',
  });
  attachTokenToResponse('token', { res, token, expiresInDay: 1 });
  res.json({ succeed: true, msg: 'successfully logged in' });
};

const qrLogOut = (req, res) => {
  res.clearCookie('token');
  res.json({
    succeed: true,
    msg: 'successfully logged out. Please login again to access your account',
  });
};

const allQRUsers = async (req, res) => {
  const data = await QRAdmins.findAll({
    attributes: ['id', 'userName', 'scanned', 'event'],
  });
  res.json({ succeed: true, result: data });
};

const getQRUser = async (req, res) => {
  const qrAdmin = req.qrAdmin;

  const eventName = await Events.findOne(
    { attributes: ['name'] },
    { where: { value: qrAdmin.event } }
  );
  const scanned = await QRAdmins.findOne(
    { attributes: ['scanned'] },
    { where: { value: qrAdmin.event } }
  );
  if (eventName !== null) {
    qrAdmin.eventName = eventName.name;
    qrAdmin.scanned = scanned.scanned;
    res.json({ succeed: true, result: qrAdmin });
  } else {
    res.json({ succeed: false, msg: 'did not found the name' });
  }
};

const deleteQrUser = async (req, res) => {
  const id = req.params.id;
  const metadata = await QRAdmins.destroy({ where: { id: id } });
  if (metadata > 0) {
    // cmnt
    res.json({ succeed: true, msg: 'successfully deleted' });
  } else {
    res.json({ succeed: false, msg: 'could not match the id' });
  }
};

//scanning funtonality
const scanQr = async (req, res) => {
  const code = req.params.code;
  const eventName = req.qrAdmin.event;

  const [[targetClient]] = await sequelize.query(
    `SELECT eventInfo,teamName,paidEvent,parId,CAId FROM parevents WHERE clientQR='${code}'`
  );
  if (!targetClient) throw new UnauthorizedError(`${code} is unauthorized`);

  const { CAId, parId } = targetClient;

  const [[clientFullInfo]] = await sequelize.query(
    `SELECT id,fullName,institute,className,image,userName,caRef FROM ${
      parId ? 'participants' : 'cas'
    } WHERE id=${parId ? `'${parId}'` : `'${CAId}'`}`
  );
  const targetEvent = JSON.parse(targetClient.eventInfo);
  //verification and pass

  const found = await CAs.findOne({
    where: { userName: clientFullInfo.userName },
    attributes: ['blocked', 'used', 'code'],
  });

  let caRef = null;

  if (clientFullInfo.caRef) {
    caRef = await CAs.findOne({
      where: { code: clientFullInfo.caRef },
      attributes: ['fullName', 'used', 'code'],
    });
  }
  // cmnt
  res.json({
    succeed: true,
    msg: targetEvent[`${eventName}`] === 0 ? `Ready to go` : `Already scanned`,
    result: {
      ...clientFullInfo,
      events: targetClient.eventInfo,
      team: targetClient.teamName,
      paid: targetClient.paidEvent,
      caRef: caRef ? caRef?.fullName + '(' + caRef?.code + ')' : 'None',
      isCa: found && !found?.blocked ? 'Yes' : 'No',
    },
  });
};

const scanQrEmail = async (req, res) => {
  const email = req.body.email;
  const eventName = req.qrAdmin.event;

  const [[clientFullInfo]] = await sequelize.query(
    `SELECT id,fullName,institute,className,image,userName,caRef,qrCode FROM participants WHERE email='${email}'`
  );
  console.log(clientFullInfo);
  const [[targetClient]] = await sequelize.query(
    `SELECT eventInfo,teamName,paidEvent,parId,CAId FROM parevents WHERE clientQR='${clientFullInfo.qrCode}'`
  );
  if (!targetClient) throw new UnauthorizedError(`${email} is unauthorized`);

  const targetEvent = JSON.parse(targetClient.eventInfo);
  //verification and pass

  const found = await CAs.findOne({
    where: { userName: clientFullInfo.userName },
    attributes: ['blocked', 'used', 'code'],
  });

  let caRef = null;

  if (clientFullInfo.caRef) {
    caRef = await CAs.findOne({
      where: { code: clientFullInfo.caRef },
      attributes: ['fullName', 'used', 'code'],
    });
  }
  // cmnt
  res.json({
    succeed: true,
    msg: targetEvent[`${eventName}`] === 0 ? `Ready to go` : `Already scanned`,
    result: {
      ...clientFullInfo,
      events: targetClient.eventInfo,
      team: targetClient.teamName,
      paid: targetClient.paidEvent,
      caRef: caRef ? caRef?.fullName + '(' + caRef?.code + ')' : 'None',
      isCa: found && !found?.blocked ? 'Yes' : 'No',
    },
  });
};

const updateEventInfo = async (req, res) => {
  const { updateType, selectedEvent } = req.body;
  if (!(updateType === true || updateType === false))
    throw new UnauthenticatedError('Wrong update type Entered');
  const code = req.params.code;
  let eventName;
  if (!selectedEvent) {
    eventName = req.qrAdmin.event;
  } else {
    eventName = selectedEvent;
  }

  const [metadata] = await sequelize.query(`UPDATE parevents
SET eventInfo=JSON_REPLACE(eventInfo,"$.${eventName}",${updateType ? 1 : 0})
WHERE clientQR='${code}';`);

  if (metadata.changedRows === 0) {
    return res.json({
      succeed: false,
      msg: `did not match any record or Already updated to ${updateType ? 1 : 0} in the past`,
    });
  }

  res.json({
    succeed: true,
    msg: 'Database updated',
  });
};

const qrSearchText = async (req, res) => {
  const text = req.params.text;
  const [[searchPermit]] = await sequelize.query(`SELECT searchPermit FROM pagesettings`);
  if (searchPermit.searchPermit === 1) {
    let [par] = await sequelize.query(
      `SELECT fullName,qrCode,institute FROM participants WHERE fullName LIKE '${text}%'`
    );
    let [ca] = await sequelize.query(
      `SELECT fullName,code,institute FROM cas WHERE fullName LIKE '${text}%'`
    );

    res.json({ succeed: true, result: [...par, ...ca] });
  } else {
    throw new UnauthorizedError('Not permitted by the admin, please ask for permission');
  }
};

module.exports = {
  qrAdminReg,
  qrAdminLogin,
  getQRUser,
  deleteQrUser,
  allQRUsers,
  qrLogOut,
  scanQr,
  updateEventInfo,
  qrSearchText,
  scanQrEmail,
};
