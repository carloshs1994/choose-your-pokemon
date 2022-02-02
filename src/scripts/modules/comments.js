const getPokemonComments = async (pokemonId) => {
  const getInfo = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/comments?item_id=${pokemonId}`);
  const json = await getInfo.json();
  return json;
};

const commentCounter = (length) => {
  if (length === undefined || length === null) return 0;
  return length;
};

export {
  getPokemonComments,
  commentCounter,
};