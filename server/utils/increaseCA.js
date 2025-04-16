const { BadRequestError } = require('../errors');
const { CAs, sequelize } = require('../models');

const pointSystem = {
  paid: 1,
};

const increaseCA = async (CAref, type) => {
  let targetCACode;

  if (CAref) {
    targetCACode = await sequelize.query(`SELECT used FROM cas WHERE code='${CAref}'`);
    if (targetCACode[0].length > 0) {
      const targetCAused = targetCACode[0][0].used;
      const increasedUsed = Number(targetCAused) + pointSystem[type];
      await CAs.update({ used: increasedUsed }, { where: { code: CAref } });
    } else {
      throw new BadRequestError(
        'Please provide the correct CA reference code or simply ingnore the CAref field'
      );
    }
  }
};

module.exports = increaseCA;
