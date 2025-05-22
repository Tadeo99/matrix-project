const express = require('express');
const app = express();
const router = require('./router/clienteRoute.js');
app.use(express.json());

// CORS headers
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Cambia "*" por tu dominio si es necesario
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.use('/', router);

app.listen(4000, () => {
    console.log('Node API running on port 4000');
});
