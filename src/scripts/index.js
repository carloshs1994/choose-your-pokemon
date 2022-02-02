// Include your code here
import './styles/main.scss';
import {
  displayPokemons,
  displayLikes,
  displayCounters,
  addMenu,
} from './modules/generators.js';
import displayPopup from './modules/popup.js';

window.onload = async () => {
  await displayPokemons();
  await displayLikes();
  displayPopup();
  displayCounters();
  addMenu();
};

const nav = document.querySelector('.nav');
const main = document.querySelector('main');
const linkTags = nav.querySelectorAll('a');
linkTags.forEach((tag) => {
  const reGex = /#[\w-]+/g;
  tag.addEventListener('click', async (event) => {
    const pageId = event.target.href.match(reGex)[0];
    main.innerHTML = '<h1> Pick your Favorite Pokemon! </h1>';
    if (pageId === '#pokemons') {
      await displayPokemons();
      await displayLikes();
      displayPopup();
      displayCounters();
    }
    const navChild = document.querySelector('.nav-child');
    navChild.setAttribute('data-active', 'false');
  });
});
