const getPokemons = async () => {
  let pokemons = [];
  for (let i = 1; i <= 20; i += 1) {
    const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((response) => response.json());
    pokemons.push(pokemon);
  }
  pokemons = await Promise.all(pokemons);
  return pokemons;
};

const getLikes = async () => {
  let likes;
  try {
    likes = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/likes').then((response) => response.json());
  } catch (error) {
    likes = [];
  }
  return likes;
};

export { getPokemons, getLikes };
