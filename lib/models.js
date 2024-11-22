const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const Users = sequelize.define('Users', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Task = sequelize.define('Task', {         // Task Model
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  dueDate: {                                     // Nuevo campo para la fecha de vencimiento
    type: DataTypes.DATE,
    allowNull: false,                             // Permitir que sea nulo si no se establece
  },
  UserId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Users.hasMany(Task, { foreignKey: 'UserId' });   // Relations
Task.belongsTo(Users, { foreignKey: 'UserId' });

module.exports = { User, Task };
