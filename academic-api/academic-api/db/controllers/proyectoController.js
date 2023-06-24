const coordinador = require('../models').coordinadors_model
const usuario = require('../models').usuarios_model
const estado = require('../models').estado_proyectos_model
const tipo = require('../models').tipo_proyectos_model
const semillero = require('../models').semilleros_model
const proyecto = require('../models').proyectos_model
const jwt = require('jsonwebtoken');


module.exports = {
  listarProyectos: async (req, res) => {
    try {
      const proyectos = await proyecto.findAll({
        include: [
          {
            model: semillero,
            as: 'semillero',
            include: [
              {
                model: coordinador,
                as: 'coordinador',
                include: [
                  {
                    model: usuario,
                    as: 'usuario',
                  }
                ],
              }
            ],
          },
          {
            model: estado,
            as: 'estado',
          },
          {
            model: tipo,
            as: 'tipo',
          }
        ]
      });
      res.send(proyectos);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  crearProyecto: async (req, res) => {
    try {
      const proyectos = req.body;
      const newProyecto = await proyecto.create(
        proyectos
      );

      if (!newProyecto) return res.status(500).send();
      return res.status(201).send(newProyecto);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  obtenerProyecto: async (req, res) => {
    try {
      const idProyecto = req.params.id
      const proyectos = await proyecto.findOne({
        where: {
          id: idProyecto
        },
        include: [
          {
            model: semillero,
            as: 'semillero',
            include: [
              {
                model: coordinador,
                as: 'coordinador',
                include: [
                  {
                    model: usuario,
                    as: 'usuario',
                  }
                ],
              }
            ],
          },
          {
            model: estado,
            as: 'estado',
          },
          {
            model: tipo,
            as: 'tipo',
          }
        ]
      });
      if (!proyectos) return res.status(404).send();
      return res.status(201).send(proyectos);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  actualizarProyecto: async (req, res) => {
    try {
      const idProyecto = req.body.id
      const proyectos = await proyecto.findByPk(  idProyecto)
      if (!proyectos) return res.status(404).send();
      const sem = req.body;
      const newProyecto = await proyectos.update(sem);
      return res.status(202).send(newProyecto);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  eliminarProyecto: async (req, res) => {
    try {
      const idProyecto = req.params.id
      const sem = await proyecto.findByPk(idProyecto)
      if (!sem) return res.status(404).send();

      const newProyecto = await sem.update({
        "where": { id: idProyecto },
        "estado_proyecto_id": sem.estado_proyecto_id == 1 ? 2 : 1,
      });

      return res.status(202).send(newProyecto);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  listarTipos: async (req, res) => {
    try {
      console.log("entrooooo");
      const type = await tipo.findAll({});
      return res.send(type);
    } catch (error) {
      res.status(500).send(error);
    }
  },
};