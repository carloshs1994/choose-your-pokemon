// Include your code here
import './styles/main.scss';
import { displayPokemons, displayLikes } from './modules/generators.js';

window.onload = async () => {
  await displayPokemons();
  await displayLikes();
};