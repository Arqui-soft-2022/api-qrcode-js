const { Router } = require('express');
const { login, register } = require('../controllers/auth.controller');
const { check } = require('express-validator'); 
const { validarCampos } = require('../middlewares/validar-campos');
const { existeUsuarioByUsername, noExisteUsuarioByUsername, noExisteUsuarioByEmail } = require('../helpers/database-validators');

const router = Router();

router.post('/login', [
    check('username', 'Debe enviar username').not().isEmpty(),
    check('password', 'Debe enviar contraseña').not().isEmpty(),
    check('username').custom(existeUsuarioByUsername),
    validarCampos
], login);

router.post('/register', [
    check('username', 'Debe enviar username').not().isEmpty(),
    check('password', 'Debe enviar contraseña').not().isEmpty(),
    check('email', 'Debe enviar email').not().isEmpty(),
    check('name', 'Debe enviar el name').not().isEmpty(),
    check('username').custom(noExisteUsuarioByUsername),
    check('email').custom(noExisteUsuarioByEmail),
    validarCampos
], register)


module.exports = router;