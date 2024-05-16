const { Events } = require('../models')
const { BadRequestError } = require('../errors')
const deleteFile = require('../utils/deleteFile')

const addEvent = async (req, res) => {
  const data = req.event
  const addedData = await Events.create(data)
  res.status(201).json({ succeed: true, result: addedData })
}

const getAllEvents = async (req, res) => {
  const isValue = req.query.value
  let events = []
  if (isValue == 1) {
    events = await Events.findAll({
      attributes: ['value', 'name', 'category'],
    })
  } else {
    events = await Events.findAll({
      attributes: ['name', 'id', 'value', 'category', 'image', 'team', 'type'],
    })
  }

  res.json({ succeed: true, result: events })
}

const getAllDataWithEvents = async (req, res) => {
  const events = await Events.findAll({})
  res.json({ succeed: true, result: events })
}

const getSingleEvent = async (req, res) => {
  const eventValue = req.params.eventValue
  const event = await Events.findOne({ where: { value: eventValue } })
  if (event) {
    return res.json({ succeed: true, result: event })
  } else {
    throw new BadRequestError('value did not match any event')
  }
}

const editEventBody = async (req, res) => {
  const {
    name,
    value,
    category,
    date,
    timeRange,
    videoLink,
    description,
    place,
    fee,
    rules,
    submission,
  } = req.body
  const id = req.params.id
  if (name && value && category && date && videoLink && description) {
    data = {
      name,
      value,
      category,
      date,
      timeRange,
      videoLink,
      description,
      place,
      fee,
      rules,
      submission: JSON.parse(submission).name ? submission : '{}',
    }
    const metaData = await Events.update(data, { where: { id: id } })
    if (metaData[0] > 0) {
      return res.json({ succeed: true, msg: 'edit succed' })
    } else {
      return res.json({ succeed: false, msg: 'invalid event id entred' })
    }
  } else {
    throw new BadRequestError(
      'input fields should not be empty except timeRange'
    )
  }
}

const editEventImg = async (req, res) => {
  const id = req.params.id
  const newImg = req.file.path
  const previousEventImg = await Events.findByPk(id, { attributes: ['image'] })
  if (previousEventImg) {
    deleteFile(previousEventImg.image)
    await Events.update({ image: newImg }, { where: { id: id } })
    res.json({
      succeed: true,
      msg: 'successfully updated image',
      result: newImg,
    })
  } else {
    deleteFile(newImg)
    throw new BadRequestError('id did not match any event')
  }
}

const deleteEvent = async (req, res) => {
  const id = req.params.id
  const targetEvent = await Events.findByPk(id)
  if (targetEvent) {
    deleteFile(targetEvent.image)
    await Events.destroy({ where: { id: id } })
  } else {
    throw new BadRequestError('id did not match any event')
  }
  res.json({ succeed: true, msg: 'successfully deleted' })
}

const changeRegPortal = async (req, res) => {
  const id = req.params.id
  const type = req.body.type
  await Events.update({ regPortal: type }, { where: { id: id } })
  res.json({ succeed: true, msg: 'updated successfully' })
}

const changeFieldPermit = async (req, res) => {
  const id = req.params.id
  const { fieldName, type } = req.body
  await Events.update({ [fieldName || 'roll']: type }, { where: { id: id } })
  res.json({ succeed: true, msg: 'updated successfully' })
}

module.exports = {
  addEvent,
  getAllEvents,
  editEventBody,
  editEventImg,
  deleteEvent,
  getSingleEvent,
  getAllDataWithEvents,
  changeRegPortal,
  changeFieldPermit,
}
