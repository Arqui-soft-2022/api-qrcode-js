const axios = require('axios');
const pool = require('../database/conexion');

const contentType = async (url) => {

    let content;

    let regex = new RegExp('linkedin');
    let resp = regex.test(url);

    if(resp){
        content = 'text/html';
        return content;
    }

    try {
        await axios.get(url)
        .then(function (response) {
            const { headers } = response;
            content = headers['content-type'];
        })

        return content;
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
    
}

const verificarType = async (url, content) => {

    let type = 0;
    const dominios = await pool.query('SELECT * FROM type');

    for (const dom of dominios) {
        let regex = new RegExp(`${dom.descripcion}`)
        const resp = regex.test(url)
        if (resp) {
            type = dom.id_type;
        }
    }

    if (type == 0) {
        let id;
        switch (content) {
            case 'application/pdf':
                id = await pool.query('SELECT id_type FROM type WHERE descripcion = pdf');
                type = id[0];

                break;
            case 'video/x-msvideo':
                id = await pool.query('SELECT id_type FROM type WHERE descripcion = video');
                type = id[0];

                break;

            case 'image/png' || 'image/jpeg' || 'image/gif' || 'image/svg':
                id = await pool.query('SELECT id_type FROM type WHERE descripcion = image');
                type = id[0];

                break;

            default:
                type = 5;
                break;
        }
    }


    return type;
}

module.exports = {
    contentType,
    verificarType
};