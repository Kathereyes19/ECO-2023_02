let car;
let carImage; // Variable para la imagen del carro
let obstacles = [];
let score = 0;
let roadWidth = 200; // Ancho de la carretera, dividido por 4 carriles
let gameStarted = false;
let speed = 3;
let obstaclesDodged = 0;
let countdown = 3; // Inicializa la cuenta regresiva en 3 segundos
let countdownInterval;
let gameEnded = false; // Nuevo flag para controlar si el juego ha terminado

// Define la clase Obstacle antes de la función setup
class Obstacle {
  constructor(lane) {
    this.lane = lane; // Carril en el que aparece el obstáculo
    this.width = random(30, 60); // Ancho aleatorio para el obstáculo
    this.height = random(30, 60); // Alto aleatorio para el obstáculo
    this.x = this.lane * (roadWidth / 4) + roadWidth / 8; // Calcula la posición x del obstáculo en el carril
    this.y = 0; // Comienza en la parte superior de la pantalla
  }

  move() {
    this.y += speed; // Hace que el obstáculo se mueva hacia abajo
  }
}

function getCar() {
  return car;
}

function preload() {
  carImage = loadImage('./img/carro.png'); // Reemplaza 'car.png' con el nombre de tu imagen de carro
  obstacleImage = loadImage('./img/logo.png');
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

  if (!gameEnded) {
    // Genera obstáculos aleatorios
    if (frameCount % 60 === 0) {
      // Generar un obstáculo cada segundo
      let lane = Math.floor(random(0, 4)); // Elije un carril aleatorio (0, 1, 2 o 3)
      let obstacle = new Obstacle(lane); // Crea obstáculos en la parte superior de la pantalla
      obstacles.push(obstacle);
    }
  }

  if (car) {
    car.move();
    drawCar(car.x, car.y, car.lane, car.laneWidth, car.width, car.height);

    // Colisión con obstáculos
    for (let i = obstacles.length - 1; i >= 0; i--) {
      drawObstacle(obstacles[i].x, obstacles[i].y, obstacles[i].width, obstacles[i].height);

      if (!gameEnded && car.hits(obstacles[i])) {
        // Implementa la lógica de colisión
        gameEnded = true;
        gameOver();
      }
    }

    // Muestra la puntuación
    textSize(32);
    fill(0);
    text('Puntuación: ' + score, 20, 50);

    // Incrementa la puntuación con el tiempo
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

  // Función para dibujar la pista
  function drawRoad() {
    for (let i = 0; i < 4; i++) {
      fill(100);
      rect(i * roadWidth, 0, roadWidth, height); // Dibuja cuatro carriles
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
    this.lane = 2; // Carril actual (inicia en el carril central)
    this.laneWidth = roadWidth / 4; // Ancho del carril

    // Calcula la posición x basada en el carril
    this.x = this.lane * this.laneWidth + this.laneWidth / 2; // Posiciona el carro en el carril central
    this.y = height - 100; // Altura en la que se encuentra el carro
    this.width = 60; // Ancho del carro (un poco más grande)
    this.height = 90; // Alto del carro (un poco más grande)
    console.log('Car created at', this.lane, this.x, this.y);
  }

  moveToLane(lane) {
    // Cambia el carril del carro (0 para izquierda, 1 para centro, 2 para derecha, 3 para el cuarto carril)
    this.lane = constrain(lane, 0, 3);
  }

  move() {
    // Implementa la lógica de movimiento del carro
    if (keyIsDown(LEFT_ARROW) && this.lane > 0) {
      this.moveToLane(this.lane - 1); // Mueve el carro a la izquierda
    }

    if (keyIsDown(RIGHT_ARROW) && this.lane < 3) {
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
      // Colisión detectada, pero si el obstáculo está en la parte inferior del canvas, no termina el juego
      if (obstacle.y < height) {
        return true; // Colisión válida
      }
    }
    return false; // No hay colisión
  }
}

function drawCar(x, y, lane, laneWidth, carWidth, carHeight) {
  const laneX = lane * laneWidth + laneWidth / 2;

  // Dibuja la imagen del carro en lugar del rectángulo
  image(carImage, laneX - carWidth / 2, y - carHeight / 2, carWidth, carHeight);
}

function drawObstacle(x, y, width, height) {
  // En lugar de dibujar un rectángulo azul, muestra la imagen del obstáculo
  image(obstacleImage, x - width / 2, y - height / 2, width, height);
}

// Función para manejar el final del juego
function gameOver() {
  background(255, 0, 0); // Fondo rojo para indicar el fin del juego
  textSize(48);
  fill(255);
  text('¡Juego Terminado!', width / 2 - 180, height / 2);
  noLoop(); // Detiene el bucle de dibujo, deteniendo el juego.
}
