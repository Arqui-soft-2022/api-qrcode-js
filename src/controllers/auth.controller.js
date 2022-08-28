const { response } = require("express");
const pool = require('../database/conexion')
const bcrypt = require('bcryptjs')


const login = async(req, res= response) =>{

    let { 
        username,
        password
    } = req.body;

    try {

        let usuario = await pool.query('SELECT * FROM usuario WHERE username = ?', [username]);
        usuario = usuario[0];

        if(!usuario){
            return res.status(404).json({
                msg: 'Usuario o contraseña invalidos'
            })
        }

        const contraseñaValida = bcrypt.compareSync( password, usuario.password);
        
        if(!contraseñaValida){
            return res.status(404).json({
                msg: 'Usuario o contraseña invalidos'
            })
        }

        res.json({
            usuario
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

const register = async( req, res = response) =>{

    let {
        username,
        password,
        email,
        name
    } = req.body;


    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    let usuario = {
        username,
        password,
        email,
        name
    }

    try {
        await pool.query('INSERT INTO usuario SET ?', [ usuario ]);

        const id = await pool.query('SELECT id_usuario FROM usuario WHERE username = ?', [username]);

        usuario.id_usuario = id[0].id_usuario;

        res.json({
            msg: 'Registrado con exito',
            usuario
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }

}

module.exports = {
    login,
    register
}