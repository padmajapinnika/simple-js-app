let pokemonRepository = (function () {
  let pokemonList = [];

  function getAll() {
    return pokemonList;
  }

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  // Fetch detailed data (image, height, weight, types) for a single Pokémon
  function loadDetails(pokemon) {
    return fetch(pokemon.detailsUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        pokemon.imageUrl = details.sprites.front_default;
        pokemon.height = details.height;
        pokemon.weight = details.weight;
        pokemon.types = details.types.map(type => type.type.name);
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // Show details in Bootstrap modal
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalTitle = document.querySelector("#pokemonModalLabel");
      let imageElement = document.querySelector("#pokemon-image");
      let heightElement = document.querySelector("#pokemon-height");
      let weightElement = document.querySelector("#pokemon-weight");
      let typesElement = document.querySelector("#pokemon-types");

      if (modalTitle && imageElement && heightElement && weightElement && typesElement) {
        modalTitle.innerText = pokemon.name;
        imageElement.src = pokemon.imageUrl;
        heightElement.innerText = `Height: ${pokemon.height} ft`;
        weightElement.innerText = `Weight: ${pokemon.weight} lbs`;
        typesElement.innerText = `Type(s): ${pokemon.types.join(", ")}`;
      } else {
        console.error("Modal elements not found.");
      }

      // Remove focus from the button to avoid accessibility issues
      document.activeElement?.blur();

      // Show modal
      $("#pokemonModal").modal("show");
    });
  }

  // Load the list of first 150 Pokémon
  function loadList() {
    return fetch("https://pokeapi.co/api/v2/pokemon/?limit=150")
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          add({
            name: item.name,
            detailsUrl: item.url
          });
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }

  // Add a Pokémon to the DOM list
  function addListItem(pokemon) {
    let pokemonListElement = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    listItem.classList.add("list-group-item");

    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn", "btn-primary", "w-100");

    // Event listener for modal trigger
    button.addEventListener("click", function () {
      showDetails(pokemon);
    });

    listItem.appendChild(button);
    pokemonListElement.appendChild(listItem);
  }

  return {
    add: add,
    getAll: getAll,
    loadList: loadList,
    loadDetails: loadDetails,
    addListItem: addListItem,
    showDetails: showDetails
  };
})();

// Load Pokémon list and display each item on the page
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
