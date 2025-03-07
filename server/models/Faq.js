module.exports = (sequelize, DataTypes) => {
  const Faq = sequelize.define('faq', {
    question: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    answer: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  return Faq;
};
