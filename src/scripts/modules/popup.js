import XButton from '../../assets/icons/close.svg';
import { getPokemonComments, commentCounter, addPokemonComments } from './comments.js';

const getPokemonInfo = async (id) => {
  const getInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const json = await getInfo.json();
  return json;
};

const updateComments = async (pokemonId) => {
  const json = await getPokemonComments(pokemonId);
  document.querySelector('.popup-comments > ul').innerHTML = '';
  if (json.length !== undefined) {
    json.forEach((user) => {
      document.querySelector('.popup-comments > h3').innerText = `Comments (${commentCounter(json)})`;
      const li = document.createElement('li');
      li.innerText = `${user.creation_date}. ${user.username}: ${user.comment}`;
      document.querySelector('.popup-comments > ul').appendChild(li);
    });
  } else {
    document.querySelector('.popup-comments > h3').innerText = `Comments (${commentCounter(json)})`;
  }
};

export default () => {
  const buttons = [...document.querySelectorAll('.comments')];
  const close = document.querySelector('.popup-close');
  const xImg = document.createElement('img');
  const form = document.querySelector('form');
  const newForm = form.cloneNode(true);
  form.parentNode.replaceChild(newForm, form);
  let pokemonId = '';
  close.innerHTML = '';
  xImg.src = XButton;
  close.appendChild(xImg);
  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      const { id } = event.target;
      pokemonId = event.target.parentElement.id;
      getPokemonInfo(id).then((json) => {
        const h2 = document.querySelector('.popup > h2');
        const pBaseExperience = document.querySelector('.base-experience');
        const pAbilities = document.querySelector('.abilities');
        const pHeight = document.querySelector('.height');
        const pWeight = document.querySelector('.weight');
        const pMoves = document.querySelector('.moves');
        const pokemonImgContainer = document.querySelector('.popup-img');
        pokemonImgContainer.innerHTML = '';
        const pokemonImg = document.createElement('img');
        const {
          name,
          abilities,
          height,
          weight,
          moves,
        } = json;
        const baseExperience = json.base_experience;
        let stringWithabilities = '';
        let stringWithMoves = '';
        pokemonImg.src = json.sprites.other.dream_world.front_default;
        pokemonImgContainer.appendChild(pokemonImg);
        abilities.forEach((obj, index) => {
          if (index === abilities.length - 1) {
            stringWithabilities += obj.ability.name;
          } else {
            stringWithabilities += `${obj.ability.name}, `;
          }
        });
        moves.forEach((obj, index) => {
          if (index > 20) return;
          if (index === 20) {
            stringWithMoves += obj.move.name;
          } else {
            stringWithMoves += `${obj.move.name}, `;
          }
        });
        h2.innerText = `${name} has:`;
        pBaseExperience.innerHTML = `<strong>Base Experience:</strong> ${baseExperience}`;
        pAbilities.innerHTML = `<strong>Abilities:</strong> ${stringWithabilities}`;
        pHeight.innerHTML = `<strong>Height:</strong> ${height / 10} m`;
        pWeight.innerHTML = `<strong>Weight:</strong> ${weight} kg`;
        pMoves.innerHTML = `<strong>Some moves are:</strong> ${stringWithMoves}`;
        close.addEventListener('click', () => {
          document.querySelector('.popup').classList.remove('show');
          pokemonImgContainer.innerHTML = '';
          document.querySelector('.popup-comments > h3').innerText = '';
          document.querySelector('.popup-comments > ul').innerHTML = '';
        });
      });
      await updateComments(pokemonId);
      document.querySelector('.popup').classList.add('show');
    });
  });
  newForm.addEventListener('submit', async (event) => {
    const username = document.getElementById('username');
    const comment = document.getElementById('comment');
    const modalContainer = document.querySelector('.modal-container');
    event.preventDefault();
    await addPokemonComments(pokemonId, username.value, comment.value);
    await updateComments(pokemonId);
    newForm.reset();
    modalContainer.style.display = 'flex';
    setTimeout(() => {
      modalContainer.style.display = 'none';
    }, 2000);
  });
};