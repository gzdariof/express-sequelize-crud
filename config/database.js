
const { Sequelize } = require('sequelize');
// Carga las variables de conexión definidas en el archivo .env, si existe.
require('dotenv').config();

// Configura Sequelize para conectarse a MySQL.
// Cada variable de entorno tiene un valor predeterminado para desarrollo local.
const sequelize = new Sequelize(
  process.env.DB_NAME || 'mi_base_datos',
  process.env.DB_USER || 'root',
  process.env.DB_PASSWORD || '',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    // Desactiva el registro de las consultas SQL en la consola.
    logging: false
  }
);

// Exporta la instancia compartida para modelos y operaciones de base de datos.
module.exports = sequelize;