const { Router } = require('express');
const { retornarImg } = require('../controllers/code.controller');


const router = Router();

router.post('/', retornarImg);


module.exports = router;