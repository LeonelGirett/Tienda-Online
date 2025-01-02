/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();



const authMiddleware = require("../middleware/auth.middleware")
const controller = require("../controllers/usuario.controller");

router.use(express.static('pages'));
router.use(express.static('public'));
router.use(express.static('uploads'));
router.use(express.static(__dirname));

/// MULTER ///
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination:(req, file, cb) => {
        cb(null, 'uploads'); // esta carpeta debe existir en el proyecto (raiz)
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); // segundos desde 1970
    },
});


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        console.log(file);
        const fileTypes = /jpg|jpeg|png|webp/;
        const mimetype = fileTypes.test(file.mimetype); //deja ver el tipo de imagen
        const extname = fileTypes.test(
            path.extname(file.originalname).toLowerCase()
        );
        if(mimetype && path.extname) {
            return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 1024 * 1024 * 1}, // aprox 1Mb
});



//// METODO POST  ////
router.post('/registro',upload.single('imagen'), controller.register);
router.post('/login', controller.login);

//// METODO GET  /////
// Para todos los productos
router.get('/', controller.allUsers);

// Para un producto
router.get('/:id_usuario', controller.showUser);

//// METODO PUT  ////
router.put('/:id_usuario', upload.single('imagen'), controller.updateUser);

//// METODO DELETE ////
router.delete('/:id_usuario', controller.destroyUser);

router.get("/protected",authMiddleware,(req,res)=>{
    res.status(200).send(`Hola Usuario ${req.userId}`)
});

// EXPORTAR ROUTERS
module.exports = router;