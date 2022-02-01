import { getPokemons } from './APIhandling.js';

const displayPokemons = async () => {
  const pokemons = await getPokemons();
  const main = document.querySelector('main');
  const cardsContainer = document.createElement('ul');
  cardsContainer.classList.add('cardsContainer');
  main.appendChild(cardsContainer);

  pokemons.forEach((pokemon) => {
    const card = document.createElement('li');
    card.classList.add('card');
    const { id, name } = pokemon;
    card.id = id;

    cardsContainer.appendChild(card);

    const image = new Image();
    image.src = pokemon.sprites.other.dream_world.front_default;
    card.appendChild(image);

    const title = document.createElement('h2');
    title.textContent = name;
    card.appendChild(title);

    const commentsButton = document.createElement('button');
    commentsButton.textContent = 'Comments';
    card.appendChild(commentsButton);
  });
};

export { displayPokemons };