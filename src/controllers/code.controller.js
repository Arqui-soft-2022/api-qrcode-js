const { response } = require("express");
const pool = require('../database/conexion')
const qrcode = require('qrcode')


const retornarImg = async(req, res= response) =>{
    
    const { url, user, type } = req.body;
    const url_code = await qrcode.toDataURL(url);

    const date = new Date();

    const qr_code ={
        url,
        url_code,
        user,
        type,
        date
    }

    try {
        
        await pool.query('INSERT INTO qr_code SET ?', qr_code);

        res.json({
            msg: 'Registrado con exito',
            qr_code
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Algo salió mal'
        })
    }
    
}

module.exports = {
    retornarImg
}