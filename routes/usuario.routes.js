const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario.controller');

// Cada ruta conecta un método HTTP con la operación correspondiente del controlador.

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida exitosamente.
 *       500:
 *         description: Error interno del servidor.
 */
// Devuelve la lista de usuarios.
router.get('/', usuarioController.obtenerUsuarios);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Detalle del usuario.
 *       404:
 *         description: Usuario no encontrado.
 */
// Busca y devuelve un usuario por su ID.
router.get('/:id', usuarioController.obtenerUsuarioPorId);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente.
 *       400:
 *         description: Campos requeridos faltantes.
 */
// Registra un usuario con los datos enviados en el cuerpo JSON.
router.post('/', usuarioController.crearUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UsuarioInput'
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 */
// Actualiza los datos del usuario identificado por el ID.
router.put('/:id', usuarioController.actualizarUsuario);

/**
 * @swagger
 * /api/usuarios/{id}/ultimo-acceso:
 *   patch:
 *     summary: Actualizar la fecha de último acceso de un usuario
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Fecha actualizada correctamente.
 *       404:
 *         description: Usuario no encontrado.
 */
// Establece la fecha y hora actuales como último acceso del usuario.
router.patch('/:id/ultimo-acceso', usuarioController.actualizarUltimoAcceso);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     summary: Eliminar un usuario por ID
 *     tags: [Usuarios]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente.
 *       404:
 *         description: Usuario no encontrado.
 */
// Elimina el usuario identificado por el ID.
router.delete('/:id', usuarioController.eliminarUsuario);

// Exporta el enrutador para montarlo en la aplicación Express.
module.exports = router;