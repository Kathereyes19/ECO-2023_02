const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Configura la ruta para servir el juego y otros archivos estáticos
app.use(express.static('public'));

// Maneja la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // Maneja el evento para mover el carro
  socket.on('moveCar', (direction) => {
    // Implementa la lógica para mover el carro aquí
    console.log(`Mover el carro hacia ${direction}`);
  });

  // Maneja la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});
