// Include your code here
import './styles/main.scss';
import displayPokemons from './modules/generators.js';
import displayPopup from './modules/popup.js';

window.onload = async () => {
  await displayPokemons();
  displayPopup();
};
