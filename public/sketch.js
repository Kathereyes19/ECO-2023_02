let car;
let carImage; // Variable para la imagen del carro
let obstacles = [];
let score = 0;
let roadWidth = 100;
let gameStarted = false;
let speed = 3;
let obstaclesDodged = 0;
let countdown = 3; // Inicializa la cuenta regresiva en 3 segundos
let countdownInterval;

// Define la clase Obstacle antes de la función setup
class Obstacle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = random(30, 60); // Ancho aleatorio para el obstáculo
    this.height = random(30, 60); // Alto aleatorio para el obstáculo
    console.log('Obstacle created at', this.x, this.y);
  }
}

function getCar() {
  return car;
}

function preload() {
  carImage = loadImage('./img/carro.png'); // Reemplaza 'car.png' con el nombre de tu imagen de carro
}

function setup() {
  createCanvas(800, 600);
  car = new Car();
  startCountdown(); // Comienza la cuenta regresiva
}

function draw() {
  background(220);

  if (countdown > 0) {
    displayCountdown();
    return; // Muestra la cuenta regresiva y no continúa el juego
  }

  // Dibuja la pista
  drawRoad();

  // Genera obstáculos aleatorios
  if (frameCount % 60 === 0) {
    // Generar un obstáculo cada segundo
    let obstacle = new Obstacle(width / 2, 0); // Crea obstáculos en la parte superior de la pantalla
    obstacles.push(obstacle);
  }

  if (car) {
    car.move();
    drawCar(car.x, car.y, car.lane, car.laneWidth, car.width, car.height);

    // Colisión con obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
      drawObstacle(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

      if (car.hits(obstacles[i])) {
        // Implementa la lógica de colisión
        gameOver();
        obstacles.splice(i, 1);
      }
    }

    // Muestra la puntuación
    textSize(32);
    fill(0);
    text('Puntuación: ' + score, 20, 50);

    // Incrementa la puntuación con el tiempo
    score++;
  }

  // Función para dibujar la pista
  function drawRoad() {
    fill(100);
    rect(width / 2 - roadWidth / 2, 0, roadWidth, height); // Pista central

    // Líneas divisorias en la pista
    for (let i = 0; i < height; i += 40) {
      fill(255);
      rect(width / 2 - 5, i, 10, 30);
    }
  }
}

function displayCountdown() {
  textSize(72);
  fill(0);
  text(countdown, width / 2 - 20, height / 2);
}

function startCountdown() {
  countdownInterval = setInterval(() => {
    countdown--;
    if (countdown === 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

class Car {
  constructor() {
    // Propiedades del carro
    this.lane = 1; // Carril actual (inicia en el carril central)
    this.laneWidth = roadWidth / 3; // Ancho del carril
    this.y = height - 100; // Altura en la que se encuentra el carro
    this.width = 40; // Ancho del carro
    this.height = 60; // Alto del carro
    console.log('Car created at', this.lane, this.y);
  }

  moveToLane(lane) {
    // Cambia el carril del carro (0 para izquierda, 1 para centro, 2 para derecha)
    this.lane = constrain(lane, 0, 2);
  }

  move() {
    // Implementa la lógica de movimiento del carro
    if (keyIsDown(LEFT_ARROW) && this.lane > 0) {
      this.moveToLane(this.lane - 1); // Mueve el carro a la izquierda
    }

    if (keyIsDown(RIGHT_ARROW) && this.lane < 2) {
      this.moveToLane(this.lane + 1); // Mueve el carro a la derecha
    }
  }

  hits(obstacle) {
    // Implementa la lógica para detectar colisiones con obstáculos
    const carLeft = this.x - this.width / 2;
    const carRight = this.x + this.width / 2;
    const carTop = this.y - this.height / 2;
    const carBottom = this.y + this.height / 2;

    const obstacleLeft = obstacle.x - obstacle.width / 2;
    const obstacleRight = obstacle.x + obstacle.width / 2;
    const obstacleTop = obstacle.y - obstacle.height / 2;
    const obstacleBottom = obstacle.y + obstacle.height / 2;

    // Verifica si el carro se superpone con el obstáculo
    if (
      carLeft < obstacleRight &&
      carRight > obstacleLeft &&
      carTop < obstacleBottom &&
      carBottom > obstacleTop
    ) {
      return true; // Colisión detectada
    } else {
      return false; // No hay colisión
    }
  }
}

function drawCar(x, y, lane, laneWidth, carWidth, carHeight) {
  const laneX = lane * laneWidth + laneWidth / 2;

  // Dibuja la imagen del carro en lugar del rectángulo
  image(carImage, laneX - carWidth / 2, y - carHeight / 2, carWidth, carHeight);
}

function drawObstacle(x, y, width, height) {
  fill(0, 0, 255); // Color del obstáculo (azul en este ejemplo)
  rect(x - width / 2, y - height / 2, width, height);
}

// Función para manejar el final del juego
function gameOver() {
  background(255, 0, 0); // Fondo rojo para indicar el fin del juego
  textSize(48);
  fill(255);
  text('¡Juego Terminado!', width / 2 - 180, height / 2);
  noLoop(); // Detiene el bucle de dibujo, deteniendo el juego.
}
