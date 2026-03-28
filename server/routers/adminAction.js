const router = require('express').Router();
const {
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
} = require('../controllers/adminAction');
const { clearEventInfo } = require('../controllers/clientEvents');
const { updateEventInfo } = require('../controllers/qrScanner');
const adminValidate = require('../middlewares/adminTokenVerify');

router.get('/setting', getAllSetting);
router.post('/downloadFile', adminValidate, downloadData);
router.get('/resetPoints', adminValidate, resetPoints);
router.get('/recalculatePoints', adminValidate, recalculatePoints);
router.patch('/setPermit/', adminValidate, setPermits);
router.patch('/updateEventInfo/:code', adminValidate, updateEventInfo);
router.patch('/blockCA', adminValidate, blockCA);
router.patch('/blockCPartner', adminValidate, blockCPartner);
router.patch('/updateCode', adminValidate, caPointEdit);
router.put('/deleteEventInfo', adminValidate, clearEventInfo);
router.put('/deleteCA', adminValidate, deleteCA);
router.put('/deleteCPartner', adminValidate, deleteCPartner);

module.exports = router;
