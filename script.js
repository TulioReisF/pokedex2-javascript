//Funcão buscar o Pokémon
const pokemonNome = document.querySelector(".pokemon_name");
const pokemonNumero = document.querySelector(".pokemon_number");
const pokemonImagem = document.querySelector(".pokemon_img");
const form = document.querySelector(".form");
const inputValor = document.querySelector(".input_search");
const prev = document.querySelector(".btn_prev");
const next = document.querySelector(".btn_next");

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
  const APIResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${pokemon}`
  );

  if (APIResponse.status == 200) {
    const data = await APIResponse.json();
    return data;
  }
};

const renderPokemon = async (pokemon) => {
  pokemonNome.innerHTML = "Carregando....";
  pokemonNumero.innerHTML = "";

  const data = await fetchPokemon(pokemon);

  if (data) {
    pokemonImagem.style.display = "block";
    pokemonNome.innerHTML = data.name;
    pokemonNumero.innerHTML = data.id;
    pokemonImagem.src =
      data["sprites"]["versions"]["generation-v"]["black-white"]["animated"][
        "front_default"
      ];
    inputValor.value = "";
    searchPokemon = data.id;
  } else {
    pokemonImagem.style.display = "none";
    pokemonNome.innerHTML = "Não Encontrado";
    pokemonNumero.innerHTML = "";
  }
};

form.addEventListener("submit", (event) => {
  event.preventDefault();
  renderPokemon(inputValor.value.toLowerCase());
});

prev.addEventListener("click", () => {
  if (searchPokemon > 1) {
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
  }
});

next.addEventListener("click", () => {
  searchPokemon += 1;
  renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
