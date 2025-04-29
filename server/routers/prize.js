const router = require('express').Router();
const prizes = require('../controllers/prize.js');
const adminValidate = require('../middlewares/adminTokenVerify');

router.post('/add', adminValidate, prizes.createPrize);

router.get('/', prizes.findPrizeAll);

router.get('/:code', prizes.findPrizeOne);

router.delete('/delete/:id', adminValidate, prizes.deletePrize);

module.exports = router;
