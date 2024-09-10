const { Sequelize } = require('sequelize');

// Create a Sequelize instance and connect to the PostgreSQL database
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,              
  dialect: 'postgres', 
  port: process.env.DB_PORT || 5432,
  logging: false
});

module.exports = sequelize;
