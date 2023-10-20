let currentLane = 1;  // Carril actual del carro (inicia en el carril central)
let gameStarted = false; // Variable para rastrear si el juego ha comenzado

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Configura el tamaño del botón para iniciar el juego
  let buttonWidth = width / 3;
  let buttonHeight = 60;
  let buttonX = (width - buttonWidth) / 2;
  let buttonY = height - buttonHeight - 20;
  
  // Dibuja el botón para iniciar el juego
  rectMode(CENTER);
  fill(0, 255, 0); // Color verde
  rect(buttonX, buttonY, buttonWidth, buttonHeight, 10); // Botón redondeado
  fill(0); // Texto negro
  textSize(24);
  textAlign(CENTER, CENTER);
  text('Iniciar Juego', width / 2, buttonY);
}

function touchStarted() {
  if (gameStarted) {
    // Si el juego ya ha comenzado, maneja los controles del carro
    if (mouseX < width / 3) {
      moveCarLeft();
    } else if (mouseX > (2 * width) / 3) {
      moveCarRight();
    }
  } else {
    // Si el juego no ha comenzado, verifica si se presionó el botón de inicio
    let buttonWidth = width / 3;
    let buttonHeight = 60;
    let buttonX = (width - buttonWidth) / 2;
    let buttonY = height - buttonHeight - 20;
    
    if (mouseX > buttonX - buttonWidth / 2 && mouseX < buttonX + buttonWidth / 2 &&
        mouseY > buttonY - buttonHeight / 2 && mouseY < buttonY + buttonHeight / 2) {
      startGame(); // Inicia el juego si se presiona el botón
    }
  }
  return false;  // Evita el comportamiento predeterminado del navegador al tocar la pantalla
}

function moveCarLeft() {
  if (currentLane > 0) {
    currentLane--;
    getCar().moveToLane(currentLane);  // Usa getCar() para obtener una referencia al carro
  }
}

function moveCarRight() {
  if (currentLane < 2) {
    currentLane++;
    getCar().moveToLane(currentLane);  // Usa getCar() para obtener una referencia al carro
  }
}

function startGame() {
  gameStarted = true; // Establece el estado del juego como "iniciado"
  const gameContainer = document.getElementById('game-container');
  gameContainer.style.display = 'block'; // Muestra el contenedor del juego


// Función para obtener una referencia al carro (debes implementarla en sketch.js)
function getCar() {
  return car;
}
}