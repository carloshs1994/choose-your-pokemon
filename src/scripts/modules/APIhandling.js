const getPokemons = async () => {
  let pokemons = [];
  for (let i = 1; i <= 20; i += 1) {
    const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((response) => response.json());
    pokemons.push(pokemon);
  }
  pokemons = await Promise.all(pokemons);
  return pokemons;
};

export { getPokemons };