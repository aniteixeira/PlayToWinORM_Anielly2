const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome', 'usuario', 'senha', {
  host: 'localhost',
  dialect: 'postgres', 
  port: 3000 
});

module.exports = sequelize;
