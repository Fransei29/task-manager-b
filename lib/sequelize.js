const { Sequelize } = require('sequelize');

// Configuración de Sequelize utilizando variables de entorno
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'postgres',
  port: process.env.DB_PORT || 5432,
});

module.exports = sequelize;
