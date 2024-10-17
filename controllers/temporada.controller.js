const db = require("../db/db");

//// METODO GET  /////

const allTemporada = (req, res) => {
    const sql = "SELECT * FROM temporada";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showTemporada = (req, res) => {
    const {id_temporada} = req.params;
    const sql = "SELECT * FROM temporada WHERE id_temporada = ?";
    db.query(sql,[id_temporada], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe la temporada a buscar"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeTemporada = (req, res) => {
    const {nombre_temporada} = req.body;
    const sql = "INSERT INTO temporada (nombre_temporada) VALUES (?)";
    db.query(sql,[nombre_temporada], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const moda = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(moda); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateTemporada = (req, res) => {
    const {id_temporada} = req.params;
    const {nombre_temporada} = req.body;
    const sql ="UPDATE temporada SET nombre_temporada = ? WHERE id_temporada = ?";
    db.query(sql,[nombre_temporada,id_temporada], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: no existe la temporada a modificar no existe"});
        };
        
        const moda = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(moda); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyTemporada = (req, res) => {
    const {id_temporada} = req.params;
    const sql = "DELETE FROM temporada WHERE id_temporada = ?";
    db.query(sql,[id_temporada], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: la temporada a borrar no existe"});
        };
        res.json({mesaje : "Temporada Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
   allTemporada,
   showTemporada,
   storeTemporada,
   updateTemporada,
   destroyTemporada
};