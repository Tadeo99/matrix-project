const jwt = require('jsonwebtoken');

function generateJWT() {
  const payload = {
    user: "tadeo",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 // 1 hora
  };

  const token = jwt.sign(payload, 'secret'); // Usa la misma clave 'secret'
  return token;
}

module.exports = { generateJWT };
