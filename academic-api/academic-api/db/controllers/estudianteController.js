const coordinador = require('../models').coordinadors_model
const estudiante = require('../models').estudiantes_model
const usuario = require('../models').usuarios_model
const estado = require('../models').estado_usuarios_model
const tipo = require('../models').tipo_usuarios_model
const genero = require('../models').generos_model
const cuenta = require('../models').cuenta_usuarios_model
const jwt = require('jsonwebtoken');


module.exports = {
  listarEstudiantes: async (req, res) => {
    try {
      const estudiantes = await estudiante.findAll({
        attributes: ['id', 'semestre'],
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
      res.send(estudiantes);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  crearEstudiante: async (req, res) => {
    try {
      const usuarios = req.body;
      const newUser = await usuario.create(
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

      if (newUser) {
        let usuario_id = newUser.id
        const newEstudiante = await estudiante.create({
          "semestre": usuarios.semestre,
          "usuario_id": usuario_id
        });

        const newAccount = await cuenta.create({
          "contraseña": newUser.identificacion,
          "usuario_id": usuario_id
        })
        return res.status(201).send(newEstudiante);
      }
      return res.status(201).send(newUser);
    } catch (error) {
      res.status(500).json({
        status: 'error',
        name: error.name,
        message: error.message,
        path: error.path
      })
    }
  },

  obtenerEstudiante: async (req, res) => {
    try {
      const idEstudiante = req.params.id
      const estudiantes = await estudiante.findOne({
        where: {
          id: idEstudiante
        },
        attributes: ['id', 'semestre'],
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
          {
            model: estado,
            as: 'estado'
          }
        ]
      });
      if (!estudiantes) return res.status(404).send();
      res.send(estudiantes)
    } catch (error) {
      res.status(500).send(error);
    }
  },

  actualizarEstudiante: async (req, res) => {
    try {
      const idEstudiante = req.body.id
      const estudiantes = await estudiante.findByPk(idEstudiante)
      if (!estudiantes) return res.status(404).send();

      const usuarios = req.body;

      let find_usuario = await usuario.findByPk(usuarios.usuario.id)
      const newUser = await find_usuario.update(
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

      if (newUser) {
        const newEstudiante = await estudiantes.update({
          "where": { id: idEstudiante },
          "semestre": usuarios.semestre,
          "usuario_id": usuarios.usuario.id
        });
        return res.status(201).send(newEstudiante);
      }

      return res.status(200).send({
        newUser
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

  eliminarEstudiante: async (req, res) => {
    try {
      const idEstudiante = req.params.id
      const usr = await usuario.findByPk(idEstudiante)
      if (!usr) return res.status(404).send();

      const newEstudiante = await usr.update({
        "where": { id: idEstudiante },
        "estado_usuario_id": usr.estado_usuario_id == 1 ? 2 : 1,
      });

      return res.status(201).send(newEstudiante);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  listarTodo: async (req, res) => {
    try {
      const estudiantes = await usuario.findAll({
        include: [
          {
            model: genero,
            as: 'genero',
          },
          {
            model: estudiante,
            as: 'user',
          },
          {
            model: coordinador,
            as: 'userC',
          },
          {
            model: estado,
            as: 'estado'
          },
          {
            model: tipo,
            as: 'tipo'
          }
        ]
      });
      res.send(estudiantes);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  singIn(req, res) {

    return usuario
      .findOne({
        where: {
          correo: req.body.email,
        }
      })
      .then((user) => {
        console.log("user: ", user.id);
        if (user.estado_usuario_id == 1) {
          cuenta.findOne({
            where: {
              usuario_id: user.id,
            }
          }).then((account) => {
            console.log("account: ", account.id);
            if (account.contraseña == req.body.password) {
              let data = JSON.stringify(account);
              const token = jwt.sign(data, 'llaveParaDesencriptar')
              return res.status(200).send({ token });
            } else {
              res.status(404).send({
                message: 'Usuario o contraseña incorrecto',
              });
            }
          })
        } else {
          res.status(404).send({
            message: 'El usuario no se encuentra activo',
          });
        }

      })
      .catch((error) => {
        res.status(404).send({
          status: 'error',
          name: error.name,
          message: 'Usuario o contraseña incorrecto',
          path: error.path
        });
      });




    // try {
    //   let user = await usuario.findOne({
    //     where: {
    //       correo: req.body.email,
    //     }
    //   })

    //   if (user) {
    //     let account = await cuenta.findOne({
    //       where: {
    //         usuario_id: user.id,
    //       }
    //     })
    //     if (account) {
    //       if (account.contraseña == req.body.password) {
    //         let data = JSON.stringify(account);
    //         const token = jwt.sign(data, 'llaveParaDesencriptar')
    //         return res.status(200).send({ token });
    //       } else {
    //         res.status(404).send({
    //           message: 'Username or password incorrect',
    //         });
    //       }
    //       // return res.status(200).send(user);
    //     } else {
    //       res.status(404).send({
    //         message: 'Username or password incorrect',
    //       });
    //     }
    //   }
    // } catch (error) {
    //   res.status(500).send(error);
    // }
  },
};