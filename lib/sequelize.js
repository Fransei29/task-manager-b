const { Sequelize } = require('sequelize');

// Create a Sequelize instance and connect to the PostgreSQL database
const sequelize = new Sequelize('taskmanager', 'user', 'password', {
  host: 'localhost', // Docker container is running on localhost
  dialect: 'postgres', // Using PostgreSQL
  logging: false
});

module.exports = sequelize;
