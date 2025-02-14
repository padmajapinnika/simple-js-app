let pokemonRepository = (function () {
let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] }
];

   // Function to add a new Pokémon
   function add(item) {
    if (
        typeof item === "object" &&
        "name" in item &&
        "height" in item &&
        "types" in item
    ) {
        pokemonList.push(item);
    } else {
        console.error("Invalid Pokémon format");
    }
}
     // Function to get all Pokémon
     function getAll() {
        return pokemonList;
    }
    // Function to display a Pokémon
    function displayPokemon(pokemon) {
        document.write("<p>" + pokemon.name + " (height: " + pokemon.height + ") - Types: " + pokemon.types.join(", ") + "</p>");
    }

      // Returning the object with public methods
      return {
        getAll: getAll,
        add: add,
        displayPokemon: displayPokemon
    };
})();

//pokemonRepository.getAll().forEach(pokemonRepository.displayPokemon);
pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] }); // Adding Pikachu
pokemonRepository.add({ name: "oddish", height: 0.5, types: ["grass,poison"] });//adding oddish
pokemonRepository.getAll().forEach(pokemonRepository.displayPokemon); // Display updated list