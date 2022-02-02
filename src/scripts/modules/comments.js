const getPokemonComments = async (pokemonId) => {
  const getInfo = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/comments?item_id=${pokemonId}`);
  const json = await getInfo.json();
  return json;
};

const addPokemonComments = async (pokemonId, username, comment) => {
  const sendInfo = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: pokemonId,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const json = await sendInfo.json();
  return json;
};

const commentCounter = (length) => {
  if (length === undefined || length === null) return 0;
  return length;
};

export {
  getPokemonComments,
  commentCounter,
  addPokemonComments,
};