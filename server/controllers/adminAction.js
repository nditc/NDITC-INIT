const { PageSettings, CAs, sequelize } = require('../models')
const { BadRequestError } = require('../errors')
const { writeFileSync } = require('fs')

const getAllSetting = async (req, res) => {
  const result = await PageSettings.findAll({})
  res.json({ succeed: true, result: result })
}

const setPermits = async (req, res) => {
  const { permitName, permitType } = req.body
  const id = req.params.id
  const settings = await PageSettings.findByPk(id)

  if (settings.id == id) {
    await PageSettings.update(
      { [`${permitName}`]: permitType },
      { where: { id: id } }
    )
    res.json({ succeed: true, msg: 'successfully updated the permission' })
  } else {
    throw new BadRequestError('did not provide the correct permit value')
  }
}

const blockCA = async (req, res) => {
  const { userName, blockState } = req.body
  await CAs.update({ blocked: blockState }, { where: { userName: userName } })
  res.status(200).json({
    succeed: true,
    msg: `successfully ${blockState ? 'blocked' : 'unblocked'} ${userName}`,
    blockeState: blockState,
  })
}

const caPointEdit = async (req, res) => {
  const { userName, usedPoint } = req.body
  await CAs.update({ used: usedPoint }, { where: { userName: userName } })
  res.status(200).json({
    succeed: true,
    msg: `successfully changed point to ${usedPoint} for ${userName}`,
    newCount: usedPoint,
  })
}

const downloadData = async (req, res) => {
  const { eventValue, transactionStatus } = req.body
  if (!eventValue) {
    throw new BadRequestError('Must enter the parametres')
  }

  const [result] = await sequelize.query(
    `SELECT par.id,par.fullName,par.email,pe.transactionID,pe.transactionNum,pe.paidEvent,pe.fee,par.phone,pe.teamName FROM participants as par LEFT JOIN parevents as pe ON par.id=pe.parId WHERE ${
      transactionStatus === 'all'
        ? `JSON_EXTRACT(pe.paidEvent, "$.${eventValue}") =0 or JSON_EXTRACT(pe.paidEvent, "$.${eventValue}") =1`
        : `JSON_EXTRACT(pe.paidEvent, "$.${eventValue}") =${
            transactionStatus === true ? 1 : 0
          }`
    }`
  )

  const newResult = result?.map((value) => {
    let {
      id,
      fullName,
      email,
      phone,
      fee,
      teamName,
      paidEvent,
      transactionID,
      transactionNum,
    } = value
    teamName = JSON.parse(teamName)
    paidEvent = JSON.parse(paidEvent)
    transactionID = JSON.parse(transactionID)
    transactionNum = JSON.parse(transactionNum)
    fee = JSON.parse(fee)

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
    }
  })

  writeFileSync(
    `./downloads/${eventValue}.txt`,
    JSON.stringify(newResult, null, ' ')
  )
  res.download(`./downloads/${eventValue}.txt`, 'files')
}

module.exports = {
  setPermits,
  getAllSetting,
  blockCA,
  caPointEdit,
  downloadData,
}
