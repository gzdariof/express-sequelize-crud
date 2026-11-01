const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Define el modelo Usuario y los campos que se almacenan en la tabla usuarios.
const Usuario = sequelize.define('Usuario', {
  // Identificador numérico generado automáticamente por la base de datos.
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombres: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  // Fecha de nacimiento almacenada sin componente de hora.
  fecha_nacimiento: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  fecha_ultimo_acceso: {
    type: DataTypes.DATE,
    allowNull: true
  },
  // Contiene el hash de la contraseña, no la contraseña en texto plano.
  contrasena: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  es_administrador: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  // Usa la tabla existente y mantiene solo la marca de creación automática.
  tableName: 'usuarios',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false
});

// Exporta el modelo para que los controladores puedan consultar y modificar usuarios.
module.exports = Usuario;