const { BadRequestError } = require('../errors');
const { CPartners, sequelize } = require('../models');

const pointSystem = {
  paid: 5,
  signature: 10,
};

const increaseCPartner = async (CPref, type) => {
  let targetCPCode;

  if (CPref) {
    targetCPCode = await sequelize.query(`SELECT used FROM cpartners WHERE code='${CPref}'`);
    if (targetCPCode[0].length > 0) {
      const targetCPused = targetCPCode[0][0].used;
      const increasedUsed = Number(targetCPused) + pointSystem[type];
      await CPartners.update({ used: increasedUsed }, { where: { code: CPref } });
    } else {
      throw new BadRequestError(
        'Please provide the correct Partner reference code or simply ignore the CPref field'
      );
    }
  }
};

module.exports = increaseCPartner;
