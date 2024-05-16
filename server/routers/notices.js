const router = require('express').Router()
const {
  newNotice,
  editNotice,
  deleteNotice,
  switchWarn,
  getAllNotices,
} = require('../controllers/notices')

const adminValidate = require('../middlewares/adminTokenVerify')

router.get('/', getAllNotices)
router.post('/new', adminValidate, newNotice)
router.put('/edit/:id', adminValidate, editNotice)
router.patch('/warn/:id', adminValidate, switchWarn)
router.delete('/delete/:id', adminValidate, deleteNotice)

module.exports = router
