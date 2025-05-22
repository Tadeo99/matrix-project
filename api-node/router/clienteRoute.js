const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../seguridad/jwtMiddleware');
const service = require('../service/matrizService');

router.post('/stats',jwtMiddleware,service.analyzeMatrix);
router.get('/token',service.token);

module.exports = router;