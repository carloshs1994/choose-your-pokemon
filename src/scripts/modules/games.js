import PokeLogo from '../../assets/icons/pokeLogo.svg';

export default (arr) => {
  console.log(arr);
  const main = document.querySelector('main');
  main.innerHTML = `
  <section class="game">
  <h2> Mix Or Match </h2>
  <div class="game-info">
  <div class="game-info-time">
  Time <span id="time-remaining">100</span>
  </div>
  <div class="game-info-flips">
  Flips <span id="flips">0</span>
  </div>
  </div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  <div class="game-card"></div>
  </section>
  `;
  const cards = [...document.querySelectorAll('.game-card')];
  cards.forEach((card, index) => {
    const logo = document.createElement('img');
    const pokemon = document.createElement('img');
    const front = document.createElement('div');
    const back = document.createElement('div');
    logo.className = 'game-card-front-logo';
    logo.src = PokeLogo;
    pokemon.className = 'game-card-back-pokemon';
    if (index > 7) {
      pokemon.src = arr[index - 8].sprites.other.dream_world.front_default;
    } else {
      pokemon.src = arr[index].sprites.other.dream_world.front_default;
    }
    front.className = 'game-card-front';
    back.className = 'game-card-back';
    front.appendChild(logo);
    back.appendChild(pokemon);
    card.appendChild(front);
    card.appendChild(back);
  });
};