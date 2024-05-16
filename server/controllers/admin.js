const { hashSync, compare } = require('bcryptjs')
const { Admin, PageSettings } = require('../models')
const { sign } = require('jsonwebtoken')
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
} = require('../errors')
const { attachTokenToResponse } = require('../utils/createToken')
const saltRounds = process.env.SALT
const { StatusCodes } = require('http-status-codes')
const deleteFile = require('../utils/deleteFile')

const getAllAdmins = async (req, res) => {
  const result = await Admin.findAll({ attributes: ['id', 'userName'] })
  res.json({ succeed: true, result: result })
}

const adminReg = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
    throw new BadRequestError('Username or Password should not be empty')
  }
  const isAlreadyExist = await Admin.findOne({ where: { userName: userName } })
  if (isAlreadyExist) {
    return res.json({ succeed: false, msg: 'account already exist' })
  }
  const hassedPass = hashSync(password, Number(saltRounds))
  await Admin.create({ userName: userName, password: hassedPass })
  res
    .status(StatusCodes.CREATED)
    .json({ succeed: true, msg: 'Admin User Created' })
}

const adminLogin = async (req, res) => {
  const { userName, password } = req.body
  if (!userName || !password) {
    throw new BadRequestError('Username or Password should not be empty')
  }
  const admin = await Admin.findOne({ where: { userName: userName } })
  if (!admin) {
    throw new NotFoundError(`${userName} does not exist`)
  }
  const match = await compare(password, admin.password)
  if (!match) {
    throw new UnauthenticatedError('Wrong username and password combination')
  }
  const user = {
    id: admin.id,
    userName: admin.userName,
  }
  const token = sign(user, process.env.ADMIN_SECRET, {
    expiresIn: '1h',
  })
  attachTokenToResponse('token', { res, token, expiresInDay: 1 })
  res.json({ succeed: true, msg: 'successfully logged in' })
}

const adminLogout = (req, res) => {
  res.clearCookie('token')
  res.json({ succeed: true, msg: 'logout succes' })
}

const isAdminValidated = (req, res) => {
  res.json({ succeed: true, result: req.admin })
}

//Event manager Setting
const setEventSetting = async (req, res) => {
  const previousSetting = await PageSettings.findAll({})

  if (previousSetting.length > 0) {
    const id = previousSetting[0].dataValues.id
    if (id) await PageSettings.destroy({ where: { id: id } })
  }
  const EventSettings = await PageSettings.create(req.adminSetting)
  res.status(StatusCodes.CREATED).json({ succeed: true, result: EventSettings })
}

const editEventSetting = async (req, res) => {
  const id = req.params.id
  const { title, phones, gmails, titleDesc, bkash, intro } = req.body
  if (title && phones && gmails && titleDesc) {
    const [metadata] = await PageSettings.update(
      {
        title,
        phones,
        gmails,
        titleDesc,
        bkash,
        intro,
      },
      { where: { id: id } }
    )

    if (metadata < 1) {
      throw new BadRequestError('invalid id provided')
    }
    res.json({ succeed: true, msg: 'successfully updated' })
  } else {
    throw new BadRequestError('fields must not be empty')
  }
}

const updateBannnerImg = async (req, res) => {
  const newImg = req.file.path
  const [oldImg] = await PageSettings.findAll({ attributes: ['image', 'id'] })
  deleteFile(oldImg.image)

  await PageSettings.update({ image: newImg }, { where: { id: oldImg.id } })
  res.json({ succeed: true, msg: 'successfully updated banner image' })
}

const deleteEventSetting = async (req, res) => {
  const id = req.params.id
  if (!id) {
    throw new BadRequestError('you did not provide the id')
  }
  const metadata = await PageSettings.destroy({ where: { id: id } })
  if (metadata < 1) {
    return res.json({ succeed: false, msg: 'nothing to delete' })
  }
  res.json({ succeed: true, msg: 'deleted' })
}

const getEventSetting = async (req, res) => {
  const setting = await PageSettings.findAll({
    attributes: {
      exclude: ['updatedAt', 'id'],
    },
  })
  res.json({ succeed: true, result: setting })
}

module.exports = {
  getAllAdmins,
  adminReg,
  adminLogin,
  isAdminValidated,
  setEventSetting,
  deleteEventSetting,
  adminLogout,
  getEventSetting,
  editEventSetting,
  updateBannnerImg,
}
