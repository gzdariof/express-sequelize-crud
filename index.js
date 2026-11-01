const express = require('express');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuario.routes');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// Crea la aplicación Express y obtiene el puerto desde el entorno.
const app = express();
const PORT = process.env.PORT || 3000;

// Interpreta automáticamente los cuerpos de las solicitudes en formato JSON.
app.use(express.json());

// Agrupa las operaciones de usuarios bajo la ruta base /api/usuarios.
app.use('/api/usuarios', usuarioRoutes);

// Define los metadatos de OpenAPI y dónde buscar las anotaciones Swagger.
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Ejemplo',
      version: '1.0.0',
      description: 'Documentación de la Web API con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local',
      },
    ],
  },
  // Las anotaciones de las rutas describen los endpoints de la API.
  apis: ['./routes/*.js', './app.js'], 
};

// Genera la especificación OpenAPI a partir de las opciones y anotaciones.
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Publica Swagger UI para consultar y probar la API desde el navegador.
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Inicia el servidor solo después de sincronizar los modelos con la base de datos.
sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos sincronizada con Sequelize');
    // Escucha solicitudes HTTP en el puerto configurado.
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Web API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    // Informa el fallo de conexión o sincronización; el servidor no se inicia.
    console.error('❌ Error al conectar con la base de datos:', error);
  });