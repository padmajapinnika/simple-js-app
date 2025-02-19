let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    /* Function to show loading message */
    function showLoadingMessage() {
        let loadingMessage = document.createElement("p");
        loadingMessage.innerText = "Loading...";
        loadingMessage.classList.add("loading-message");
        document.body.appendChild(loadingMessage);
    }

    /* Function to hide the loading message */
    function hideLoadingMessage() {
        let loadingMessage = document.querySelector(".loading-message");
        if (loadingMessage) {
            loadingMessage.remove();
        }
    }

    /* Function to add a Pokémon to the repository */
    function add(pokemon) {
        if (typeof pokemon === "object" && "name" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("pokemon is not correct");
        }
    }

    /* Function to return all Pokémon from the repository */
    function getAll() {
        return pokemonList;
    }

    /* Function to add a Pokémon button to the list */
    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listPokemon = document.createElement("li");
        let button = document.createElement("button");
        button.innerText = pokemon.name;
        button.classList.add("button-class");
        listPokemon.appendChild(button);
        pokemonList.appendChild(listPokemon);

        /* Add an event listener to show details when button is clicked */
        button.addEventListener("click", function () {
            showDetails(pokemon);
        });
    }

    /* Function to load Pokémon list from API */
    function loadList() {
        showLoadingMessage();
        return fetch(apiUrl)
            .then(function (response) {
                return response.json();
            })
            .then(function (json) {
                hideLoadingMessage();
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    /* Function to load details of a selected Pokémon */
    function loadDetails(item) {
        showLoadingMessage();
        let url = item.detailsUrl;
        return fetch(url)
            .then(function (response) {
                return response.json();
            })
            .then(function (details) {
                hideLoadingMessage();
                /* Add the details to the item */
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types.map(typeObj => typeObj.type.name);;
            })
            .catch(function (e) {
                hideLoadingMessage();
                console.error(e);
            });
    }

    /* Function to display Pokémon details */
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function () {
            showModal(pokemon);
        });
    }

    /* Function to create and display a modal */
    function showModal(pokemon) {
        let modalContainer = document.querySelector("#modal-container");
        modalContainer.innerHTML = "";

        let modal = document.createElement("div");
        modal.classList.add("modal");

        /* Create close button */
        let closeButton = document.createElement("button");
        closeButton.innerText = "Close";
        closeButton.classList.add("modal-close");
        closeButton.addEventListener("click", hideModal);

        /* Create Pokémon name element */
        let title = document.createElement("h2");
        title.innerText = pokemon.name;

        /* Create Pokémon height element */
        let height = document.createElement("p");
        height.innerText = `Height: ${pokemon.height}`;

        /* Create Pokémon image element */
        let image = document.createElement("img");
        image.src = pokemon.imageUrl;
        image.classList.add("pokemon-image");

        /* Create Pokémon type element */
        let types = document.createElement("p");
        types.innerText = `Type: ${pokemon.types.join(',')}`;

        /* Append elements to modal */
        modal.appendChild(closeButton);
        modal.appendChild(title);
        modal.appendChild(height);
        modal.appendChild(types);
        modal.appendChild(image);
        modalContainer.appendChild(modal);

        /* Show modal */
        modalContainer.classList.add("is-visible");

        /* Close modal when clicking outside */
        modalContainer.addEventListener("click", (event) => {
            if (event.target === modalContainer) {
                hideModal();
            }
        });

        /* Close modal on Escape key press */
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modalContainer.classList.contains("is-visible")) {
                hideModal();
            }
        });
    }

    /* Function to hide modal */
    function hideModal() {
        let modalContainer = document.querySelector("#modal-container");
        modalContainer.classList.remove("is-visible");
    }

    /* Return public methods */
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

/* Load Pokémon list and display them as buttons */
pokemonRepository.loadList().then(function () {
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
