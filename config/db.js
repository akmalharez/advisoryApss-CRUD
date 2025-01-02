const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('my_project', 'root', null, {
  host: 'localhost',   
  dialect: 'mysql',    
});

module.exports = sequelize;  