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


app.get("/", (req, res) => {
    res.send("Hola HomeMaster!!!");
});
// Esta es la ruta principal del proyecto "/"

const PORT = 3010;
app.listen(PORT, ()=> console.log(`http://localhost:${PORT}`));