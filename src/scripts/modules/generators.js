import { getPokemons, getLikes, addLike } from './APIhandling.js';
import itemsCounter from './util.js';
import Menu from '../../assets/icons/hamburger.svg';
import Close from '../../assets/icons/close.svg';
import displayPopup from './popup.js';

const numRegex = /\d+/;
// Display Home page
const displayPokemons = async (numberOfPokemons) => {
  // Array of pokemons
  const startingIndex = itemsCounter();
  const pokemons = await getPokemons(startingIndex, numberOfPokemons);
  const main = document.querySelector('main');
  let cardsContainer;

  if (document.querySelector('.cardsContainer')) {
    cardsContainer = document.querySelector('.cardsContainer');
  } else {
    cardsContainer = document.createElement('ul');
    cardsContainer.classList.add('cardsContainer');
    main.appendChild(cardsContainer);
  }

  pokemons.forEach((pokemon) => {
    const card = document.createElement('li');
    card.classList.add('card');
    const { id, name } = pokemon;
    card.id = `pokemon-${id}`;

    cardsContainer.appendChild(card);

    const image = new Image();
    image.src = pokemon.sprites.other.dream_world.front_default;
    image.alt = name;
    image.classList.add('pokemon');
    card.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('info');
    const title = document.createElement('h2');
    title.textContent = name;
    info.appendChild(title);

    const buttonHeart = document.createElement('button');
    buttonHeart.classList.add('heart');
    const heart = document.createElement('div');
    heart.classList.add('heart-shape');
    buttonHeart.appendChild(heart);
    info.appendChild(buttonHeart);

    card.appendChild(info);

    const likes = document.createElement('p');
    likes.classList.add('likes');
    likes.textContent = '0 Likes';

    buttonHeart.addEventListener('click', async () => {
      heart.classList.add('heart-shape-active');
      const numberOflikes = likes.textContent.match(numRegex)[0];
      likes.textContent = `${+numberOflikes + 1} Likes`;
      await addLike(`pokemon-${id}`);
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
    if (card) {
      const likesElement = card.querySelector('.likes');
      likesElement.textContent = `${likeCount.likes} Likes`;
    }
  });
};

const displayCounters = () => {
  const pokemonTag = document.querySelector('#pokemonTag');
  pokemonTag.textContent = ` Pokemons (${itemsCounter()})`;
};

const addMenu = () => {
  const menu = document.querySelector('.menu');
  const menuImage = new Image();
  menuImage.src = Menu;
  menuImage.alt = 'Menu Button';

  menu.appendChild(menuImage);

  const close = document.querySelector('.close');
  const closeImage = new Image();
  closeImage.src = Close;
  closeImage.alt = 'Close Button';

  close.appendChild(closeImage);

  const navChild = document.querySelector('.nav-child');
  menu.addEventListener('click', () => {
    navChild.setAttribute('data-active', 'true');
  });
  close.addEventListener('click', () => {
    navChild.setAttribute('data-active', 'false');
  });
};

const displaySeeMoreButton = () => {
  const main = document.querySelector('main');
  const seeMore = document.createElement('button');
  seeMore.classList.add('see-more');
  seeMore.setAttribute('type', 'button');
  seeMore.textContent = 'Display More Pokemons!';
  main.appendChild(seeMore);

  seeMore.addEventListener('click', async () => {
    await displayPokemons(10);
    await displayLikes();
    displayPopup();
    displayCounters();
  });
};

export {
  displayPokemons,
  displayLikes,
  displayCounters,
  addMenu,
  displaySeeMoreButton,
};