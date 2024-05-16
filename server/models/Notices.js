module.exports = (sequelize, DataTypes) => {
  const Notices = sequelize.define('notices', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    warn: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
  })

  return Notices
}
