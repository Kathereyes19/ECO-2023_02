const socket = io.connect('http://localhost:5500');
let currentLane = 1; // Carril actual del carro (inicia en el carril central)
let backgroundImage; // Variable para almacenar la imagen de fondo

function preload() {
  // Carga la imagen de fondo
  backgroundImage = loadImage('img/fondo.png');
}

function setup() {
  const canvasDiv = select('#canvas-container');
  const myCanvas = createCanvas(390, 844);
  myCanvas.parent(canvasDiv);

  const buttonWidth = 60; // Ancho de los botones
  const buttonHeight = 30; // Alto de los botones
  const centerX = width / 2; // Posición horizontal del centro del canvas
  const centerY = height / 2; // Posición vertical del centro del canvas
  const spacing = 20; // Espacio entre los botones

  // Crear botón para mover el carro a la izquierda
  const leftButton = createButton("Izquierda");
  leftButton.parent(canvasDiv);
  leftButton.position(centerX - buttonWidth - spacing, centerY - buttonHeight / 2);
  leftButton.mousePressed(moveCarLeft);
  
  // Crear botón para mover el carro a la derecha
  const rightButton = createButton("Derecha");
  rightButton.parent(canvasDiv);
  rightButton.position(centerX + spacing, centerY - buttonHeight / 2);
  rightButton.mousePressed(moveCarRight);
}

function draw() {
  // Dibuja la imagen de fondo en el canvas
  image(backgroundImage, 0, 0, width, height);
  // Resto del código
  console.log('si buenassss');
}

function moveCarLeft() {
  if (currentLane > 0) {
    currentLane--;
    console.log('Botón Izquierda presionado');
    socket.emit('move', 'left'); // Enviar un evento de movimiento izquierdo al servidor
  }
}

function moveCarRight() {
  if (currentLane < 2) {
    currentLane++;
    console.log('Botón Derecha presionado');
    socket.emit('move', 'right'); // Enviar un evento de movimiento derecho al servidor
  }
}
