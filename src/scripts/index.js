// Include your code here
import './styles/main.scss';
import displayPokemons from './modules/generators.js';
import displayPopup from './modules/popup.js';
import XButton from '../assets/icons/close.svg';

window.onload = async () => {
  const close = document.querySelector('.popup-close');
  const xImg = document.createElement('img');
  xImg.src = XButton;
  close.appendChild(xImg);
  await displayPokemons();
  displayPopup(close);
};
