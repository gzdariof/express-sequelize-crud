const swaggerJSDoc = require('swagger-jsdoc');

// Define la información general de OpenAPI y los esquemas reutilizables.
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
        // Representación de un usuario devuelto por la API.
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
        // Estructura esperada al crear un usuario.
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
  // Lee las anotaciones OpenAPI declaradas junto a las rutas de Express.
  apis: ['./routes/*.js']
};

// Construye la especificación OpenAPI que consumirá Swagger UI.
const swaggerSpec = swaggerJSDoc(options);

// Permite reutilizar la especificación desde otros módulos de la aplicación.
module.exports = swaggerSpec;