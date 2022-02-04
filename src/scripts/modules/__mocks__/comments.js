const getPokemonComments = async (pokemonId) => {
  const json = [pokemonId];
  return Promise.resolve(json);
};

const addPokemonComments = async (pokemonId, username, comment) => (Promise
  .resolve([pokemonId, username, comment]));

export {
  getPokemonComments,
  addPokemonComments,
};