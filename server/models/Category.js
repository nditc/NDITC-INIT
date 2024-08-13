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
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    direct: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
    },
  });

  EventCategory.associate = (models) => {
    EventCategory.hasMany(models.Events, { foreignKey: 'categoryId', as: 'events' });
  };
  return EventCategory;
};
