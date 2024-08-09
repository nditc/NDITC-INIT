module.exports = (sequelize, DataTypes) => {
  const QRAdmins = sequelize.define('qradmins', {
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    scanned: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  });

  return QRAdmins;
};
