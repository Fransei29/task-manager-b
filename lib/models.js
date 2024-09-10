const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

// User Model
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

// Task Model
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

// Relations
User.hasMany(Task, { foreignKey: 'UserId' });
Task.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { User, Task };
