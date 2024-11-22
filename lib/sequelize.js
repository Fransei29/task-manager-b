const { Sequelize } = require('sequelize');

// Configuring Sequelize Using DATABASE_URL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production' ? {
      require: true,
      rejectUnauthorized: false, // Esto permite evitar errores SSL en producción
    } : false, // No uses SSL en desarrollo local
  },
  logging: false, // Desactiva logs de Sequelize
});

module.exports = sequelize;
