const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const usuario = require("../models/user.models");


//// METODO POST   /////

// Función para registrar usuario
const register = (req, res) => {
    console.log(req.file);
    let imageName = "";

    if(req.file){
        imageName = req.file.filename;
    };

    const { nombre, mail, password, id_rol} = req.body;

    // Verificar si el usuario ya existe
    db.query('SELECT * FROM usuario WHERE mail = ?', [mail], (error, results) => {
        if (error) {
            console.error("Registration error:", error);
            return res.status(500).send("Error checking user existence");
        }

        if (results.length > 0) {
            return res.status(400).send("User with that email already exists.");
        }
        
        // Encriptar la contraseña
        bcrypt.hash(password, 8, (err, hash) => {
            if (err) {
                console.error("Error hashing password:", err);
                return res.status(500).send("Error hashing password.");
            }

            // Insertar nuevo usuario en la base de datos
            db.query('INSERT INTO usuario (nombre, mail, password, imagen, id_rol) VALUES (?, ?, ?, ?, ?)', [nombre,mail, hash, imageName,id_rol], (insertError, insertResults) => {
                if (insertError) {
                    console.error("Error inserting user:", insertError);
                    return res.status(500).send("Error registering user");
                }

                // Obtener el ID del usuario recién creado
                const id_usuario = insertResults.insertId;

                // Generar un token JWT con el ID del usuario
                const token = jwt.sign({ id: id_usuario }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });

                // Enviar la respuesta con el token
                res.status(201).send({ auth: true, token });
            });
        });
    });
};


// Función para hacer login
const login = (req, res) => {
    const { mail, password } = req.body;
    // Buscar al usuario por correo electrónico
    db.query('SELECT * FROM usuario WHERE mail = ?', [mail], (error, results) => {
        if (error) {
            //console.error("Login error:", error);
            return res.status(500).send("Error during login");
        }

        // Verificar si el usuario existe
        if (results.length === 0) {
            return res.status(404).send("User not found.");
        }

        const user = results[0];

        // Comparar la contraseña
        bcrypt.compare(password, user.password, (err, passwordIsValid) => {
            console.log(password)
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).send("Error comparing passwords");
            }

            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            // Generar un token JWT con el ID del usuario
            const token = jwt.sign({ id: usuario.id_usuario }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            // Enviar la respuesta con el token
            res.send({ auth: true, token });
        });
    });
};

//// METODO GET  /////

const allUsers = (req, res) => {
    const sql = `
        SELECT 
            usuario.id_usuario, 
            usuario.nombre,
            usuario.mail, 
            usuario.imagen, 
            rol.descripcion 
        FROM usuario
        INNER JOIN rol ON usuario.id_rol = rol.id_rol
    `;

    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};

const showUser = (req, res) => {
    const {id_usuario} = req.params;
    const sql = `
        SELECT 
            usuario.id_usuario, 
            usuario.nombre,
            usuario.mail,
            usuario.imagen, 
            rol.descripcion 
        FROM usuario
        INNER JOIN rol ON usuario.id_rol = rol.id_rol
        WHERE usuario.id_usuario = ?
    `;
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
    const {nombre, mail, password, id_rol} = req.body;

    //Encryptacion
    bcrypt.hash(password,10,(err,hashedPassword) => {

        if(err){
            return res.status(500).send("Error de encriptacion");
        }
        const sql ="UPDATE usuario SET nombre = ?, mail = ?, password = ?, imagen = ? , id_rol = ? WHERE id_usuario = ?";
        db.query(sql,[nombre, mail, hashedPassword, imageName,id_rol, id_usuario], (error, result) => {
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