/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/proveedor.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allProveedor);

// Para un producto
router.get('/:id_proveedor', controller.showProveedor);

//// METODO POST  ////
router.post('/', controller.storeProveedor);

//// METODO PUT  ////
router.put('/:id_proveedor', controller.updateProveedor);

//// METODO DELETE ////
router.delete('/:id_proveedor', controller.destroyProveedor);

// EXPORTAR ROUTERS
module.exports = router;