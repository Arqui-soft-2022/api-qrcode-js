const { response } = require("express");
const pool = require('../database/conexion')
const qrcode = require('qrcode');
const { contentType, verificarType } = require("../helpers/validarType");


const retornarImg = async(req, res= response) =>{
    
    const { url, user } = req.body;
    const url_code = await qrcode.toDataURL(url);
    
    let type = 0;
    const date = new Date();

    const content = await contentType(url);
    
    type = await verificarType(url, content)
    console.log(type)

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