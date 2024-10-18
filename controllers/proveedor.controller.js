const db = require("../db/db");

//// METODO GET  /////

const allProveedor = (req, res) => {
    const sql = "SELECT * FROM proveedor";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showProveedor = (req, res) => {
    const {id_proveedor} = req.params;
    const sql = "SELECT * FROM proveedor WHERE id_proveedor = ?";
    db.query(sql,[id_proveedor], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el proveedor a buscar"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeProveedor = (req, res) => {
    const {nombre_empresa,telefono,email,direccion,ciudad,codigo_postal,pais,fecha_registro,estado} = req.body;
    const sql = "INSERT INTO proveedor (nombre_empresa,telefono,email,direccion,ciudad,codigo_postal,pais,fecha_registro,estado) VALUES (?,?,?,?,?,?,?,?,?)";
    db.query(sql,[nombre_empresa,telefono,email,direccion,ciudad,codigo_postal,pais,fecha_registro,estado], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const moda = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(moda); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateProveedor = (req, res) => {
    const {id_proveedor} = req.params;
    const {nombre_empresa,telefono,email,direccion,ciudad,codigo_postal,pais,fecha_registro,estado} = req.body;
    const sql ="UPDATE proveedor SET nombre_empresa = ?,telefono = ?,email = ?,direccion = ?,ciudad = ?,codigo_postal = ?,pais = ?,fecha_registro = ?,estado = ? WHERE id_proveedor = ?";
    db.query(sql,[nombre_empresa,telefono,email,direccion,ciudad,codigo_postal,pais,fecha_registro,estado,id_proveedor], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: no existe el proveedor a modificar no existe"});
        };
        
        const moda = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(moda); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyProveedor = (req, res) => {
    const {id_proveedor} = req.params;
    const sql = "DELETE FROM proveedor WHERE id_proveedor = ?";
    db.query(sql,[id_proveedor], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: el proveedor a borrar no existe"});
        };
        res.json({mesaje : "Proveedor Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
   allProveedor,
   showProveedor,
   storeProveedor,
   updateProveedor,
   destroyProveedor
};