const socket = io.connect('http://localhost:5500');
let currentLane = 1; // Carril actual del carro (inicia en el carril central)
let gameStarted = false;
let leftButton, startButton, rightButton; // Declarar los botones como variables

function setup() {
  createCanvas(390, 844);
  
  // Definir las posiciones y dimensiones de los botones
  const buttonY = height - 100;
  const buttonWidth = 100;
  const buttonHeight = 50;

  // Crear el botón para mover el carro a la izquierda
  leftButton = createButton("Izquierda");
  leftButton.position(width / 6, buttonY);
  leftButton.mousePressed(moveCarLeft);

  // Crear el botón para iniciar el juego
  startButton = createButton("Iniciar Juego");
  startButton.position(width / 2, buttonY);
  startButton.mousePressed(startGame);

  // Crear el botón para mover el carro a la derecha
  rightButton = createButton("Derecha");
  rightButton.position((5 * width) / 6, buttonY);
  rightButton.mousePressed(moveCarRight);

  leftButton.id('leftButton');
  startButton.id('startButton');
  rightButton.id('rightButton');
}

function touchStarted() {
  if (gameStarted) {
    // Verificar si se tocó alguno de los botones de movimiento
    checkButtonPress();
  } else {
    // Verificar si se tocó el botón de inicio del juego
    checkStartButtonPress();
  }
  console.log('touchStarted ejecutado, gameStarted:', gameStarted);
  return false;
}

function checkButtonPress() {
  if (mouseX >= leftButton.x && mouseX <= leftButton.x + leftButton.width && mouseY >= leftButton.y && mouseY <= leftButton.y + leftButton.height) {
    leftButton.mousePressed();
    console.log('Botón Izquierda presionado');
  } else if (mouseX >= rightButton.x && mouseX <= rightButton.x + rightButton.width && mouseY >= rightButton.y && mouseY <= rightButton.y + rightButton.height) {
    rightButton.mousePressed();
    console.log('Botón Derecha presionado');
  }
}

function checkStartButtonPress() {
  if (mouseX >= startButton.x && mouseX <= startButton.x + startButton.width && mouseY >= startButton.y && mouseY <= startButton.y + startButton.height) {
    startButton.mousePressed();
    socket.emit('startGame'); // Enviar un evento de inicio de juego al servidor
  }
}

function moveCarLeft() {
  if (currentLane > 0) {
    currentLane--;
    socket.emit('move', 'left'); // Enviar un evento de movimiento izquierdo al servidor
  }
  console.log('Botón Izquierda presionado');
}

function moveCarRight() {
  if (currentLane < 2) {
    currentLane++;
    socket.emit('move', 'right'); // Enviar un evento de movimiento derecho al servidor
  }
console.log('Botón Derecho presionado');
}

function startGame() {
  gameStarted = true;
  const gameContainer = document.getElementById('game-container');
  gameContainer.style.display = 'block';
  socket.emit('startGame'); // Enviar un evento de inicio de juego al servidor
}
