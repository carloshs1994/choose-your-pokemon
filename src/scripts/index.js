// Include your code here
import './styles/main.scss';
import {
  displayPokemons,
  displayLikes,
  displayCounters,
  addMenu,
  displaySeeMoreButton,
  addAboutSection,
  displaySpinner,
} from './modules/generators.js';
import displayPopup from './modules/popup.js';

displaySpinner();
addMenu();

window.onload = async () => {
  await displayPokemons(20);
  await displayLikes();
  displaySeeMoreButton();
  displayPopup();
  displayCounters();
};

const nav = document.querySelector('.nav-child');
const main = document.querySelector('main');
const linkTags = nav.querySelectorAll('a');

linkTags.forEach((tag) => {
  const reGex = /#[\w-]+/g;
  tag.addEventListener('click', async (event) => {
    const pageId = event.target.href.match(reGex)[0];
    main.innerHTML = '';
    if (pageId === '#pokemons') {
      main.innerHTML = '<h1> Pick your Favorite Pokemon! </h1>';
      displaySpinner();
      await displayPokemons(20);
      await displayLikes();
      displaySeeMoreButton();
      displayPopup();
      displayCounters();
    } else if (pageId === '#about') {
      addAboutSection();
    }
    const navChild = document.querySelector('.nav-child');
    navChild.setAttribute('data-active', 'false');
  });
});
