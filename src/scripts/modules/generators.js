import { getPokemons, getLikes, addLike } from './APIhandling.js';
import itemsCounter from './util.js';
import Menu from '../../assets/icons/hamburger.svg';
import Close from '../../assets/icons/close.svg';
import displayPopup from './popup.js';
import PokeLogo from '../../assets/icons/pokeLogo.svg';
import SadPokemon from '../../assets/images/sadPokemon.jpg';

const numRegex = /\d+/;
// Display Home page
const displaySpinner = () => {
  const main = document.querySelector('main');
  const pokeLogo = new Image();
  pokeLogo.src = PokeLogo;
  pokeLogo.classList.add('spinner');
  main.appendChild(pokeLogo);
};

const displayPokemons = async (numberOfPokemons) => {
  // Array of pokemons
  const startingIndex = itemsCounter();
  const pokemons = await getPokemons(startingIndex, numberOfPokemons);
  const main = document.querySelector('main');

  // Delete Spinner
  const spinner = main.querySelector('.spinner');
  if (spinner) {
    main.removeChild(spinner);
  }

  let cardsContainer;

  if (document.querySelector('.cardsContainer')) {
    cardsContainer = document.querySelector('.cardsContainer');
  } else {
    cardsContainer = document.createElement('ul');
    cardsContainer.classList.add('cardsContainer');
    cardsContainer.id = 'pokemons';
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

  const pokeLogo = new Image();
  const logo = document.querySelector('#logo');
  pokeLogo.src = PokeLogo;
  pokeLogo.alt = '';
  logo.appendChild(pokeLogo);
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

const generateDescription = (text, parent) => {
  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = text;
  parent.appendChild(description);
  return description;
};

// Display About Page
const addAboutSection = () => {
  const main = document.querySelector('main');
  const aboutSection = document.createElement('section');
  aboutSection.classList.add('about');
  main.appendChild(aboutSection);

  const h1 = document.createElement('h1');
  h1.textContent = '"Choose your Pokemon" initiative';
  aboutSection.appendChild(h1);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('sadPokemon');
  const sadPokemon = new Image();
  sadPokemon.src = SadPokemon;
  sadPokemon.alt = 'Three pokemon crying';
  imgContainer.appendChild(sadPokemon);
  aboutSection.appendChild(imgContainer);

  const h2 = document.createElement('h2');
  h2.textContent = 'What are we?';
  aboutSection.appendChild(h2);

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('description-container');
  aboutSection.appendChild(descriptionContainer);

  generateDescription(
    `Nowadays internet has become the most useful tool around the world. 
  It has allowed people to connect in extensive manners. Following the trends 
  Pokemon species started to be interested in the web world and have tried, 
  without success, to get attention from the outside world. Why? Because not being human 
  forbids them to create an Instagram account to publish photos. This is a crime. 
  You can see how sad they are above. 
  `, descriptionContainer,
  );

  generateDescription(
    `"Choose your Pokemon" is a movement that aims to give Pokemon the love they 
    deserve. It holds a list of up to 500 Pokemons waiting to receive likes and lovely comments. 
    Go. Don't hesitate. Go and change their faces to smiley Pokemons.`, descriptionContainer,
  );

  generateDescription(
    `If you want to support this movement, it's not like you should donate 100 BTC or anything. 
    They would love it though.`, descriptionContainer,
  );

  const note = generateDescription('', descriptionContainer);
  note.innerHTML = `
    Note: This is just an exercise meant to learn API fetching, Testing, and JavaScript in general. 
    No donations or something like that (We include this just in case). Recognition is important so 
    definitely go and check <a href="https://pokeapi.co/" target="_blank"> PokéAPI </a> if you're interested in fetching this and 
    even more data about Pokemon. They've done an incredible job.
  `;
  note.classList.add('note');

  const pikachu = document.createElement('div');
  pikachu.innerHTML = `
  <div style="width:100%;height:0;padding-bottom:75%;position:relative;">
  <iframe src="https://giphy.com/embed/xuXzcHMkuwvf2" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
  </div>
  `;
  descriptionContainer.appendChild(pikachu);
};

export {
  displayPokemons,
  displayLikes,
  displayCounters,
  addMenu,
  displaySeeMoreButton,
  addAboutSection,
  displaySpinner,
};