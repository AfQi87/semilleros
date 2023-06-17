const coordinador = require('../models').coordinadors_model
const usuario = require('../models').usuarios_model
const genero = require('../models').generos_model

module.exports = {
  listarCoordinadors: async (req, res) => {
    try {
      const coordinadores = await coordinador.findAll({
        attributes: ['id', 'acuerdo_nombramiento', 'archivo_nombramiento'],
        include: [
          {
            model: usuario,
            as: 'usuario',
            include: [
              {
                model: genero,
                as: 'genero',
              }
            ],
          },
        ]
      });
      res.send(coordinadores);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  crearCoordinador: async (req, res) => {
    try {
      const usuarios = req.body;
      const newCoord = await usuario.create(
        {
          "nombre": usuarios.usuario.nombre,
          "identificacion": usuarios.usuario.identificacion,
          "direccion": usuarios.usuario.direccion,
          "correo": usuarios.usuario.correo,
          "telefono": usuarios.usuario.telefono,
          "fecha_nacimiento": usuarios.usuario.fecha_nacimiento,
          "fecha_vinculacion": usuarios.usuario.fecha_vinculacion,
          "genero_id": usuarios.usuario.genero_id,
          "tipo_usuario_id": usuarios.usuario.tipo_usuario_id,
          "estado_usuario_id": usuarios.usuario.estado_usuario_id
        }
      );

      if (newCoord) {
        let usuario_id = newCoord.id
        const newCoordinador = await coordinador.create({
          "acuerdo_nombramiento": usuarios.acuerdo_nombramiento,
          "archivo_nombramiento": usuarios.archivo_nombramiento,
          "usuario_id": usuario_id
        });
        return res.status(201).send(newCoordinador);
      }
      return res.status(201).send(newCoord);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  obtenerCoordinador: async (req, res) => {
    try {
      const idCoordinador = req.params.id
      const coordinadores = await coordinador.findOne({
        where: {
          id: idCoordinador
        },
        attributes: ['id', 'acuerdo_nombramiento', 'archivo_nombramiento'],
        include: [
          {
            model: usuario,
            as: 'usuario',
            include: [
              {
                model: genero,
                as: 'genero',
              }
            ],
          },
        ]
      });
      if (!coordinadores) return res.status(404).send();
      res.send(coordinadores)
    } catch (error) {
      res.status(500).send(error);
    }
  },

  actualizarCoordinador: async (req, res) => {
    try {
      const idCoordinador = req.body.id
      const coordinadores = await coordinador.findByPk(idCoordinador)
      if (!coordinadores) return res.status(404).send();

      const usuarios = req.body;

      let find_usuario = await usuario.findByPk(usuarios.usuario.id)
      const newCoord = await find_usuario.update(
        {
          where: { id: usuarios.usuario.id },
          "nombre": usuarios.usuario.nombre,
          "identificacion": usuarios.usuario.identificacion,
          "direccion": usuarios.usuario.direccion,
          "correo": usuarios.usuario.correo,
          "telefono": usuarios.usuario.telefono,
          "fecha_nacimiento": usuarios.usuario.fecha_nacimiento,
          "fecha_vinculacion": usuarios.usuario.fecha_vinculacion,
          "genero_id": usuarios.usuario.genero_id,
          "tipo_usuario_id": usuarios.usuario.tipo_usuario_id,
          "estado_usuario_id": usuarios.usuario.estado_usuario_id
        }
      );

      if (newCoord) {
        const newCoordinador = await coordinadores.update({
          "where": { id: idCoordinador },
          "acuerdo_nombramiento": usuarios.acuerdo_nombramiento,
          "archivo_nombramiento": usuarios.archivo_nombramiento,
          "usuario_id": usuarios.usuario.id
        });
        return res.status(201).send(newCoordinador);
      }

      return res.status(200).send({
        newCoord
      });
    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  eliminarCoordinador: async (req, res) => {
    try {
      const { id } = req.params;
      await coordinador.destroy({ where: { id } });
      return res.status(204).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
};