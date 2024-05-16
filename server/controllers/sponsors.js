const { sponsors } = require('../models/index')
const { BadRequestError } = require('../errors')
const deleteFile = require('../utils/deleteFile')

const getAllSponsors = async (req, res) => {
  const result = await sponsors.findAll({})
  res.json({ succeed: true, result: result })
}

const createSponsor = async (req, res) => {
  const { type, link, name } = req.body
  const image = req.file.path
  if (!type || !link) {
    deleteFile(req.file.path)
    throw new BadRequestError('fields must not be empty')
  }
  const newSponsor = await sponsors.create({ type, name, link, image })
  res
    .status(201)
    .json({ succeed: true, result: newSponsor, msg: 'Successfully created' })
}

const deleteSponsor = async (req, res) => {
  const id = req.params.id
  const sponsor = await sponsors.findOne({ where: { id: id } })
  if (sponsor) deleteFile(sponsor.image)
  const metaData = await sponsors.destroy({ where: { id: id } })
  if (metaData < 1) {
    throw new BadRequestError('id is not valid')
  }

  res.json({ succeed: true, msg: 'successfully deleted' })
}

module.exports = { getAllSponsors, deleteSponsor, createSponsor }
