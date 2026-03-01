const { Coupons, Events } = require("../models");
const { BadRequestError } = require("../errors");

const normalizeCouponCode = (value) =>
  typeof value === "string" ? value.trim().toUpperCase() : "";

const toFlatDiscount = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric) || numeric < 0) {
    throw new BadRequestError("flatDiscount must be a non-negative number");
  }
  return numeric;
};

const ensureEventExists = async (eventId) => {
  const event = await Events.findByPk(eventId);
  if (!event) {
    throw new BadRequestError("Invalid eventId");
  }
  return event;
};

const getAllCoupons = async (req, res) => {
  const result = await Coupons.findAll({
    include: [
      {
        model: Events,
        as: "event",
        attributes: ["id", "name", "value"],
      },
    ],
    order: [["id", "DESC"]],
  });

  res.json({ succeed: true, result });
};

const getCouponById = async (req, res) => {
  const id = req.params.id;
  const result = await Coupons.findByPk(id, {
    include: [
      {
        model: Events,
        as: "event",
        attributes: ["id", "name", "value"],
      },
    ],
  });

  if (!result) {
    throw new BadRequestError("Coupon not found");
  }

  res.json({ succeed: true, result });
};

const addCoupon = async (req, res) => {
  const { eventId, name, code, flatDiscount, status } = req.body;

  if (!eventId || !name || !code) {
    throw new BadRequestError("eventId, name and code are required");
  }

  await ensureEventExists(eventId);

  const normalizedCode = normalizeCouponCode(code);
  if (!normalizedCode) {
    throw new BadRequestError("code must not be empty");
  }

  const existingForEvent = await Coupons.findAll({
    where: { eventId },
    attributes: ["id", "code"],
    raw: true,
  });

  const duplicate = existingForEvent.find(
    (coupon) =>
      typeof coupon.code === "string" &&
      normalizeCouponCode(coupon.code) === normalizedCode,
  );

  if (duplicate) {
    throw new BadRequestError("Coupon code already exists for this event");
  }

  const created = await Coupons.create({
    eventId,
    name: String(name).trim(),
    code: normalizedCode,
    flatDiscount: toFlatDiscount(flatDiscount),
    status: status === undefined ? true : Boolean(status),
  });

  res
    .status(201)
    .json({ succeed: true, result: created, msg: "coupon created" });
};

const editCoupon = async (req, res) => {
  const id = req.params.id;
  const target = await Coupons.findByPk(id);
  if (!target) {
    throw new BadRequestError("Coupon not found");
  }

  const nextEventId = req.body.eventId ?? target.eventId;
  const nextCode =
    req.body.code !== undefined
      ? normalizeCouponCode(req.body.code)
      : target.code;

  if (!nextCode) {
    throw new BadRequestError("code must not be empty");
  }

  await ensureEventExists(nextEventId);

  const existingForEvent = await Coupons.findAll({
    where: { eventId: nextEventId },
    attributes: ["id", "code"],
    raw: true,
  });

  const duplicate = existingForEvent.find(
    (coupon) =>
      coupon.id !== target.id &&
      typeof coupon.code === "string" &&
      normalizeCouponCode(coupon.code) === nextCode,
  );

  if (duplicate) {
    throw new BadRequestError("Coupon code already exists for this event");
  }

  const payload = {
    eventId: nextEventId,
    name:
      req.body.name !== undefined ? String(req.body.name).trim() : target.name,
    code: nextCode,
    flatDiscount:
      req.body.flatDiscount !== undefined
        ? toFlatDiscount(req.body.flatDiscount)
        : target.flatDiscount,
    status:
      req.body.status !== undefined ? Boolean(req.body.status) : target.status,
  };

  if (!payload.name) {
    throw new BadRequestError("name must not be empty");
  }

  await Coupons.update(payload, { where: { id } });

  const updated = await Coupons.findByPk(id, {
    include: [
      {
        model: Events,
        as: "event",
        attributes: ["id", "name", "value"],
      },
    ],
  });

  res.json({ succeed: true, result: updated, msg: "coupon updated" });
};

const deleteCoupon = async (req, res) => {
  const id = req.params.id;
  const target = await Coupons.findByPk(id);
  if (!target) {
    throw new BadRequestError("Coupon not found");
  }

  await Coupons.destroy({ where: { id } });
  res.json({ succeed: true, msg: "coupon deleted" });
};

module.exports = {
  getAllCoupons,
  getCouponById,
  addCoupon,
  editCoupon,
  deleteCoupon,
};
