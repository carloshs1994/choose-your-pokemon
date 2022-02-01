const getPokemonInfo = async (id) => {
  const getInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const json = await getInfo.json();
  return json;
};

export default (close) => {
  const buttons = [...document.querySelectorAll('button')];
  buttons.forEach((button) => {
    if (button.innerText === 'Comments') {
      button.addEventListener('click', (event) => {
        const { id } = event.target;
        getPokemonInfo(id).then((json) => {
          const h2 = document.querySelector('.popup > h2');
          const pBaseExperience = document.querySelector('.base-experience');
          const pAbilities = document.querySelector('.abilities');
          const pHeight = document.querySelector('.height');
          const pWeight = document.querySelector('.weight');
          const pMoves = document.querySelector('.moves');
          const pokemonImgContainer = document.querySelector('.popup-img');
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
          pBaseExperience.innerText = `Base Experience: ${baseExperience}`;
          pAbilities.innerText = `Abilities: ${stringWithabilities}`;
          pHeight.innerText = `Height: ${height}`;
          pWeight.innerText = `Weight: ${weight}`;
          pMoves.innerText = `Some moves are: ${stringWithMoves}`;
          close.addEventListener('click', () => {
            document.querySelector('.popup').style.display = 'none';
            pokemonImgContainer.innerHTML = '';
          });
        });
        document.querySelector('.popup').style.display = 'flex';
      });
    }
  });
};