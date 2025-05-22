// ==== Constantes de configuración ====
// const API_GO_BASE = "http://localhost:3000";
// const API_NODE_BASE = "http://localhost:4000";
const API_GO_BASE = "https://go-backend.onrender.com";
const API_NODE_BASE = "https://node-backend.onrender.com";

const ENDPOINTS = {
  GO_TOKEN: `${API_GO_BASE}/token`,
  GO_PROCESS: `${API_GO_BASE}/process`,
  NODE_TOKEN: `${API_NODE_BASE}/token`,
  NODE_STATS: `${API_NODE_BASE}/stats`,
};

// ==== Función principal ====
async function enviar() {
  const raw = document.getElementById("matrixInput").value.trim();
  const matrix = raw.split('\n').map(row => row.split(',').map(Number));

  try {
    // Obtener token del backend en Go
    const tokenGo = await obtenerToken(ENDPOINTS.GO_TOKEN);

    // Enviar matriz a backend Go (/process)
    const dataGo = await postJSON(ENDPOINTS.GO_PROCESS, { matrix }, tokenGo);
    if (dataGo.error) return mostrarError("resultado", dataGo.error);

    mostrarQR(dataGo.qr);

    if (dataGo.rotated){
      // Obtener token del backend Node.js
      const tokenNode = await obtenerToken(ENDPOINTS.NODE_TOKEN);
      // Enviar matriz rotada a Node.js (/stats)
      const dataNode = await postJSON(ENDPOINTS.NODE_STATS, { matrixRotado: dataGo.rotated }, tokenNode);
      mostrarEstadisticas(dataNode);
    }
    
  } catch (error) {
    mostrarError("resultado", "Ocurrió un error en el procesamiento.");
    console.error(error);
  }
}

// ==== Utilidades ====
async function obtenerToken(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Error obteniendo token desde ${url}`);
  const data = await res.json();
  return data.token;
}

async function postJSON(url, payload, token) {
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Error en POST a ${url}: ${errorText}`);
  }

  return await res.json();
}

function mostrarQR(qr) {
  const cont = document.getElementById("resultado");
  cont.innerHTML = `
    <h4>Matriz Q:</h4>
    ${matrizATabla(qr)}
  `;
}

function mostrarEstadisticas(stats) {
  const cont = document.getElementById("resultado2");
  cont.textContent = `
Máximo: ${stats.max}
Mínimo: ${stats.min}
Suma: ${stats.sum}
Promedio: ${stats.average}
¿Es Diagonal?: ${stats.isDiagonal ? 'Sí' : 'No'}
`.trim();
}

function mostrarError(id, mensaje) {
  document.getElementById(id).textContent = mensaje;
}

function matrizATabla(matriz) {
  return `<table>
    ${matriz.map(fila => `
      <tr>${fila.map(num => `<td>${num.toFixed(3)}</td>`).join('')}</tr>
    `).join('')}
  </table>`;
}
