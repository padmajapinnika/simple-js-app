let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
//function to show loading message//
    function showLoadingMessage() {
        let loadingMessage = document.createElement("p");
        loadingMessage.innerText = "Loading...";
        loadingMessage.classList.add("loading-message");
        document.body.appendChild(loadingMessage);
    }
 //Function to hide the loading message//
    function hideLoadingMessage() {
        let loadingMessage = document.querySelector(".loading-message");
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }
// Function to add a Pokémon to the repository//
    function add(pokemon) {
        if (
          typeof pokemon === "object" &&
          "name" in pokemon
        ) {
          pokemonList.push(pokemon);
        } else {
          console.log("pokemon is not correct");
        }
      }
//Function to return all Pokémon from the repository//
      function getAll() {
        return pokemonList;
      }
//Function to add a Pokémon button to the list//
      function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listpokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listpokemon.appendChild(button);
        pokemonList.appendChild(listpokemon);
//Add an event listener to show details when button is clicked//        
        button.addEventListener("click", function(event) {
          showDetails(pokemon);
        });
      }
//Function to load Pokémon list from API//
      function loadList() {
        showLoadingMessage();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
          json.results.forEach(function (item) {
            hideLoadingMessage();
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
            console.log(pokemon);
          });
        }).catch(function (e) {
            hideLoadingMessage();
          console.error(e);
        })
      }
//Function to load details of a selected Pokémon//
      function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
          return response.json();
        }).then(function (details) {
            hideLoadingMessage();
//add the details to the item//
          item.imageUrl = details.sprites.front_default;
          item.height = details.height;
          item.types = details.types;
        }).catch(function (e) {
            hideLoadingMessage();
          console.error(e);
        });
      }
//Function to display Pokémon details//      
      function showDetails(item) {
        pokemonRepository.loadDetails(item).then(function () {
          console.log(item);
        });
      }
//Return public methods//    
      return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
      };
})();
//Load Pokémon list and display them as buttons//
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
      pokemonRepository.addListItem(pokemon);
    });
  });