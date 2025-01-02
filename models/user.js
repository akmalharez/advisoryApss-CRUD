'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role_type: DataTypes.CHAR,
  }, {});
  
  User.associate = (models) => {
    User.hasMany(models.Listing, { foreignKey: 'user_id' });
  };

  return User;
};

