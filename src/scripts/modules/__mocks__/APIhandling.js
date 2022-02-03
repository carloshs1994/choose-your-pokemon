const getPokemons = async () => {
  const pokemons = [
    {
      id: 1,
      name: 'Something',
      sprites: {
        other: {
          dream_world: {
            front_default: '',
          },
        },
      },
    },
    {
      id: 2,
      name: 'Something2',
      sprites: {
        other: {
          dream_world: {
            front_default: '',
          },
        },
      },
    },
    {
      id: 3,
      name: 'Something3',
      sprites: {
        other: {
          dream_world: {
            front_default: '',
          },
        },
      },
    },
  ];
  return Promise.resolve(pokemons);
};

const getLikes = async () => Promise.resolve([{ item_id: 'pokemon-1', likes: 5 }]);

export { getPokemons, getLikes };