const express = require('express');
const router = express.Router();
var token = require('../token/token');

const proyectoController = require('../db/controllers').proyectoController

// Llamado a servicios de proyecto
router.get('/type', token.verifyToken, proyectoController.listarTipos);
router.get('/', token.verifyToken, proyectoController.listarProyectos);
router.post('/', token.verifyToken, proyectoController.crearProyecto);
router.put('/', token.verifyToken, proyectoController.actualizarProyecto);
router.get('/:id', token.verifyToken, proyectoController.obtenerProyecto);
router.delete('/:id', token.verifyToken, proyectoController.eliminarProyecto);

module.exports = router;
