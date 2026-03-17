module.exports = (sequelize, DataTypes) => {
  const CPartners = sequelize.define('cpartners', {
    code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: 0,
    },
    used: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fb: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    institute: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    clubName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    designation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    otpCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    otpTime: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    description: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  });

  CPartners.associate = (models) => {
    CPartners.hasOne(models.ParEvents, {
      foreignKey: 'CPartnerId',
      onDelete: 'CASCADE',
      as: 'ParEvent',
    });
  };

  return CPartners;
};
