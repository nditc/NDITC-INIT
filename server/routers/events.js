const router = require('express').Router();
const {
  addEvent,
  getAllEvents,
  editEventBody,
  editEventImg,
  deleteEvent,
  getSingleEvent,
  getAllDataWithEvents,
  changeRegPortal,
  changeFieldPermit,
  getAllCategories,
} = require('../controllers/events');
const adminValidate = require('../middlewares/adminTokenVerify');
const { addEventValidate } = require('../middlewares/adInputValidate');
const upload = require('../middlewares/uploadFile');

router.get('/', getAllEvents);
router.get('/allData', adminValidate, getAllDataWithEvents);
router.get('/allCategories', getAllCategories);
router.get('/:eventValue', getSingleEvent);
router.post('/addEvent', adminValidate, upload.single('event'), addEventValidate, addEvent);
router.patch('/editBody/:id', adminValidate, editEventBody);
router.patch('/regPortal/:id', adminValidate, changeRegPortal);
router.patch('/editImg/:id', adminValidate, upload.single('event'), editEventImg);
router.patch('/fieldPermit/:id', adminValidate, changeFieldPermit);
router.delete('/:id', adminValidate, deleteEvent);
module.exports = router;
