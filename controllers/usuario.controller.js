const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//// METODO POST   /////

const register = (req, res) => {
    console.log(req.file);
    let imageName = "";

    if(req.file){
        imageName = req.file.filename;
    };

    const { nombre, mail, password,id_rol} = req.body;
    //Encryptacion
    bcrypt.hash(password,10,(err,hashedPassword) => {

        if(err){
            return res.status(500).send("Error de encriptacion");
        }
        const sql = 'INSERT INTO usuario (nombre, mail, password,imagen,id_rol) VALUES (?,?,?,?,?)';
        db.query(sql,[nombre, mail,hashedPassword,imageName,id_rol], (error, rows) => {
            console.log(rows);
            if(error){
                return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
            }
            if(rows.length == 0){
                return res.status(404).send({error : "ERROR: No existe el usuario buscado"});
            };
            res.json(rows[0]); 
            // me muestra el elemento en la posicion cero si existe.
        });
    });   
};

const login = (req, res) => {
    const { mail, password } = req.body;

    const sql = "SELECT * FROM usuario WHERE mail = ?";
    db.query(sql, [mail], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "Error en la base de datos" });
        }

        // Si el usuario no existe
        if (rows.length === 0) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const user = rows[0];

        // Comparar la contraseña ingresada con bcrypt
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error en la verificación de contraseña" });
            }

            if (!result) {
                return res.status(401).json({ error: "Contraseña incorrecta" });
            }

            // Checkear el rol del usuario
            if (user.id_rol === 1) {
                return res.json({ message: "Bienvenido Admin", user });
            } else if (user.id_rol === 2) {
                return res.json({ message: "Bienvenido Usuario", user });
            } else {
                return res.status(403).json({ error: "Rol no autorizado" });
            }
        });
    });
};



//// METODO GET  /////

const allUsers = (req, res) => {
    const sql = "SELECT * FROM usuario";
    db.query(sql, (error, rows) => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }); 
};

const showUser = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "SELECT * FROM usuario WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error, rows) => {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length == 0){
            return res.status(404).send({error : "ERROR: No existe el usuario buscado"});
        };
        res.json(rows[0]); 
        // me muestra el elemento en la posicion cero si existe.
    }); 
};

//// METODO PUT  ////
const updateUser = (req, res) => {
    console.log(req.file);
    let imageName = "";

    if(req.file){
        imageName = req.file.filename;
    };

    const {id_usuario} = req.params;
    const {nombre, mail, password} = req.body;

    //Encryptacion
    bcrypt.hash(password,10,(err,hashedPassword) => {

        if(err){
            return res.status(500).send("Error de encriptacion");
        }
        const sql ="UPDATE usuario SET nombre = ?, mail = ?, password = ?, imagen = ? WHERE id_usuario = ?";
        db.query(sql,[nombre, mail, hashedPassword, imageName, id_usuario], (error, result) => {
            console.log(result);
            if(error){
                return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
            }
            if(result.affectedRows == 0){
                return res.status(404).send({error : "ERROR: El usuario a modificar no existe"});
            };
            
            const login = {...req.body, ...req.params}; // ... reconstruir el objeto del body

            res.json(login); // mostrar el elemento que existe
        });
    });       
};


//// METODO DELETE ////
const destroyUser = (req, res) => {
    const {id_usuario} = req.params;
    const sql = "DELETE FROM usuario WHERE id_usuario = ?";
    db.query(sql,[id_usuario], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: El usuario a borrar no existe"});
        };
        res.json({mesaje : "Usuario Eliminado"});
    }); 
};


// EXPORTAR DEL MODULO TODAS LAS FUNCIONES
module.exports = {
    register,
    login,
    allUsers,
    showUser,
    updateUser,
    destroyUser
};