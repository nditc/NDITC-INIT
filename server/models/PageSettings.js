module.exports = (sequelize, DataTypes) => {
  const PageSettings = sequelize.define('pagesettings', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phones: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gmails: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    titleDesc: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    bkash: {
      type: DataTypes.STRING,
    },
    intro: {
      type: DataTypes.STRING,
    },
    searchPermit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    caRegPermit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    parRegPermit: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 1,
    },
    schedule: {
      type: DataTypes.TEXT,
      defaultValue: '{}',
    },

    showSchedule: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    showResult: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
  });

  return PageSettings;
};
