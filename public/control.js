let currentLane = 1; // Carril actual del carro (inicia en el carril central)
let gameStarted = false;

function setup() {
  createCanvas(windowWidth, windowHeight);
  let buttonWidth = width / 3;
  let buttonHeight = 60;
  let buttonY = height - buttonHeight - 20;

  // Botón para mover el carro a la izquierda
  createButton(width / 6, buttonY, buttonWidth, buttonHeight, 'Izquierda', moveCarLeft);

  // Botón para iniciar el juego
  createButton(width / 2, buttonY, buttonWidth, buttonHeight, 'Iniciar Juego', startGame);

  // Botón para mover el carro a la derecha
  createButton((5 * width) / 6, buttonY, buttonWidth, buttonHeight, 'Derecha', moveCarRight);
}

function createButton(x, y, w, h, label, action) {
  rectMode(CENTER);
  fill(0, 255, 0);
  rect(x, y, w, h, 10);
  fill(0);
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, x, y);
  return {
    x: x - w / 2,
    y: y - h / 2,
    width: w,
    height: h,
    action: action,
  };
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
  const leftButton = createButton(width / 6, height - 80, width / 3, 60, 'Izquierda', moveCarLeft);
  const rightButton = createButton((5 * width) / 6, height - 80, width / 3, 60, 'Derecha', moveCarRight);

  if (mouseX >= leftButton.x && mouseX <= leftButton.x + leftButton.width &&
      mouseY >= leftButton.y && mouseY <= leftButton.y + leftButton.height) {
    leftButton.action();
  } else if (mouseX >= rightButton.x && mouseX <= rightButton.x + rightButton.width &&
             mouseY >= rightButton.y && mouseY <= rightButton.y + rightButton.height) {
    rightButton.action();
  }
}

function checkStartButtonPress() {
  const buttonWidth = width / 3;
  const buttonHeight = 60;
  const buttonX = (width - buttonWidth) / 2;
  const buttonY = height - buttonHeight - 20;

  if (mouseX >= buttonX && mouseX <= buttonX + buttonWidth &&
      mouseY >= buttonY && mouseY <= buttonY + buttonHeight) {
    startGame();
  }
}

function moveCarLeft() {
  if (currentLane > 0) {
    currentLane--;
    getCar().moveToLane(currentLane);
  }
}

function moveCarRight() {
  if (currentLane < 2) {
    currentLane++;
    getCar().moveToLane(currentLane);
  }
}

function startGame() {
  gameStarted = true;
  const gameContainer = document.getElementById('game-container');
  gameContainer.style.display = 'block';
}

function getCar() {
  return car;
}
