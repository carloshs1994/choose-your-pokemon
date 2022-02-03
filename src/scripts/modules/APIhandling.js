const getPokemons = async (startingIndex, numberOfPokemons) => {
  let pokemons = [];
  const finalIndex = (startingIndex + numberOfPokemons) >= 500 ? 500
    : startingIndex + numberOfPokemons;
  for (let i = startingIndex + 1; i <= finalIndex; i += 1) {
    const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((response) => response.json());
    pokemons.push(pokemon);
  }
  pokemons = await Promise.all(pokemons);
  return pokemons;
};

const getLikes = async () => {
  let likes;
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/likes';
  try {
    likes = await fetch(url).then((response) => response.json());
  } catch (error) {
    likes = [];
  }
  return likes;
};

const addLike = async (itemID) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/likes';
  const item = {
    item_id: itemID,
  };
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.text());
};

export { getPokemons, getLikes, addLike };
