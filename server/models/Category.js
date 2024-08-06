module.exports = (sequelize, DataTypes) => {
  const EventCategory = sequelize.define('ecatagory', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    direct: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'event',
        key: 'id',
      },
    },
  });

  return EventCategory;
};
