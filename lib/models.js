const { DataTypes } = require('sequelize');
const sequelize = require('./sequelize'); 

const User = sequelize.define(
  'User',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'User', // Asegúrate de que coincide con el nombre de la tabla en tu base de datos
    timestamps: true, // Si usas createdAt y updatedAt
  }
);

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

User.hasMany(Task, { foreignKey: 'UserId' });   // Relations
Task.belongsTo(User, { foreignKey: 'UserId' });

module.exports = { User, Task };
