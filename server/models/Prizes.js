module.exports = (sequelize, DataTypes) => {
  const Prize = sequelize.define(
    'prize',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      parId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      prizeCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      prizeEvt: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      prize: {
        type: DataTypes.INTEGER,
        defaultValue: null,
      },
    },
    {
      timestamps: true,
    }
  );

  Prize.associate = (models) => {
    Prize.belongsTo(models.Participants, {
      foreignKey: 'parId',
      as: 'parInfo',
    });
  };
  return Prize;
};
