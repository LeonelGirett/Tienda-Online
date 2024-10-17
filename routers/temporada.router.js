/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/temporada.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allTemporada);

// Para un producto
router.get('/:id_temporada', controller.showTemporada);

//// METODO POST  ////
router.post('/', controller.storeTemporada);

//// METODO PUT  ////
router.put('/:id_temporada', controller.updateTemporada);

//// METODO DELETE ////
router.delete('/:id_temporada', controller.destroyTemporada);

// EXPORTAR ROUTERS
module.exports = router;