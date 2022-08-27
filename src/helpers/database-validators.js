const pool = require('../database/conexion');


const existeUsuario = async (user) => {

    let usuario = await pool.query('SELECT * FROM usuario WHERE id_usuario = ?', [user]);

    if (usuario.length == 0) {
        throw new Error('El usuario no existe');
    }
}

const existeUsuarioByUsername = async (username) => {

    let usuario = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);

    if (usuario.length == 0) {
        throw new Error('El usuario no existe');
    }
}

const noExisteUsuarioByUsername = async (username) => {

    let usuario = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);

    if (usuario.length > 0) {
        throw new Error('El usuario ya existe');
    }
}

const noExisteUsuarioByEmail = async (email) => {

    let usuario = await pool.query('SELECT * FROM usuario WHERE email = ?', [email]);
    
    if (usuario.length > 0) {
        throw new Error('El usuario ya existe');
    }
}

module.exports = {
    existeUsuario,
    existeUsuarioByUsername,
    noExisteUsuarioByEmail,
    noExisteUsuarioByUsername
}