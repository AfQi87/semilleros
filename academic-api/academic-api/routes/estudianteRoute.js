const express = require('express');
const router = express.Router();
var token = require('../token/token');

const estudianteController = require('../db/controllers').estudianteController

// Llamado a servicios de Estudiante
router.get('/all', token.verifyToken, estudianteController.listarTodo);
router.get('/', token.verifyToken, estudianteController.listarEstudiantes);
router.post('/', token.verifyToken, estudianteController.crearEstudiante);
router.post('/sign-in', estudianteController.singIn);
router.put('/', token.verifyToken, estudianteController.actualizarEstudiante);
router.get('/:id', token.verifyToken, estudianteController.obtenerEstudiante);
router.delete('/:id', token.verifyToken, estudianteController.eliminarEstudiante);

module.exports = router;
