const { NotFoundError, BadRequestError, UnauthorizedError } = require('../errors');

const deleteFile = require('../utils/deleteFile');

const eventSettingValidate = (req, res, next) => {
  const { title, phones, gmails, titleDesc, bkash, intro, caGroupLink, cpartnerGroupLink } = req.body;

  if (title && phones && gmails && titleDesc) {
    req.adminSetting = {
      title,
      phones,
      gmails,
      titleDesc,
      image: req.file.path,
      bkash,
      intro,
      caGroupLink,
      cpartnerGroupLink,
    };
    next();
  } else {
    deleteFile(req.file.path);
    throw new BadRequestError('input fields should not be empty');
  }
};

const addEventValidate = (req, res, next) => {
  const {
    name,
    categoryId,
    date,
    description,
    value,
    type,
    paid,
    redirect,
    fee,
    team,
    maxMember,
    submission,
    rules,
    prize,
    snacks,
    lunch,
    gift,
    caPoints,
  } = req.body;
  if (name && categoryId && date && description && value && rules) {
    req.event = {
      name,
      value,
      type,
      paid,
      redirect,
      fee,
      categoryId,
      date,
      description,
      image: req.file.path,
      team,
      maxMember,
      submission: JSON.parse(submission).name ? submission : '{}',
      rules,
      prize,
      snacks,
      lunch,
      gift,
      caPoints: caPoints || 0,
    };
    next();
  } else {
    if (req?.file?.path) {
      deleteFile(req.file.path);
    }
    throw new BadRequestError('input fields should not be empty');
  }
};

module.exports = { eventSettingValidate, addEventValidate };
