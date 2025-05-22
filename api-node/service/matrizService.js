const stats = require("./stats");
const { generateJWT } = require('./token');
exports.analyzeMatrix = (req, res) => {
  const matrix = req.body.matrixRotado;

  if (!Array.isArray(matrix)) {
    return res.status(500).json({ error: "Formato de matriz inválido" });
  }
  const result = stats.analyzeMatrix(matrix);
  return res.json(result);
};

exports.token = (req, res) => {
  const token = generateJWT();
  res.json({ token });
};
