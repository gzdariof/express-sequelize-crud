const express = require('express');
const sequelize = require('./config/database');
const usuarioRoutes = require('./routes/usuario.routes');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Enrutar la entidad usuarios
app.use('/api/usuarios', usuarioRoutes);

// Configuración de OpenAPI / Swagger
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
  // Ruta a los archivos que contienen las anotaciones de documentación
  apis: ['./routes/*.js', './app.js'], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Servir la interfaz gráfica de Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Sincronizar base de datos e iniciar servidor
sequelize.sync()
  .then(() => {
    console.log('✅ Base de datos sincronizada con Sequelize');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor Web API corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ Error al conectar con la base de datos:', error);
  });