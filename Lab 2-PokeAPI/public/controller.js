let canvas;

function setupCanvas() {
    frameRate(60);
    canvas = createCanvas(windowWidth, windowHeight);
    canvas.style('z-index', '-1');
    canvas.style('position', 'fixed');
    canvas.style('top', '0');
    canvas.style('right', '0');
}

function drawCanvas() {
    background(50, 50);
    createCustomCursor();
}

function resizeCanvasWindow() {
    resizeCanvas(windowWidth, windowHeight);
}

function createCustomCursor() {
    noStroke();
    fill(255, 0, 0);
    ellipse(pmouseX, pmouseY, 10, 10);
}


let pokemon_id;

async function fetchData(pokemon_id) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon_id}`);
    const data = await response.json();
    console.log(data);
    renderData(data);
}

document.getElementById("Balbasaur").addEventListener('click', function() {
    pokemon_id = 1;
    fetchData(pokemon_id);
});

document.getElementById("Charmander").addEventListener('click', function() {
    pokemon_id = 4;
    fetchData(pokemon_id);
});

document.getElementById("Squirtle").addEventListener('click', function() {
    pokemon_id = 7;
    fetchData(pokemon_id);
});


function renderData(data) {
    document.getElementById('PokemonResultsContainer').innerHTML = ``;
    const pokeDataContainer = document.createElement('div');
    pokeDataContainer.innerHTML = `
        <img alt="No gif found" src="${data.sprites.versions["generation-v"]["black-white"].animated.front_default}">
        <div id="PokemonData">
            <p class="SmallText">No° ${data.id}</p>
            <h3>${data.name}</h3>
            <p id="Type">${data.types[0].type.name}</p>
            <div id="BasicInfo">
                <div>
                    <h4>Height</h4>
                    <p>${data.height}0 cm</p>
                </div>
                <div>
                    <h4>Weight</h4>
                    <p>${data.weight}00 g</p>
                </div>
                <div>
                    <h4>Base Exp</h4>
                    <p>${data.base_experience}</p>
                </div>
            </div>
            <div>
                <button onclick="devolvePokemon()" id="Devolve">Devolve</button>
                <button onclick="evolvePokemon()" id="Evolve">Evolve</button>
            </div>
        </div>
    `;
    document.getElementById('PokemonResultsContainer').appendChild(pokeDataContainer);

    changeColor(data);
}


function changeColor(data) {
    const type = data.types[0].type.name;
    const typeElement = document.getElementById("Type");

    if (type === "grass") {
        typeElement.className = "Grass";
    } else if (type === "fire") {
        typeElement.className = "Fire";
    } else if (type === "water") {
        typeElement.className = "Water";
    } 
}


function evolvePokemon() {
    if (pokemon_id >= 1 && pokemon_id <= 8 || pokemon_id === 25) {
        fetchData(++pokemon_id);
    } else if (pokemon_id === 172) {
        fetchData(25);
    }
}

function devolvePokemon() {
    if (pokemon_id >= 2 && pokemon_id <= 9 || pokemon_id === 26) {
        fetchData(--pokemon_id);
    } else if (pokemon_id === 25) {
        fetchData(172);
    }
}
