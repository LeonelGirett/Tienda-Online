require("dotenv").config()
const cors = require('cors');
const bodyParser = require('body-parser');

const express = require("express");
const app = express();

// Configuramos el CORS y el body-parser
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('pages'));
app.use(express.static('public'));
app.use(express.static('uploads'));
app.use(express.static(__dirname));

app.use(express.json());

//Router de Moda
const Router = require('./routers/moda.router');
app.use('/moda', Router);

//Router de material
const RouterMaterial = require('./routers/material.router');
app.use('/material',RouterMaterial);

//Router de temporada
const RouterTemporada = require('./routers/temporada.router');
app.use('/temporada',RouterTemporada);

//Router de Proveedor
const RouterProveedor = require('./routers/proveedor.router');
app.use('/proveedor',RouterProveedor);

//Router de Proveedor
const RouterInventario = require('./routers/inventario.router');
app.use('/inventario',RouterInventario);

//Router de Usuario
const RouterUsuario = require('./routers/usuario.router');
app.use('/usuario', RouterUsuario);

app.get("/", (req, res) => {
    res.send("Hola HomeMaster!!!");
});
// Esta es la ruta principal del proyecto "/"

const PORT = process.env.PORT || 3010 ;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));