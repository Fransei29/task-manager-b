const sequelize = require('./lib/sequelize'); // Asegúrate de importar la configuración
const { User, Task } = require('./lib/models'); // Importa los modelos

(async () => {
  try {
    // Sincroniza las tablas con la base de datos
    await sequelize.sync({ force: true }); // `force: true` elimina y recrea las tablas (solo para desarrollo)
    console.log('Tablas sincronizadas correctamente');
    process.exit(0); // Cierra el proceso cuando termine
  } catch (error) {
    console.error('Error al sincronizar las tablas:', error);
    process.exit(1);
  }
})();
