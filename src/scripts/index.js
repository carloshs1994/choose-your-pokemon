// Include your code here
import './styles/main.scss';
import { getPokemonInfo } from './popup';
import XButton from '../assets/icons/close-cross-svgrepo-com.svg';

getPokemonInfo(3).then((json) => {
  const h2 = document.querySelector('.popup > h2');
  const pBaseExperience = document.querySelector('.base-experience');
  const pAbilities = document.querySelector('.abilities');
  const pHeight = document.querySelector('.height');
  const pWeight = document.querySelector('.weight');
  const pokemonImgContainer = document.querySelector('.popup-img');
  const close = document.querySelector('.popup-close');
  const pokemonImg = document.createElement('img');
  const xImg = document.createElement('img');
  const {
    name,
    base_experience,
    abilities,
    height,
    weight,
    moves,
  } = json;
  moves.forEach((obj, index) => {
    if (index > 20) return;
    console.log(obj.move.name);
  });
  console.log(moves);
  let stringWithabilities = '';
  pokemonImg.src = json.sprites.other.dream_world.front_default;
  pokemonImgContainer.appendChild(pokemonImg);
  xImg.src = XButton;
  close.appendChild(xImg);
  abilities.forEach((obj, index) => {
    if (index === abilities.length - 1) {
      stringWithabilities += obj.ability.name;
    } else {
      stringWithabilities += `${obj.ability.name}, `;
    }
  });
  h2.innerText = `${name} has:`;
  pBaseExperience.innerText = `Base Experience: ${base_experience}`;
  pAbilities.innerText = `Abilities: ${stringWithabilities}`;
  pHeight.innerText = `Height: ${height}`;
  pWeight.innerText = `Weight: ${weight}`;
});
