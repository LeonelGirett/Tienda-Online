/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/moda.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allModa);

// Para un producto
router.get('/:id_moda', controller.showModa);

//// METODO POST  ////
router.post('/', controller.storeModa);

//// METODO PUT  ////
router.put('/:id_moda', controller.updateModa);

//// METODO DELETE ////
router.delete('/:id_moda', controller.destroyModa);

// EXPORTAR ROUTERS
module.exports = router;