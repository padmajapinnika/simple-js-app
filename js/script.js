//--pokemon repository IIFE--
let pokemonRepository = (function () {
let pokemonList = [
    { name: "Bulbasaur", height: 0.7, types: ["grass", "poison"] },
    { name: "Nidoking", height: 1.4, types: ["ground", "poison"] },
    { name: "Charmander", height: 0.6, types: ["fire"] }
];
//--function to add pokemon--
   
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
//function to add pokemon to the list--
function addListItem(pokemon){
    let pokemonList=document.querySelector(".pokemon-list")
    let listpokemon=document.createElement("li");
    let button=document.createElement("button");
    button.innerText=pokemon.name;
    button.classList.add("button-class");
    listpokemon.appendChild(button);
    pokemonList.appendChild(listpokemon);
    button.addEventListener('click',function(){
        showDetails(pokemon);
    })
}
//--function to display pokemon details
function showDetails(pokemon) {
    console.log(pokemon);
}


     // Function to get all Pokémon
     function getAll() {
        return pokemonList;
    }


      // Returning the object with public methods
      return {
        getAll: getAll,
        add: add,
        addListItem
    };
})();

//--add new pokemon
pokemonRepository.add({ name: "Pikachu", height: 0.4, types: ["electric"] }); // Adding Pikachu
pokemonRepository.add({ name: "oddish", height: 0.5, types: ["grass,poison"] });//adding oddish

//--display pokemon as button--
pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
}); 

