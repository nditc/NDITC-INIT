const router = require('express').Router();
const prizes = require('../controllers/prize.js');
const adminValidate = require('../middlewares/adminTokenVerify');

router.post('/add', adminValidate, prizes.createPrize);

router.get('/', adminValidate, prizes.findPrizeAll);

router.get('/:code', adminValidate, prizes.findPrizeOne);

router.delete('/delete/:id', adminValidate, prizes.deletePrize);

module.exports = router;
