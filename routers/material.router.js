/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

const controller = require("../controllers/material.controller");

//// METODO GET  /////

// Para todos los productos
router.get('/', controller.allMaterial);

// Para un producto
router.get('/:id_material', controller.showMaterial);

//// METODO POST  ////
router.post('/', controller.storeMaterial);

//// METODO PUT  ////
router.put('/:id_material', controller.updateMaterial);

//// METODO DELETE ////
router.delete('/:id_material', controller.destroyMaterial);

// EXPORTAR ROUTERS
module.exports = router;