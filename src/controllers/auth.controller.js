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

    console.log(password)

    const salt = bcrypt.genSaltSync();
    password = bcrypt.hashSync(password, salt);

    const usuario = {
        username,
        password,
        email,
        name
    }

    try {
        await pool.query('INSERT INTO usuario SET ?', [ usuario ]);

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