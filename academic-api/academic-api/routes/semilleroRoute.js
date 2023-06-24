const express = require('express');
const router = express.Router();
var token = require('../token/token');

const semilleroController = require('../db/controllers').semilleroController

// Llamado a servicios de semillero
router.get('/linea', token.verifyToken, semilleroController.listarLinea);
router.get('/', token.verifyToken, semilleroController.listarSemilleros);
router.post('/', token.verifyToken, semilleroController.crearSemillero);
router.put('/', token.verifyToken, semilleroController.actualizarSemillero);
router.get('/:id', token.verifyToken, semilleroController.obtenerSemillero);
router.delete('/:id', token.verifyToken, semilleroController.eliminarSemillero);

module.exports = router;
