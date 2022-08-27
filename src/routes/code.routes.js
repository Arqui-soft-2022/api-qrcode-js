const { Router } = require('express');
const { retornarImg } = require('../controllers/code.controller');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuario } = require('../helpers/database-validators');


const router = Router();

router.post('/', [
    check('url', 'No hay url en la peticion').not().isEmpty(),
    check('user', 'Debe enviar el id del usuario').not().isEmpty(),
    check('user').custom(existeUsuario),
    validarCampos
] ,retornarImg);


module.exports = router;