module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define('events', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    regPortal: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      defaultValue: 'offline',
    },
    submission: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
    team: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },
    maxMember: {
      type: DataTypes.INTEGER,
      defaultValue: null,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: null,
    },
    fee: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    roll: {
      type: DataTypes.BOOLEAN,
      defaultValue: 0,
    },

    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    timeRange: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    place: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    videoLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    rules: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prize: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },
  });

  return Events;
};
