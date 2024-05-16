module.exports = (sequelize, DataTypes) => {
  const Sponsors = sequelize.define('sponsors', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
    },
  })

  return Sponsors
}
