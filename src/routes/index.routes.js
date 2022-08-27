const { Router } = require('express');

const router = Router();

router.get('/', (req, res)=>{
    res.send('QR API - Arquitectura del software')
})

module.exports = router;