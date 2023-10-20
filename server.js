const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const generateQRCode = require('./qrcode-generation'); // Asegúrate de que qrcode-generation.js esté en la misma carpeta que server.js

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static('public'));

const port = 3000;
server.listen(port, () => {
  console.log(`Servidor en http://localhost:${port}`);
});

io.on('connection', (socket) => {
  console.log('Nuevo cliente conectado.');
});
