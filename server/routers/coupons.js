const router = require("express").Router();

const {
  getAllCoupons,
  getCouponById,
  addCoupon,
  editCoupon,
  deleteCoupon,
} = require("../controllers/coupons");
const adminValidate = require("../middlewares/adminTokenVerify");

router.get("/", adminValidate, getAllCoupons);
router.get("/:id", adminValidate, getCouponById);
router.post("/", adminValidate, addCoupon);
router.patch("/:id", adminValidate, editCoupon);
router.delete("/:id", adminValidate, deleteCoupon);

module.exports = router;
