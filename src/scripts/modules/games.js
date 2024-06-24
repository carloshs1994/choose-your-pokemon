import PokeLogo from '../../assets/icons/pokeLogo.svg';

const shuffleCards = (cardsArray) => { // Fisher-Yates Shuffle Algorithm.
  for (let i = cardsArray.length - 1; i > 0; i -= 1) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    cardsArray[randIndex].style.order = i;
    cardsArray[i].style.order = randIndex;
  }
};

const getCardType = (card) => card.querySelector('.game-card-front-pokemon').src;

class PokemonGame {
  constructor(totalTime, cards) {
    this.cardsArray = cards;
    this.totalTime = totalTime;
    this.timeRemaining = totalTime;
    this.timer = document.getElementById('time-remaining');
    this.ticker = document.getElementById('flips');
  }

  startGame() {
    this.totalClicks = 0;
    this.timeRemaining = this.totalTime;
    this.cardToCheck = null;
    this.matchedCards = [];
    this.busy = true;
    setTimeout(() => {
      shuffleCards(this.cardsArray);
      this.countdown = this.startCountdown();
      this.busy = false;
    }, 500);
    this.hideCards();
    this.timer.innerText = this.timeRemaining;
    this.ticker.innerText = this.totalClicks;
  }

  startCountdown() {
    return setInterval(() => {
      this.timeRemaining -= 1;
      this.timer.innerText = this.timeRemaining;
      if (this.timeRemaining === 0) this.gameOver();
    }, 1000);
  }

  gameOver() {
    clearInterval(this.countdown);
    document.getElementById('game-over-text').classList.add('visible');
  }

  victory() {
    clearInterval(this.countdown);
    document.getElementById('victory-text').classList.add('visible');
  }

  hideCards() {
    this.cardsArray.forEach((card) => {
      card.classList.remove('visible');
      card.classList.remove('matched');
    });
  }

  flipCard(card) {
    if (this.canFlipCard(card)) {
      this.totalClicks += 1;
      this.ticker.innerText = this.totalClicks;
      card.classList.add('visible');

      if (this.cardToCheck) {
        this.checkForCardMatch(card);
      } else {
        this.cardToCheck = card;
      }
    }
  }

  checkForCardMatch(card) {
    if (getCardType(card) === getCardType(this.cardToCheck)) {
      this.cardMatch(card, this.cardToCheck);
    } else {
      this.cardMismatch(card, this.cardToCheck);
    }
    this.cardToCheck = null;
  }

  cardMatch(card1, card2) {
    this.matchedCards.push(card1);
    this.matchedCards.push(card2);
    card1.classList.add('matched');
    card2.classList.add('matched');
    if (this.matchedCards.length === this.cardsArray.length) this.victory();
  }

  cardMismatch(card1, card2) {
    this.busy = true;
    setTimeout(() => {
      card1.classList.remove('visible');
      card2.classList.remove('visible');
      this.busy = false;
    }, 1000);
  }

  canFlipCard(card) {
    return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck;
  }
}

const printGame = (arr) => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <section class="game">
  <h2> Mix Or Match </h2>
  <div class="overlay-text visible">
    Click to Start
  </div>
  <div id="game-over-text" class="overlay-text">
    GAME OVER
    <span class="overlay-text-small">Click to Restart</span>
  </div>
  <div id="victory-text" class="overlay-text">
    VICTORY
    <span class="overlay-text-small">Click to Restart</span>
  </div>
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
    const cardWrapper = document.createElement('div');
    logo.className = 'game-card-back-logo';
    logo.src = PokeLogo;
    pokemon.className = 'game-card-front-pokemon';
    if (index > 7) {
      pokemon.src = arr[index - 8].sprites.other.dream_world.front_default;
    } else {
      pokemon.src = arr[index].sprites.other.dream_world.front_default;
    }
    front.className = 'game-card-front';
    back.className = 'game-card-back';
    front.appendChild(pokemon);
    back.appendChild(logo);
    cardWrapper.className = 'game-card-wrapper';
    cardWrapper.appendChild(front);
    cardWrapper.appendChild(back);
    card.appendChild(cardWrapper);
  });
  return cards;
};

const preGame = (cards) => {
  const overlays = [...document.querySelectorAll('.overlay-text')];
  const game = new PokemonGame(100, cards);
  overlays.forEach((overlay) => {
    overlay.addEventListener('click', () => {
      overlay.classList.remove('visible');
      game.startGame();
    });
  });
  cards.forEach((card) => {
    card.addEventListener('click', () => {
      game.flipCard(card);
    });
  });
};

export default (arr) => {
  const cards = printGame(arr);
  preGame(cards);
};