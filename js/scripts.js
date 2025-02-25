
let pokemonRepository = (function () {
    // Private variables
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // Function to return all Pokémon from the repository
    function getAll() {
        return pokemonList;
    }

    // Function to add a Pokémon to the repository
    function add(pokemon) {
        pokemonList.push(pokemon);
    }

    // Function to load Pokémon list from the API
    function loadList() {
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();  // Parse the response as JSON
            })
            .then(function (json) {
                // Loop through each Pokémon in the results
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url  // Save the URL for detailed information
                    };
                    add(pokemon);  // Add each Pokémon to the list
                });
            })
            .catch(function (e) {
                console.error(e);  // Log any errors to the console
            });
    }

    // Function to load details of a selected Pokémon
    function loadDetails(pokemon) {
        let url = pokemon.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();  // Parse the response as JSON
            })
            .then(function (details) {
                // Add the details to the Pokémon object
                pokemon.imageUrl = details.sprites.front_default;
                pokemon.height = details.height;
                pokemon.weight = details.weight;
                pokemon.types = details.types.map(typeObj => typeObj.type.name);  // Map out the Pokémon types
            })
            .catch(function (e) {
                console.error(e);  // Log any errors to the console
            });
    }

    // Function to display Pokémon details in a modal
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            let modalTitle = document.querySelector('#pokemonModalLabel');
            let modalImage = document.querySelector('#pokemon-image');
            let modalHeight = document.querySelector('#pokemon-height');
            let modalWeight = document.querySelector('#pokemon-weight');
            let modalTypes = document.querySelector('#pokemon-types');

            // Update the modal with the Pokémon's details
            if (modalTitle && modalImage && modalHeight && modalWeight && modalTypes) {
            modalTitle.innerText = pokemon.name;
            //modalImage.src = pokemon.imageURL;
            modalImage.src = pokemon.imageUrl;
            modalHeight.innerText = `Height: ${pokemon.height} ft`;
            modalWeight.innerText = `Weight: ${pokemon.weight} lbs`;
            modalTypes.innerText = `Type(s): ${pokemon.types.join(', ')}`;

           
        } else {
            console.error('Modal elements not found.');
        }
        // Remove focus before showing modal
        document.activeElement?.blur(); 
        });
         // Show the modal
         $('#pokemonModal').modal('show');
    }
    

    // Function to add a Pokémon button to the list
    function addListItem(pokemon) {
        let pokemonListElement = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");  // Create the list item
        listItem.classList.add("list-group-item");  // Add Bootstrap class for list item

        let button = document.createElement("button");  // Create the button
        button.innerText = pokemon.name;  // Set the button's text to the Pokémon's name
        button.classList.add("btn", "btn-primary", "w-100");  // Add Bootstrap classes for styling

       

        // Add an event listener to show details when button is clicked
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });

        // Append the button to the list item and the list item to the list
        listItem.appendChild(button);
        pokemonListElement.appendChild(listItem);
    }

    // Return public methods to be accessed outside the repository
    return {
        add: add,
        getAll: getAll,
        loadList: loadList,
        loadDetails: loadDetails,
        addListItem: addListItem,
        showDetails: showDetails
    };
})();

// Load Pokémon list and display them as buttons
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);  // Add each Pokémon as a button
    });
});
