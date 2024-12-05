document.getElementById('searchButton').addEventListener('click', fetchPokemon);

async function fetchPokemon() {
    const pokemonName = document.getElementById('pokemonInput').value.toLowerCase().trim();
    if (!pokemonName) {
        alert('Please enter a Pokémon name or ID.');
        return;
    }

    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('Pokémon not found');
        }
        const data = await response.json();
        displayPokemon(data);
    } catch (error) {
        alert(error.message);
    }
}

function displayPokemon(pokemon) {
    const pokemonDataDiv = document.getElementById('pokemonData');
    pokemonDataDiv.innerHTML = `
        <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}">
        <h2>${pokemon.name}</h2>
        <div class="types">
            <strong>Type(s):</strong> ${pokemon.types.map(typeInfo => `<span>${typeInfo.type.name}</span>`).join('')}
        </div>
        <div class="abilities">
            <strong>Abilities:</strong> ${pokemon.abilities.map(abilityInfo => `<span>${abilityInfo.ability.name}</span>`).join('')}
        </div>
        <div class="stats">
            <strong>Stats:</strong>
            ${pokemon.stats.map(statInfo => `<div>${statInfo.stat.name}: ${statInfo.base_stat}</div>`).join('')}
        </div>
    `;
}