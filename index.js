require("dotenv").config()

const express = require("express");
const app = express();

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

//Router de registro
//const RouterRegistro = require("./routers/auth.router"); 
//app.use("/auth", RouterRegistro);

//Router de Usuario
const RouterUsuario = require('./routers/usuario.router');
app.use('/usuario', RouterUsuario);

app.get("/", (req, res) => {
    res.send("Hola HomeMaster!!!");
});
// Esta es la ruta principal del proyecto "/"

const PORT = process.env.PORT || 3010 ;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));