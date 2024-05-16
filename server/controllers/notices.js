const { Notices } = require('../models')
const { BadRequestError } = require('../errors')

const newNotice = async (req, res) => {
  const { type, message } = req.body
  if (type && message) {
    const newNotice = await Notices.create({ type, message })
    res.json({ succeed: true, result: newNotice })
  } else {
    throw new BadRequestError('input fields should not be empty')
  }
}

const editNotice = async (req, res) => {
  const { type, message } = req.body
  const id = req.params.id
  if (type && message) {
    const metaData = await Notices.update(
      { type, message },
      { where: { id: id } }
    )
    if (metaData[0] < 1) {
      throw new BadRequestError('id is not valid')
    }
    res.json({ succeed: true, msg: 'successfully updated' })
  } else {
    throw new BadRequestError('input fields should not be empty')
  }
}

const deleteNotice = async (req, res) => {
  const id = req.params.id
  const metaData = await Notices.destroy({ where: { id: id } })
  if (metaData < 1) {
    throw new BadRequestError('id is not valid')
  }
  res.json({ succeed: true, msg: 'successfully deleted' })
}

const switchWarn = async (req, res) => {
  const id = req.params.id
  let { warn } = req.body

  if (
    !(warn === 1 || warn === 0) ||
    warn === '' ||
    warn === undefined ||
    warn === null
  ) {
    return res.json({ succeed: false, msg: 'invalid warn value' })
  }
  const metadata = await Notices.update({ warn: warn }, { where: { id: id } })
  if (metadata[0] < 1) {
    throw new BadRequestError('invalid id')
  }
  res.json({ succeed: true, msg: 'successfully updated' })
}

const getAllNotices = async (req, res) => {
  const result = await Notices.findAll({})
  res.json({ succeed: true, result: result })
}

module.exports = {
  newNotice,
  editNotice,
  deleteNotice,
  switchWarn,
  getAllNotices,
}
