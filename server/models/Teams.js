module.exports = (sequelize, DataTypes) => {
  const Teams = sequelize.define('teams', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    leader: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members: {
      type: DataTypes.TEXT,
      defaultValue: '[]',
    },
  });

  return Teams;
};
