const getPokemonComments = async (pokemonId) => {
  const json = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/comments?item_id=${pokemonId}`)
    .then((response) => response.json());
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
  const json = await sendInfo.text();
  return json;
};

const commentCounter = (json) => {
  if (json.length === undefined || json.length === null) return 0;
  return json.length;
};

export {
  getPokemonComments,
  commentCounter,
  addPokemonComments,
};