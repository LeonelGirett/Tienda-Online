const db = require("../db/db");

//// METODO GET  /////


const allInventario = (req, res) => {
    const sql = `
        SELECT 
        i.id_inventario,
        i.stock,
        i.ubicacion_almacen,
        i.fecha_ingreso,
        m.nombre_producto,
        p.nombre_empresa
    FROM 
        inventario i
    JOIN 
        moda m ON i.id_moda = m.id_moda
    JOIN 
        proveedor p ON i.id_proveedor = p.id_proveedor;
    `;
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};


const showInventario = (req, res) => {
    const {id_inventario} = req.params;
    const sql = `
        SELECT 
        i.id_inventario,
        i.stock,
        i.ubicacion_almacen,
        i.fecha_ingreso,
        m.nombre_producto,
        p.nombre_empresa
    FROM 
        inventario i
    JOIN 
        moda m ON i.id_moda = m.id_moda
    JOIN 
        proveedor p ON i.id_proveedor = p.id_proveedor
    WHERE 
    i.id_inventario = ?;
    `;
    db.query(sql,[id_inventario], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el inventario a buscar"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO POST  ////
const storeInventario = (req, res) => {
    const {stock,ubicacion_almacen,precio,fecha_ingreso,id_moda,id_proveedor} = req.body;
    const sql = "INSERT INTO inventario (stock,ubicacion_almacen,precio,fecha_ingreso,id_moda,id_proveedor) VALUES (?,?,?,?,?,?)";
    db.query(sql,[stock,ubicacion_almacen,precio,fecha_ingreso,id_moda,id_proveedor], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const moda = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(moda); // muestra creado con exito el elemento
    });     

};

//// METODO PUT  ////
const updateInventario = (req, res) => {
    const {id_inventario} = req.params;
    const {stock,ubicacion_almacen,precio,fecha_ingreso,id_moda,id_proveedor} = req.body;
    const sql ="UPDATE inventario SET stock = ?, ubicacion_almacen = ? , precio = ?, fecha_ingreso = ?, id_moda = ?, id_proveedor = ? WHERE id_inventario = ?";
    db.query(sql,[stock,ubicacion_almacen,precio,fecha_ingreso,id_moda,id_proveedor,id_inventario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: no existe el inventario a modificar no existe"});
        };
        
        const moda = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(moda); // mostrar el elmento que existe
    });     
};


//// METODO DELETE ////
const destroyInventario = (req, res) => {
    const {id_inventario} = req.params;
    const sql = "DELETE FROM inventario WHERE id_inventario = ?";
    db.query(sql,[id_inventario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: el inventario a borrar no existe"});
        };
        res.json({mesaje : "Inventario Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
   allInventario,
   showInventario,
   storeInventario,
   updateInventario,
   destroyInventario
};