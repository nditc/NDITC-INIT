const { PageSettings, CAs, sequelize, Sequelize, Participants, CPartners, Events, ParEvents } = require('../models');
const { BadRequestError } = require('../errors');
const { writeFileSync } = require('fs');
const deleteFile = require('../utils/deleteFile');

const getAllSetting = async (req, res) => {
  const result = await PageSettings.findAll({});
  const totalIncome = await Participants.findAll({
    attributes: [
      [Sequelize.fn('SUM', Sequelize.cast(Sequelize.col('boothFee'), 'integer')), 'sum'],
    ],
  });
  result[0].totalIncome = totalIncome[0].dataValues?.sum;
  console.log(totalIncome[0].dataValues?.sum, result[0].totalIncome);
  res.json({
    succeed: true,
    result: [{ ...result[0].dataValues, totalIncome: totalIncome[0].dataValues?.sum }],
  });
};

const setPermits = async (req, res) => {
  const { permitName, permitType } = req.body;
  const id = 1;
  const settings = await PageSettings.findByPk(id);

  if (settings.id == id) {
    await PageSettings.update({ [`${permitName}`]: permitType }, { where: { id: id } });
    res.json({ succeed: true, msg: 'successfully updated the permission' });
  } else {
    throw new BadRequestError('did not provide the correct permit value');
  }
};

const blockCA = async (req, res) => {
  const { userName, blockState } = req.body;
  // cmnt
  await CAs.update({ blocked: blockState }, { where: { userName: userName } });
  res.status(200).json({
    succeed: true,
    msg: `successfully ${blockState ? 'blocked' : 'unblocked'} ${userName}`,
    blockeState: blockState,
  });
};

const blockCPartner = async (req, res) => {
  const { userName, blockState } = req.body;
  await CPartners.update({ blocked: blockState }, { where: { userName: userName } });
  res.status(200).json({
    succeed: true,
    msg: `successfully ${blockState ? 'blocked' : 'unblocked'} ${userName}`,
    blockeState: blockState,
  });
};

const deleteCA = async (req, res) => {
  const { userId } = req.body;
  const ca = await CAs.findByPk(userId);
  if (!ca) {
    throw new BadRequestError('CA not found');
  }
  if (ca.image) {
    deleteFile(ca.image);
  }
  await CAs.destroy({ where: { id: userId } });
  res.status(200).json({
    succeed: true,
    msg: `successfully deleted CA ${ca.fullName}`,
  });
};

const deleteCPartner = async (req, res) => {
  const { userId } = req.body;
  const cp = await CPartners.findByPk(userId);
  if (!cp) {
    throw new BadRequestError('Club Partner not found');
  }
  if (cp.image) {
    deleteFile(cp.image);
  }
  await CPartners.destroy({ where: { id: userId } });
  res.status(200).json({
    succeed: true,
    msg: `successfully deleted Club Partner ${cp.fullName}`,
  });
};

const caPointEdit = async (req, res) => {
  const { userName, usedPoint } = req.body;
  await CAs.update({ used: usedPoint }, { where: { userName: userName } });
  res.status(200).json({
    succeed: true,
    msg: `successfully changed point to ${usedPoint} for ${userName}`,
    newCount: usedPoint,
  });
};

const downloadData = async (req, res) => {
  const { eventValue, transactionStatus } = req.body;
  if (!eventValue) {
    throw new BadRequestError('Must enter the parametres');
  }

  const [result] = await sequelize.query(
    `SELECT par.id,par.fullName,par.email,pe.transactionID,pe.transactionNum,pe.paidEvent,pe.fee,par.phone,pe.teamName FROM participants as par LEFT JOIN parevents as pe ON par.id=pe.parId WHERE ${
      transactionStatus === 'all'
        ? `JSON_EXTRACT(pe.paidEvent, "$.${eventValue}") =0 or JSON_EXTRACT(pe.paidEvent, "$.${eventValue}") =1`
        : `JSON_EXTRACT(pe.paidEvent, "$.${eventValue}") =${transactionStatus === true ? 1 : 0}`
    }`
  );

  const newResult = result?.map((value) => {
    let { id, fullName, email, phone, fee, teamName, paidEvent, transactionID, transactionNum } =
      value;
    teamName = JSON.parse(teamName);
    paidEvent = JSON.parse(paidEvent);
    transactionID = JSON.parse(transactionID);
    transactionNum = JSON.parse(transactionNum);
    fee = JSON.parse(fee);

    return {
      id,
      email,
      transactionID: transactionID[eventValue],
      transactionNumber: transactionNum[eventValue],
      eventName: eventValue,
      fullName,
      paymentStatus: paidEvent[eventValue],
      fee: fee[eventValue],
      teamName: teamName[eventValue],
      phone,
    };
  });

  writeFileSync(`./downloads/${eventValue}.txt`, JSON.stringify(newResult, null, ' '));
  res.download(`./downloads/${eventValue}.txt`, 'files');
};

const resetPoints = async (req, res) => {
  await CAs.update({ used: 0 }, { where: {} });
  await CPartners.update({ used: 0 }, { where: {} });
  res.json({ succeed: true, msg: 'All CA and Partner points reset to 0' });
};

const recalculatePoints = async (req, res) => {
  const events = await Events.findAll({ attributes: ['value', 'caPoints', 'paid'] });
  const eventPointMap = {};
  events.forEach((ev) => {
    eventPointMap[ev.value] = {
      points: ev.caPoints || 0,
      isPaid: ev.paid,
    };
  });

  const participants = await Participants.findAll({
    attributes: ['id', 'caRef', 'cpRef'],
    include: [
      {
        model: ParEvents,
        as: 'ParEvent',
        attributes: ['eventInfo', 'paidEvent', 'transactionID'],
      },
    ],
  });

  const caPointsAccumulator = {};
  const cpPointsAccumulator = {};

  participants.forEach((par) => {
    if (par.ParEvent) {
      const eventInfo = JSON.parse(par.ParEvent.eventInfo || '{}');
      const paidEvent = JSON.parse(par.ParEvent.paidEvent || '{}');
      const transactionID = JSON.parse(par.ParEvent.transactionID || '{}');
      let total = 0;

      // Iterate through all selected events in eventInfo
      Object.keys(eventInfo).forEach((evName) => {
        const eventData = eventPointMap[evName];
        if (!eventData) return;

        const isBooth = transactionID[evName] === 'Booth';

        if (!eventData.isPaid || isBooth) {
          // If free event OR registration done via Admin panel (Booth), add points immediately
          total += eventData.points;
        } else if (paidEvent[evName] === 1) {
          // If paid online event, add only if verified (1)
          total += eventData.points;
        }
      });

      if (total > 0) {
        if (par.caRef) {
          caPointsAccumulator[par.caRef] = (caPointsAccumulator[par.caRef] || 0) + total;
        }
        if (par.cpRef) {
          cpPointsAccumulator[par.cpRef] = (cpPointsAccumulator[par.cpRef] || 0) + total;
        }
      }
    }
  });

  // Transaction for consistency
  await sequelize.transaction(async (t) => {
    // Reset first
    await CAs.update({ used: 0 }, { where: {}, transaction: t });
    await CPartners.update({ used: 0 }, { where: {}, transaction: t });

    // Update CAs
    for (const code of Object.keys(caPointsAccumulator)) {
      await CAs.update({ used: caPointsAccumulator[code] }, { where: { code }, transaction: t });
    }
    // Update CPartners
    for (const code of Object.keys(cpPointsAccumulator)) {
      await CPartners.update({ used: cpPointsAccumulator[code] }, { where: { code }, transaction: t });
    }
  });

  res.json({ succeed: true, msg: 'Points recalculated and updated successfully' });
};

module.exports = {
  setPermits,
  getAllSetting,
  blockCA,
  blockCPartner,
  deleteCA,
  deleteCPartner,
  caPointEdit,
  downloadData,
  resetPoints,
  recalculatePoints,
};
