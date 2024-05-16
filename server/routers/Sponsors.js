const router = require('express').Router()
const {
  getAllSponsors,
  deleteSponsor,
  createSponsor,
} = require('../controllers/sponsors')
const upload = require('../middlewares/uploadFile')
const adminValidate = require('../middlewares/adminTokenVerify')

router.get('/', getAllSponsors)
router.delete('/:id', adminValidate, deleteSponsor)
router.post('/create', adminValidate, upload.single('sponsor'), createSponsor)

module.exports = router
