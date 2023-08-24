const characterList = document.getElementById("characterList");
const randomButton = document.getElementById("randomButton");

randomButton.addEventListener("click", getRandomCharacters);

async function getRandomCharacters() {
  characterList.innerHTML = ""; // Limpiar lista de personajes

  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const data = await response.json();

    const characters = data.results;
    const randomCharacters = getRandomSubset(characters, 5);

    randomCharacters.forEach(character => {
      const characterDiv = createCharacterCard(character);
      characterList.appendChild(characterDiv);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function getRandomSubset(arr, count) {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled.slice(0, count);
}

function createCharacterCard(character) {
  const characterDiv = document.createElement("div");
  characterDiv.classList.add("characterCard");
  characterDiv.innerHTML = `
    <img src="${character.image}" alt="${character.name}">
    <h2>${character.name}</h2>
    <p>Status: ${character.status}</p>
    <p>Species: ${character.species}</p>
    <p>Gender: ${character.gender}</p>
  `;
  return characterDiv;
}
