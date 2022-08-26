const pool = require('../database/conexion');


const existeUsuario = async (id) => {

    let usuarioId = await pool.query('SELECT id_usuario FROM usuario WHERE id_usuario = ?', [id]);

    if (usuarioId.length < 0) {
        throw new Error('El usuario no existe');
    }
}

module.exports = {
    existeUsuario
}