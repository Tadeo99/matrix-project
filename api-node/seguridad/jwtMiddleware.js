const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Permitir solicitudes OPTIONS sin autenticación (CORS preflight)
    if (req.method === 'OPTIONS') {
        return next();
    }

    const token = req.headers['authorization'];
    if (!token || !token.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    const actualToken = token.slice(7);
    try {
        jwt.verify(actualToken, 'secret');
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};
