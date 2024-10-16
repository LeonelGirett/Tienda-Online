const db = require("../db/db");

//// METODO GET  /////

// Para todos las peliculas
const allMaterial = (req, res) => {
    const sql = "SELECT * FROM material";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

// Para una pelicula
const showMaterial = (req, res) => {
    const {id_material} = req.params;
    const sql = "SELECT * FROM material WHERE id_material = ?";
    db.query(sql,[id_material], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el material a buscar"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeMaterial = (req, res) => {
    const {nombre_material, descripcion} = req.body;
    const sql = "INSERT INTO material (nombre_material,descripcion) VALUES (?,?)";
    db.query(sql,[nombre_material, descripcion], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const moda = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(moda); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateMaterial = (req, res) => {
    const {id_material} = req.params;
    const {nombre_material, descripcion} = req.body;
    const sql ="UPDATE material SET nombre_material = ?, descripcion = ? WHERE id_material = ?";
    db.query(sql,[nombre_material,descripcion,id_material], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: no existe el material a modificar no existe"});
        };
        
        const moda = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(moda); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyMaterial = (req, res) => {
    const {id_material} = req.params;
    const sql = "DELETE FROM material WHERE id_material = ?";
    db.query(sql,[id_material], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: el material a borrar no existe"});
        };
        res.json({mesaje : "Material Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
   allMaterial,
   showMaterial,
   storeMaterial,
   updateMaterial,
   destroyMaterial
};