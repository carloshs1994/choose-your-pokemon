// Include your code here
import './styles/main.scss';
import displayPokemons from './modules/generators.js';

window.onload = async () => {
  await displayPokemons();
};