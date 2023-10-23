const socket = io.connect('http://localhost:5501');

let currentLane = 1; // Carril actual del carro (inicia en el carril central)
let gameStarted = false;

function setup() {
  createCanvas(390, 844);

  // Botón para mover el carro a la izquierda
  const leftButton = createButton(width / 6, buttonY, buttonWidth, buttonHeight, 'Izquierda', moveCarLeft);

  // Botón para iniciar el juego
  const startButton = createButton(width / 2, buttonY, buttonWidth, buttonHeight, 'Iniciar Juego', startGame);

  // Botón para mover el carro a la derecha
  const rightButton = createButton((5 * width) / 6, buttonY, buttonWidth, buttonHeight, 'Derecha', moveCarRight);

  leftButton.id = 'leftButton';
  startButton.id = 'startButton';
  rightButton.id = 'rightButton';
}

function createButton(x, y, w, h, label, action) {
  rectMode(CENTER);
  fill(0, 255, 0);
  rect(x, y, w, h, 10);
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, x, y);
  const button = {
    x: x - w / 2,
    y: y - h / 2,
    width: w,
    height: h,
    action: action,
  };
  return button;
}

function touchStarted() {
  if (gameStarted) {
    // Verificar si se tocó alguno de los botones de movimiento
    checkButtonPress();
  } else {
    // Verificar si se tocó el botón de inicio del juego
    checkStartButtonPress();
  }
  return false;
}

function checkButtonPress() {
  const leftButton = document.getElementById('leftButton');
  const rightButton = document.getElementById('rightButton');

  if (mouseX >= leftButton.x && mouseX <= leftButton.x + leftButton.width &&
      mouseY >= leftButton.y && mouseY <= leftButton.y + leftButton.height) {
    leftButton.action();
  } else if (mouseX >= rightButton.x && mouseX <= rightButton.x + rightButton.width &&
             mouseY >= rightButton.y && mouseY <= rightButton.y + rightButton.height) {
    rightButton.action();
  }
}

function checkStartButtonPress() {
  const startButton = document.getElementById('startButton');
  if (mouseX >= startButton.x && mouseX <= startButton.x + startButton.width &&
      mouseY >= startButton.y && mouseY <= startButton.y + startButton.height) {
    startGame();
    socket.emit('startGame'); // Enviar un evento de inicio de juego al servidor
  }
}

function moveCarLeft() {
  if (currentLane > 0) {
    currentLane--;
    socket.emit('move', 'left'); // Enviar un evento de movimiento izquierdo al servidor
  }
}

function moveCarRight() {
  if (currentLane < 2) {
    currentLane++;
    socket.emit('move', 'right'); // Enviar un evento de movimiento derecho al servidor
  }
}

function startGame() {
  gameStarted = true;
  const gameContainer = document.getElementById('game-container');
  gameContainer.style.display = 'block';
  socket.emit('startGame'); // Enviar un evento de inicio de juego al servidor
}

