const getPokemons = async (startingIndex, numberOfPokemons) => {
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
  return Promise.resolve(pokemons.slice(startingIndex, numberOfPokemons));
};

const getLikes = async () => Promise.resolve([{ item_id: 'pokemon-1', likes: 5 }]);

const addLike = async (itemID) => itemID;

export { getPokemons, getLikes, addLike };