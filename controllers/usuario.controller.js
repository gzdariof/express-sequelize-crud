const Usuario = require('../models/usuario.model');
const bcrypt = require('bcryptjs');

// Lista los usuarios y excluye las contraseñas de la respuesta.
exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: { exclude: ['contrasena'] }
    });
    res.json({ status: 'success', data: usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno al obtener usuarios.' });
  }
};

// Busca un usuario por su clave primaria sin exponer su contraseña.
exports.obtenerUsuarioPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id, {
      attributes: { exclude: ['contrasena'] }
    });

    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    res.json({ status: 'success', data: usuario });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor.' });
  }
};

// Valida los campos obligatorios, almacena la contraseña hasheada y devuelve
// los datos públicos del nuevo usuario.
exports.crearUsuario = async (req, res) => {
  const { nombres, fecha_nacimiento, contrasena, es_administrador } = req.body;

  if (!nombres || !fecha_nacimiento || !contrasena) {
    return res.status(400).json({ message: 'Campos requeridos: nombres, fecha_nacimiento, contrasena' });
  }

  try {
    // Genera un salt para proteger la contraseña antes de guardarla.
    const salt = await bcrypt.genSalt(10);
    const contrasenaHashed = await bcrypt.hash(contrasena, salt);

    const nuevoUsuario = await Usuario.create({
      nombres,
      fecha_nacimiento,
      contrasena: contrasenaHashed,
      es_administrador: Boolean(es_administrador)
    });

    res.status(201).json({
      status: 'success',
      message: 'Usuario creado exitosamente',
      data: {
        id: nuevoUsuario.id,
        nombres: nuevoUsuario.nombres,
        fecha_nacimiento: nuevoUsuario.fecha_nacimiento,
        es_administrador: nuevoUsuario.es_administrador
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al registrar el usuario.' });
  }
};

// Actualiza los campos enviados y conserva los valores omitidos.
exports.actualizarUsuario = async (req, res) => {
  const { id } = req.params;
  const { nombres, fecha_nacimiento, contrasena, es_administrador, fecha_ultimo_acceso } = req.body;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    // Mantiene el hash existente salvo que se proporcione otra contraseña.
    let nuevaContrasena = usuario.contrasena;
    if (contrasena) {
      const salt = await bcrypt.genSalt(10);
      nuevaContrasena = await bcrypt.hash(contrasena, salt);
    }

    await usuario.update({
      nombres: nombres ?? usuario.nombres,
      fecha_nacimiento: fecha_nacimiento ?? usuario.fecha_nacimiento,
      contrasena: nuevaContrasena,
      es_administrador: es_administrador !== undefined ? Boolean(es_administrador) : usuario.es_administrador,
      fecha_ultimo_acceso: fecha_ultimo_acceso !== undefined ? fecha_ultimo_acceso : usuario.fecha_ultimo_acceso
    });

    res.json({
      status: 'success',
      message: 'Usuario actualizado correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar el usuario.' });
  }
};

// Registra la fecha y hora actuales como último acceso del usuario.
exports.actualizarUltimoAcceso = async (req, res) => {
  const { id } = req.params;
  const fechaActual = new Date();

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await usuario.update({ fecha_ultimo_acceso: fechaActual });

    res.json({
      status: 'success',
      message: 'Fecha de último acceso actualizada correctamente.',
      fecha_ultimo_acceso: fechaActual
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la fecha de acceso.' });
  }
};

// Busca y elimina el usuario indicado por su ID.
exports.eliminarUsuario = async (req, res) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }

    await usuario.destroy();

    res.json({
      status: 'success',
      message: `Usuario con ID ${id} eliminado correctamente.`
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar el usuario.' });
  }
};