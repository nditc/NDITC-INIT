module.exports = (sequelize, DataTypes) => {
  const Gallery = sequelize.define('gallery', {
    BigImage: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rows: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    cols: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Gallery;
};
