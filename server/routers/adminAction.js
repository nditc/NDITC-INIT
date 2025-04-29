const router = require('express').Router();
const {
  setPermits,
  getAllSetting,
  blockCA,
  caPointEdit,
  downloadData,
} = require('../controllers/adminAction');
const { clearEventInfo } = require('../controllers/clientEvents');
const { updateEventInfo } = require('../controllers/qrScanner');
const adminValidate = require('../middlewares/adminTokenVerify');

router.get('/setting', getAllSetting);
router.post('/downloadFile', adminValidate, downloadData);
router.patch('/setPermit/', adminValidate, setPermits);
router.patch('/updateEventInfo/:code', adminValidate, updateEventInfo);
router.patch('/blockCA', adminValidate, blockCA);
router.patch('/updateCode', adminValidate, caPointEdit);
router.put('/deleteEventInfo', adminValidate, clearEventInfo);

module.exports = router;
