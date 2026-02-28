module.exports = (sequelize, DataTypes) => {
  const Coupons = sequelize.define("coupons", {
    eventId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "events",
        key: "id",
      },
      onDelete: "CASCADE",
      onUpdate: "CASCADE",
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flatDiscount: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  });

  Coupons.associate = (models) => {
    Coupons.belongsTo(models.Events, {
      foreignKey: "eventId",
      as: "event",
    });
  };

  return Coupons;
};
