const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Web API de Usuarios (Sequelize + Express)',
      version: '1.0.0',
      description: 'Documentación interactiva de la API para la gestión CRUD de Usuarios.'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor Local'
      }
    ],
    components: {
      schemas: {
        Usuario: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombres: { type: 'string', example: 'Ana María Gómez' },
            fecha_nacimiento: { type: 'string', format: 'date', example: '1998-04-20' },
            fecha_ultimo_acceso: { type: 'string', format: 'date-time', example: '2026-10-29T10:15:00.000Z' },
            es_administrador: { type: 'boolean', example: true },
            created_at: { type: 'string', format: 'date-time', example: '2026-10-29T08:00:00.000Z' }
          }
        },
        UsuarioInput: {
          type: 'object',
          required: ['nombres', 'fecha_nacimiento', 'contrasena'],
          properties: {
            nombres: { type: 'string', example: 'Ana María Gómez' },
            fecha_nacimiento: { type: 'string', format: 'date', example: '1998-04-20' },
            contrasena: { type: 'string', example: 'secreto123' },
            es_administrador: { type: 'boolean', example: true }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;