import { getPokemons, getLikes, addLike } from './APIhandling.js';
import Heart from '../../assets/icons/heart.svg';
import itemsCounter from './util.js';

const numRegex = /\d+/;
// Display Home page
const displayPokemons = async () => {
  // Array of pokemons
  const pokemons = await getPokemons();
  const main = document.querySelector('main');
  const cardsContainer = document.createElement('ul');
  cardsContainer.classList.add('cardsContainer');
  main.appendChild(cardsContainer);

  pokemons.forEach((pokemon) => {
    const card = document.createElement('li');
    card.classList.add('card');
    const { id, name } = pokemon;
    card.id = `pokemon-${id}`;

    cardsContainer.appendChild(card);

    const image = new Image();
    image.src = pokemon.sprites.other.dream_world.front_default;
    image.classList.add('pokemon');
    card.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('info');
    const title = document.createElement('h2');
    title.textContent = name;
    info.appendChild(title);

    const buttonHeart = document.createElement('button');
    buttonHeart.classList.add('heart');
    const heart = new Image();
    heart.src = Heart;
    buttonHeart.appendChild(heart);
    info.appendChild(buttonHeart);

    card.appendChild(info);

    const likes = document.createElement('p');
    likes.classList.add('likes');
    likes.textContent = '0 Likes';

    buttonHeart.addEventListener('click', async () => {
      await addLike(`pokemon-${id}`);
      const numberOflikes = likes.textContent.match(numRegex)[0];
      likes.textContent = `${+numberOflikes + 1} Likes`;
    }, { once: true });

    card.appendChild(likes);

    const commentsButton = document.createElement('button');
    commentsButton.className = 'comments';
    commentsButton.id = id;
    commentsButton.textContent = 'Comments';
    card.appendChild(commentsButton);
  });
};

const displayLikes = async () => {
  const likes = await getLikes();
  likes.forEach((likeCount) => {
    const card = document.querySelector(`#${likeCount.item_id}`);
    const likesElement = card.querySelector('.likes');
    likesElement.textContent = `${likeCount.likes} Likes`;
  });
};

const displayCounters = () => {
  const tags = document.querySelectorAll('a');
  tags.forEach((tag) => {
    if (tag.textContent.trim() === 'Pokemons') {
      tag.textContent = ` Pokemons (${itemsCounter()})`;
    }
  });
};

export { displayPokemons, displayLikes, displayCounters };