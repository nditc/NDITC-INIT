const router = require('express').Router()
const {
  setPermits,
  getAllSetting,
  blockCA,
  caPointEdit,
  downloadData,
} = require('../controllers/adminAction')
const { updateEventInfo } = require('../controllers/qrScanner')
const adminValidate = require('../middlewares/adminTokenVerify')

router.get('/setting', adminValidate, getAllSetting)
router.post('/downloadFile', adminValidate, downloadData)
router.patch('/setPermit/:id', adminValidate, setPermits)
router.patch('/updateEventInfo/:code', adminValidate, updateEventInfo)
router.patch('/blockCA', adminValidate, blockCA)
router.patch('/updateCode', adminValidate, caPointEdit)

module.exports = router
