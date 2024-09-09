// lib/models.js
const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); // Asume que la configuración de sequelize está en sequelize.js

// Modelo de Usuario
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Modelo de Tarea
const Task = sequelize.define('Task', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Definir relaciones
User.hasMany(Task, { foreignKey: 'UserId' });
Task.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { User, Task };