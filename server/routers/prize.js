const router = require('express').Router();
const prizes = require('../controllers/prize.js');
const adminValidate = require('../middlewares/adminTokenVerify');

router.post('/add', prizes.createPrize);

router.get('/', prizes.findPrizeAll);

router.get('/:code', prizes.findPrizeOne);

router.put('/:id', prizes.updatePrize);

module.exports = router;
