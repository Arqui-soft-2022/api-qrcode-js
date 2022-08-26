const { response } = require("express");


const login = async(req, res= response) =>{
    res.status(200).json({
        msg: 'Login '
    })
}

module.exports = {
    login
}