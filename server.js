const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 5500; // Puerto en el que se ejecutará el servidor
let gameInProgress = false;
let carPosition = 1; // Carril actual del carro (inicia en el carril central)

app.use(cors());
app.use(express.static('publicControl'));
app.use(express.static('publicGame'));

// Maneja la conexión de un cliente
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  // El cliente envía instrucciones para mover el carro
  socket.on('move', (direction) => {
    if (gameInProgress) {
      // Aquí puedes añadir lógica adicional si es necesario
      io.emit('carMoved', direction); // Envía la dirección del movimiento a todos los clientes
    }
  });

  // El cliente inicia el juego
  socket.on('startGame', () => {
    if (!gameInProgress) {
      startGame();
    }
  });

  // Maneja la desconexión del cliente
  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor en ejecución en el puerto ${port}`);
});

function startGame() {
  gameInProgress = true;

  // Envía una señal de inicio de juego a todos los clientes
  io.emit('gameStarted');
}
