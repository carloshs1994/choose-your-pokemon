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
