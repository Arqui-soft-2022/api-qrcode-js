const { response } = require("express");


const retornarImg = async(req, res= response) =>{
    res.status(200).json({
        msg: 'retornando img '
    })
}

module.exports = {
    retornarImg
}