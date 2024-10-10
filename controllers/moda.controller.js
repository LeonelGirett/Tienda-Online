
const db = require("../db/db");

//// METODO GET  /////

// Para todos las peliculas
const allModa = (req, res) => {
    const sql = "SELECT * FROM moda";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para una pelicula
const showModa = (req, res) => {
    const {id_moda} = req.params;
    const sql = "SELECT * FROM moda WHERE id_moda = ?";
    db.query(sql,[id_moda], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la pelicula buscada"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeModa = (req, res) => {
    const {nombre_producto, descripcion, categoria,genero,marca,id_material,id_color,id_inventario,id_proveedor,id_temporada} = req.body;
    const sql = "INSERT INTO moda (nombre_producto,descripcion,categoria,genero,marca,id_material,id_color,id_inventario,id_proveedor,id_temporada) VALUES (?,?,?,?,?,?,?,?,?,?)";
    db.query(sql,[nombre_producto, descripcion, categoria,genero,marca,id_material,id_color,id_inventario,id_proveedor,id_temporada], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const moda = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(moda); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateModa = (req, res) => {
    const {id_moda} = req.params;
    const {nombre_producto, descripcion, categoria,genero,marca,id_material,id_color,id_inventario,id_proveedor,id_temporada} = req.body;
    const sql ="UPDATE moda SET nombre_producto = ?, descripcion = ?, categoria = ?, genero = ?, marca = ?, id_material = ?, id_color = ?, id_inventario = ?, id_proveedor = ?, id_temporada = ? WHERE id_moda = ?";
    db.query(sql,[nombre_producto, descripcion, categoria,genero,marca,id_material,id_color,id_inventario,id_proveedor,id_temporada,id_moda], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La pelicula a modificar no existe"});
        };
        
        const moda = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(moda); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyModa = (req, res) => {
    const {id_moda} = req.params;
    const sql = "DELETE FROM moda WHERE id_moda = ?";
    db.query(sql,[id_moda], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La pelicula a borrar no existe"});
        };
        res.json({mesaje : "Moda Eliminada"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
   allModa,
   showModa,
   storeModa,
   updateModa,
   destroyModa
};