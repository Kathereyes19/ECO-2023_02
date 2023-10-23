const socket = io.connect('http://localhost:5500');
let car;
let carImage;
let obstacles = [];
let score = 0;
let roadWidth = 300;
let speed = 3;
let countdown = 3;
let gameStarted = false;
let gameEnded = false;
const obstacleImages = [];

// Carga de imágenes de obstáculos
function preload() {
  carImage = loadImage('./img/carro.png');
  FondoImage = loadImage('./img/fondo.png');
  obstacleImages.push(loadImage('./img/obstaculo1.png'));
  obstacleImages.push(loadImage('./img/obstaculo2.png'));
  obstacleImages.push(loadImage('./img/obstaculo3.png'));
  obstacleImages.push(loadImage('./img/obstaculo4.png'));
}
// Evento: El juego ha comenzado
socket.on('gameStarted', () => {
  startGame();
  console.log('Evento gameStarted recibido');
});

// Evento: Movimiento del carro
socket.on('carMoved', (direction) => {
  if (gameStarted && !gameEnded) {
    moveCar(direction);
    console.log('Evento carMoved recibido con dirección:', direction);
  }
});

function setup() {
  createCanvas(477, 658);
  car = new Car();
  startCountdown();
}

function draw() {
background(FondoImage); 
  if (countdown > 0) {
    displayCountdown();
    return;
  }
  const centerX = width / 2;

  if (car) {
    const carX = car.lane * car.laneWidth + centerX;
    drawCar(carX, car.y, car.lane, car.laneWidth, car.width, car.height);

    if (!gameEnded) {
      if (frameCount % 60 === 0) {
        let lane = Math.floor(random(0, 4));
        let obstacle = new Obstacle(lane);
        obstacles.push(obstacle);
      }
    }

    // Colisión con obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
      drawObstacle(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

      if (!gameEnded && car.hits(obstacles[i])) {
        gameEnded = true;
        gameOver();
      }
    }

    // Muestra la puntuación
    textSize(32);
    fill(0);
    text('Puntuación: ' + score, 20, 50);

    if (!gameEnded) {
      score++;
    }
  }

  if (!gameEnded) {
    // Mueve y dibuja los obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
      obstacles[i].move();
      drawObstacle(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

      if (obstacles[i].y > height) {
        obstacles.splice(i, 1);
      }
    }
  }
}

function displayCountdown() {
  textSize(72);
  fill(0);
  text(countdown, width / 2 - 20, height / 2);
}

function startCountdown() {
  const countdownInterval = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function drawRoad(centerX) {
  fill(100); // Color de la carretera
  rect(0, height - roadWidth, width, roadWidth);

  const lineSpacing = 20; // Espacio entre las líneas en la carretera
  const lineHeight = 10; // Altura de las líneas en la carretera
  const numLines = width / lineSpacing;

  for (let i = 0; i < numLines; i++) {
    const x = i * lineSpacing;
    const y = height - roadWidth / 2 - lineHeight / 2;
    rect(x + centerX - width / 2, y, lineSpacing - 10, lineHeight);
  }
}

class Car {
  constructor() {
    // Inicialización del carro en el carril central
    this.lane = 2;
    this.laneWidth = roadWidth / 4;
    this.x = this.lane * this.laneWidth + this.laneWidth / 2;
    this.y = height - 100;
    this.width = 40;
    this.height = 70;
  }

  move() {
    // El carro se mueve automáticamente en función de las instrucciones desde el control en el celular.
  }

  hits(obstacle) {
    // Detectar colisiones con obstáculos
    const carLeft = this.x - this.width / 2;
    const carRight = this.x + this.width / 2;
    const carTop = this.y - this.height / 2;
    const carBottom = this.y + this.height / 2;

    const obstacleLeft = obstacle.x - obstacle.width / 2;
    const obstacleRight = obstacle.x + obstacle.width / 2;
    const obstacleTop = obstacle.y - obstacle.height / 2;
    const obstacleBottom = obstacle.y + obstacle.height / 2;

    // Verificación de colisión
    if (
      carLeft < obstacleRight &&
      carRight > obstacleLeft &&
      carTop < obstacleBottom &&
      carBottom > obstacleTop
    ) {
      // Colisión detectada
      if (obstacle.y < height) {
        return true;
      }
    }
    return false;
  }
}

// Función para dibujar el carro en el canvas
function drawCar(x, y, lane, laneWidth, carWidth, carHeight) {
  const laneX = lane * laneWidth + laneWidth / 2;
  image(carImage, laneX - carWidth / 2, y - carHeight / 2, carWidth, carHeight);
}

// Función para dibujar obstáculos en el canvas
function drawObstacle(x, y, width, height) {
  // Elige aleatoriamente una imagen de obstáculo del array
  const randomObstacleImage = random(obstacleImages);
  image(randomObstacleImage, x - width / 2, y - height / 2, width, height);
}

// Función para mostrar el mensaje de juego terminado
function gameOver() {
  background(255, 0, 0);
  textSize(48);
  fill(255);
  text('¡Juego Terminado!', width / 2 - 180, height / 2);
  noLoop();
}

class Obstacle {
  constructor(lane) {
    this.lane = lane;
    this.width = random(30, 60);
    this.height = this.width;
    this.x = this.lane * (roadWidth / 4) + roadWidth / 8;
    this.y = 0;

    // Elige aleatoriamente una imagen de obstáculo del array
    this.image = random(obstacleImages);
  }

  move() {
    this.y += speed;
  }
}