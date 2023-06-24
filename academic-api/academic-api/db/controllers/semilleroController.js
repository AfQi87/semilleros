const coordinador = require('../models').coordinadors_model
const usuario = require('../models').usuarios_model
const estado = require('../models').estado_usuarios_model
const semillero = require('../models').semilleros_model
const linea = require('../models').linea_investigacions_model
const lineaSemillero = require('../models').lineas_semilleros_model

module.exports = {
  listarSemilleros: async (req, res) => {
    try {
      const semilleros = await semillero.findAll({
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
          },
          {
            model: estado,
            as: 'estado',
          },
          {
            model: lineaSemillero,
            as: 'linea',
            include: [
              {
                model: linea,
                as: 'lineaInvestigacion',
              }
            ],
          }
        ]
      });
      res.send(semilleros);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  crearSemillero: async (req, res) => {
    try {
      const semilleros = req.body;
      const lineas = req.body.linea;
      delete semilleros.linea;

      console.log("lineas: ", lineas);
      const newSemmilero = await semillero.create(
        semilleros
      );

      if (!newSemmilero) return res.status(500).send();

      if (semillero) {
        lineas.map(async (item) => {
          const lineas = await lineaSemillero.create({
            semillero_id: semillero.id,
            linea_investigacion_id: item.code,
          });
        })
        return res.status(201).send(newSemmilero);
      }

    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  obtenerSemillero: async (req, res) => {
    try {
      const idSemillero = req.params.id
      const semilleros = await semillero.findOne({
        where: {
          id: idSemillero
        },
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
          },
          {
            model: estado,
            as: 'estado',
          },
          {
            model: lineaSemillero,
            as: 'linea',
            include: [
              {
                model: linea,
                as: 'lineaInvestigacion',
              }
            ],
          }
        ]
      });
      if (!semilleros) return res.status(404).send();
      return res.status(201).send(semilleros);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  actualizarSemillero: async (req, res) => {
    try {
      const idSemillero = req.body.id
      const semilleros = await semillero.findByPk(idSemillero)
      if (!semilleros) return res.status(404).send();
      const sem = req.body;
      const lineas = req.body.lineas;
      delete sem.linea;

      const newSemillero = await semilleros.update(sem);

      if (newSemillero) {
        lineas.map(async (item) => {
          lineaSemillero.destroy({ where: { semillero_id: semilleros.id} })
          await lineaSemillero.create({
            semillero_id: semilleros.id,
            linea_investigacion_id: item.code,
          });
        })
        return res.status(202).send(newSemillero);
      }

    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  eliminarSemillero: async (req, res) => {
    try {
      const idSemillero = req.params.id
      const sem = await semillero.findByPk(idSemillero)
      if (!sem) return res.status(404).send();

      const newSemillero = await sem.update({
        "where": { id: idSemillero },
        "estado_id": sem.estado_id == 1 ? 2 : 1,
      });

      return res.status(202).send(newSemillero);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  listarLinea: async (req, res) => {
    try {
      const lineas = await linea.findAll({});
      res.send(lineas);
    } catch (error) {
      res.status(500).send(error);
    }
  },

};