const express = require('express');
const router = express.Router();
var token = require('../token/token');

const coordinadorController = require('../db/controllers').coordinadorController

// Llamado a servicios de coordinador
router.get('/', token.verifyToken, coordinadorController.listarCoordinadors);
router.post('/', token.verifyToken, coordinadorController.crearCoordinador);
router.put('/', token.verifyToken, coordinadorController.actualizarCoordinador);
router.get('/:id', token.verifyToken, coordinadorController.obtenerCoordinador);
router.delete('/:id', token.verifyToken, coordinadorController.eliminarCoordinador);

module.exports = router;
