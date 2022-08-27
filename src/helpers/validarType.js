const axios = require('axios');
const pool = require('../database/conexion');

const contentType = async (url) => {

    let content;
    await axios.get(url)
        .then(function (response) {
            const { headers } = response;
            content = headers['content-type'];
        })

    return content;
}


const verificarType = async (url, content) => {

    console.log(content)

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
            case 'application/pdf':
                id = await pool.query('SELECT id_type FROM type WHERE descripcion = pdf');
                type = id[0];

                break;

            case 'image/png' || 'image/jpeg' || 'image/gif' || 'image/svg':
                id = await pool.query('SELECT id_type FROM type WHERE descripcion = image');
                type = id[0];

                break;

            default:
                id = await pool.query('SELECT id_type FROM type WHERE descripcion = desconocido');
                type = id[0];
                break;
        }
    }


    return type;
}

module.exports = {
    contentType,
    verificarType
};