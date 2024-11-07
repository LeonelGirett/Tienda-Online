/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/inventario.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allInventario);

// Para un producto
router.get('/:id_inventario', controller.showInventario);

//// METODO POST  ////
router.post('/', controller.storeInventario);

//// METODO PUT  ////
router.put('/:id_inventario', controller.updateInventario);

//// METODO DELETE ////
router.delete('/:id_invenario', controller.destroyInventario);

// EXPORTAR ROUTERS
module.exports = router;