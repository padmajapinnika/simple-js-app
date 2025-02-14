let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] }
];

// Function to log each Pokémon's details
function displayPokemon(pokemon) {
    document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ") - Types: " + pokemon.types.join(", ") + "</p>");
}

// Using forEach to iterate over the array
pokemonList.forEach(displayPokemon);

