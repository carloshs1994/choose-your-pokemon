/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "displayPokemons": () => (/* binding */ displayPokemons),
/* harmony export */   "displayLikes": () => (/* binding */ displayLikes),
/* harmony export */   "displayCounters": () => (/* binding */ displayCounters),
/* harmony export */   "addMenu": () => (/* binding */ addMenu),
/* harmony export */   "displaySeeMoreButton": () => (/* binding */ displaySeeMoreButton),
/* harmony export */   "addAboutSection": () => (/* binding */ addAboutSection),
/* harmony export */   "displaySpinner": () => (/* binding */ displaySpinner)
/* harmony export */ });
/* harmony import */ var _APIhandling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _assets_icons_hamburger_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _assets_icons_close_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _assets_icons_pokeLogo_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
/* harmony import */ var _assets_images_sadPokemon_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(10);








const numRegex = /\d+/;
// Display Home page
const displaySpinner = () => {
  const main = document.querySelector('main');
  const pokeLogo = new Image();
  pokeLogo.src = _assets_icons_pokeLogo_svg__WEBPACK_IMPORTED_MODULE_5__;
  pokeLogo.classList.add('spinner');
  main.appendChild(pokeLogo);
};

const displayPokemons = async (numberOfPokemons) => {
  // Array of pokemons
  const startingIndex = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const pokemons = await (0,_APIhandling_js__WEBPACK_IMPORTED_MODULE_0__.getPokemons)(startingIndex, numberOfPokemons);
  const main = document.querySelector('main');

  // Delete Spinner
  const spinner = main.querySelector('.spinner');
  if (spinner) {
    main.removeChild(spinner);
  }

  let cardsContainer;

  if (document.querySelector('.cardsContainer')) {
    cardsContainer = document.querySelector('.cardsContainer');
  } else {
    cardsContainer = document.createElement('ul');
    cardsContainer.classList.add('cardsContainer');
    cardsContainer.id = 'pokemons';
    main.appendChild(cardsContainer);
  }

  pokemons.forEach((pokemon) => {
    const card = document.createElement('li');
    card.classList.add('card');
    const { id, name } = pokemon;
    card.id = `pokemon-${id}`;

    cardsContainer.appendChild(card);

    const image = new Image();
    image.src = pokemon.sprites.other.dream_world.front_default;
    image.alt = name;
    image.classList.add('pokemon');
    card.appendChild(image);

    const info = document.createElement('div');
    info.classList.add('info');
    const title = document.createElement('h2');
    title.textContent = name;
    info.appendChild(title);

    const buttonHeart = document.createElement('button');
    buttonHeart.classList.add('heart');
    const heart = document.createElement('div');
    heart.classList.add('heart-shape');
    buttonHeart.appendChild(heart);
    info.appendChild(buttonHeart);

    card.appendChild(info);

    const likes = document.createElement('p');
    likes.classList.add('likes');
    likes.textContent = '0 Likes';

    buttonHeart.addEventListener('click', async () => {
      heart.classList.add('heart-shape-active');
      const numberOflikes = likes.textContent.match(numRegex)[0];
      likes.textContent = `${+numberOflikes + 1} Likes`;
      await (0,_APIhandling_js__WEBPACK_IMPORTED_MODULE_0__.addLike)(`pokemon-${id}`);
    }, { once: true });

    card.appendChild(likes);

    const commentsButton = document.createElement('button');
    commentsButton.className = 'comments';
    commentsButton.id = id;
    commentsButton.textContent = 'Comments';
    card.appendChild(commentsButton);
  });
};

const displayLikes = async () => {
  const likes = await (0,_APIhandling_js__WEBPACK_IMPORTED_MODULE_0__.getLikes)();
  likes.forEach((likeCount) => {
    const card = document.querySelector(`#${likeCount.item_id}`);
    if (card) {
      const likesElement = card.querySelector('.likes');
      likesElement.textContent = `${likeCount.likes} Likes`;
    }
  });
};

const displayCounters = () => {
  const pokemonTag = document.querySelector('#pokemonTag');
  pokemonTag.textContent = ` Pokemons (${(0,_util_js__WEBPACK_IMPORTED_MODULE_1__["default"])()})`;
};

const addMenu = () => {
  const menu = document.querySelector('.menu');
  const menuImage = new Image();
  menuImage.src = _assets_icons_hamburger_svg__WEBPACK_IMPORTED_MODULE_2__;
  menuImage.alt = 'Menu Button';

  menu.appendChild(menuImage);

  const close = document.querySelector('.close');
  const closeImage = new Image();
  closeImage.src = _assets_icons_close_svg__WEBPACK_IMPORTED_MODULE_3__;
  closeImage.alt = 'Close Button';

  close.appendChild(closeImage);

  const navChild = document.querySelector('.nav-child');
  menu.addEventListener('click', () => {
    navChild.setAttribute('data-active', 'true');
  });
  close.addEventListener('click', () => {
    navChild.setAttribute('data-active', 'false');
  });

  const pokeLogo = new Image();
  const logo = document.querySelector('#logo');
  pokeLogo.src = _assets_icons_pokeLogo_svg__WEBPACK_IMPORTED_MODULE_5__;
  pokeLogo.alt = '';
  logo.appendChild(pokeLogo);
};

const displaySeeMoreButton = () => {
  const main = document.querySelector('main');
  const seeMore = document.createElement('button');
  seeMore.classList.add('see-more');
  seeMore.setAttribute('type', 'button');
  seeMore.textContent = 'Display More Pokemons!';
  main.appendChild(seeMore);

  seeMore.addEventListener('click', async () => {
    await displayPokemons(10);
    await displayLikes();
    (0,_popup_js__WEBPACK_IMPORTED_MODULE_4__["default"])();
    displayCounters();
  });
};

const generateDescription = (text, parent) => {
  const description = document.createElement('p');
  description.classList.add('description');
  description.textContent = text;
  parent.appendChild(description);
  return description;
};

// Display About Page
const addAboutSection = () => {
  const main = document.querySelector('main');
  const aboutSection = document.createElement('section');
  aboutSection.classList.add('about');
  main.appendChild(aboutSection);

  const h1 = document.createElement('h1');
  h1.textContent = '"Choose your Pokemon" initiative';
  aboutSection.appendChild(h1);

  const imgContainer = document.createElement('div');
  imgContainer.classList.add('sadPokemon');
  const sadPokemon = new Image();
  sadPokemon.src = _assets_images_sadPokemon_jpg__WEBPACK_IMPORTED_MODULE_6__;
  sadPokemon.alt = 'Three pokemon crying';
  imgContainer.appendChild(sadPokemon);
  aboutSection.appendChild(imgContainer);

  const h2 = document.createElement('h2');
  h2.textContent = 'What are we?';
  aboutSection.appendChild(h2);

  const descriptionContainer = document.createElement('div');
  descriptionContainer.classList.add('description-container');
  aboutSection.appendChild(descriptionContainer);

  generateDescription(
    `Nowadays internet has become the most useful tool around the world. 
  It has allowed people to connect in extensive manners. Following the trends 
  Pokemon species started to be interested in the web world and have tried, 
  without success, to get attention from the outside world. Why? Because not being human 
  forbids them to create an Instagram account to publish photos. This is a crime. 
  You can see how sad they are above. 
  `, descriptionContainer,
  );

  generateDescription(
    `"Choose your Pokemon" is a movement that aims to give Pokemon the love they 
    deserve. It holds a list of up to 500 Pokemons waiting to receive likes and lovely comments. 
    Go. Don't hesitate. Go and change their faces to smiley Pokemons.`, descriptionContainer,
  );

  generateDescription(
    `If you want to support this movement, it's not like you should donate 100 BTC or anything. 
    They would love it though.`, descriptionContainer,
  );

  const note = generateDescription('', descriptionContainer);
  note.innerHTML = `
    Note: This is just an exercise meant to learn API fetching, Testing, and JavaScript in general. 
    No donations or something like that (We include this just in case). Recognition is important so 
    definitely go and check <a href="https://pokeapi.co/" target="_blank"> PokéAPI </a> if you're interested in fetching this and 
    even more data about Pokemon. They've done an incredible job.
  `;
  note.classList.add('note');

  const pikachu = document.createElement('div');
  pikachu.innerHTML = `
  <div style="width:100%;height:0;padding-bottom:75%;position:relative;">
  <iframe src="https://giphy.com/embed/xuXzcHMkuwvf2" width="100%" height="100%" style="position:absolute" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
  </div>
  `;
  descriptionContainer.appendChild(pikachu);
};



/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPokemons": () => (/* binding */ getPokemons),
/* harmony export */   "getLikes": () => (/* binding */ getLikes),
/* harmony export */   "addLike": () => (/* binding */ addLike)
/* harmony export */ });
const getPokemons = async (startingIndex, numberOfPokemons) => {
  let pokemons = [];
  const finalIndex = (startingIndex + numberOfPokemons) >= 500 ? 500
    : startingIndex + numberOfPokemons;
  for (let i = startingIndex + 1; i <= finalIndex; i += 1) {
    const pokemon = fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`).then((response) => response.json());
    pokemons.push(pokemon);
  }
  pokemons = await Promise.all(pokemons);
  return pokemons;
};

const getLikes = async () => {
  let likes;
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/likes';
  try {
    likes = await fetch(url).then((response) => response.json());
  } catch (error) {
    likes = [];
  }
  return likes;
};

const addLike = async (itemID) => {
  const url = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/likes';
  const item = {
    item_id: itemID,
  };
  await fetch(url, {
    method: 'POST',
    body: JSON.stringify(item),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  }).then((response) => response.text());
};




/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const cards = document.querySelectorAll('.card');
  return cards.length;
});

/***/ }),
/* 5 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "381b868940658e15ee93.svg";

/***/ }),
/* 6 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "224e79b70c463f5a0575.svg";

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _assets_icons_close_svg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _comments_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);



const getPokemonInfo = async (id) => {
  const getInfo = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
  const json = await getInfo.json();
  return json;
};

const updateComments = async (pokemonId) => {
  const json = await (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.getPokemonComments)(pokemonId);
  document.querySelector('.popup-comments > ul').innerHTML = '';
  if (json.length !== undefined) {
    json.forEach((user) => {
      document.querySelector('.popup-comments > h3').innerText = `Comments (${(0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.commentCounter)(json)})`;
      const li = document.createElement('li');
      li.innerText = `${user.creation_date}. ${user.username}: ${user.comment}`;
      document.querySelector('.popup-comments > ul').appendChild(li);
    });
  } else {
    document.querySelector('.popup-comments > h3').innerText = `Comments (${(0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.commentCounter)(json)})`;
  }
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {
  const buttons = [...document.querySelectorAll('.comments')];
  const close = document.querySelector('.popup-close');
  const xImg = document.createElement('img');
  const form = document.querySelector('form');
  const newForm = form.cloneNode(true);
  const pokedex = document.querySelector('.pokedex');
  form.parentNode.replaceChild(newForm, form);
  let pokemonId = '';
  close.innerHTML = '';
  xImg.src = _assets_icons_close_svg__WEBPACK_IMPORTED_MODULE_0__;
  close.appendChild(xImg);
  buttons.forEach((button) => {
    button.addEventListener('click', async (event) => {
      if (window.outerWidth > 950) {
        pokedex.style.display = 'block';
      }
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
          pokedex.style.display = 'none';
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
    await (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.addPokemonComments)(pokemonId, username.value, comment.value);
    await updateComments(pokemonId);
    newForm.reset();
    modalContainer.style.display = 'flex';
    setTimeout(() => {
      modalContainer.style.display = 'none';
    }, 2000);
  });
});

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getPokemonComments": () => (/* binding */ getPokemonComments),
/* harmony export */   "commentCounter": () => (/* binding */ commentCounter),
/* harmony export */   "addPokemonComments": () => (/* binding */ addPokemonComments)
/* harmony export */ });
const getPokemonComments = async (pokemonId) => {
  const json = await fetch(`https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/comments?item_id=${pokemonId}`)
    .then((response) => response.json());
  return json;
};

const addPokemonComments = async (pokemonId, username, comment) => {
  const sendInfo = await fetch('https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/BeZr9XamNVOo33K8TRz4/comments', {
    method: 'POST',
    body: JSON.stringify({
      item_id: pokemonId,
      username,
      comment,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const json = await sendInfo.text();
  return json;
};

const commentCounter = (json) => {
  if (json.length === undefined || json.length === null) return 0;
  return json.length;
};



/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "e96dad70675b67c84e05.svg";

/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "02aab2104b4ae1e9679a.jpg";

/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "/choose-your-pokemon/";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _modules_generators_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _modules_popup_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
// Include your code here




(0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displaySpinner)();
(0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.addMenu)();

window.onload = async () => {
  await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemons)(20);
  await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayLikes)();
  (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displaySeeMoreButton)();
  (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayCounters)();
};

const nav = document.querySelector('.nav-child');
const main = document.querySelector('main');
const linkTags = nav.querySelectorAll('a');

linkTags.forEach((tag) => {
  const reGex = /#[\w-]+/g;
  tag.addEventListener('click', async (event) => {
    const pageId = event.target.href.match(reGex)[0];
    main.innerHTML = '';
    if (pageId === '#pokemons') {
      main.innerHTML = '<h1> Pick your Favorite Pokemon! </h1>';
      (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displaySpinner)();
      await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemons)(20);
      await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayLikes)();
      (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displaySeeMoreButton)();
      (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
      (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayCounters)();
    } else if (pageId === '#about') {
      (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.addAboutSection)();
    }
    const navChild = document.querySelector('.nav-child');
    navChild.setAttribute('data-active', 'false');
  });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7OztBQ0FBO0FBQzRCO0FBU0s7QUFDYTs7QUFFOUMsc0VBQWM7QUFDZCwrREFBTzs7QUFFUDtBQUNBLFFBQVEsdUVBQWU7QUFDdkIsUUFBUSxvRUFBWTtBQUNwQixFQUFFLDRFQUFvQjtBQUN0QixFQUFFLDZEQUFZO0FBQ2QsRUFBRSx1RUFBZTtBQUNqQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNLHNFQUFjO0FBQ3BCLFlBQVksdUVBQWU7QUFDM0IsWUFBWSxvRUFBWTtBQUN4QixNQUFNLDRFQUFvQjtBQUMxQixNQUFNLDZEQUFZO0FBQ2xCLE1BQU0sdUVBQWU7QUFDckIsTUFBTTtBQUNOLE1BQU0sdUVBQWU7QUFDckI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9zdHlsZXMvbWFpbi5zY3NzPzRjNTUiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy9nZW5lcmF0b3JzLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvQVBJaGFuZGxpbmcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy91dGlsLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy9jb21tZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgZ2V0UG9rZW1vbnMsIGdldExpa2VzLCBhZGRMaWtlIH0gZnJvbSAnLi9BUEloYW5kbGluZy5qcyc7XG5pbXBvcnQgaXRlbXNDb3VudGVyIGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgTWVudSBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvaGFtYnVyZ2VyLnN2Zyc7XG5pbXBvcnQgQ2xvc2UgZnJvbSAnLi4vLi4vYXNzZXRzL2ljb25zL2Nsb3NlLnN2Zyc7XG5pbXBvcnQgZGlzcGxheVBvcHVwIGZyb20gJy4vcG9wdXAuanMnO1xuaW1wb3J0IFBva2VMb2dvIGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9wb2tlTG9nby5zdmcnO1xuaW1wb3J0IFNhZFBva2Vtb24gZnJvbSAnLi4vLi4vYXNzZXRzL2ltYWdlcy9zYWRQb2tlbW9uLmpwZyc7XG5cbmNvbnN0IG51bVJlZ2V4ID0gL1xcZCsvO1xuLy8gRGlzcGxheSBIb21lIHBhZ2VcbmNvbnN0IGRpc3BsYXlTcGlubmVyID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBwb2tlTG9nbyA9IG5ldyBJbWFnZSgpO1xuICBwb2tlTG9nby5zcmMgPSBQb2tlTG9nbztcbiAgcG9rZUxvZ28uY2xhc3NMaXN0LmFkZCgnc3Bpbm5lcicpO1xuICBtYWluLmFwcGVuZENoaWxkKHBva2VMb2dvKTtcbn07XG5cbmNvbnN0IGRpc3BsYXlQb2tlbW9ucyA9IGFzeW5jIChudW1iZXJPZlBva2Vtb25zKSA9PiB7XG4gIC8vIEFycmF5IG9mIHBva2Vtb25zXG4gIGNvbnN0IHN0YXJ0aW5nSW5kZXggPSBpdGVtc0NvdW50ZXIoKTtcbiAgY29uc3QgcG9rZW1vbnMgPSBhd2FpdCBnZXRQb2tlbW9ucyhzdGFydGluZ0luZGV4LCBudW1iZXJPZlBva2Vtb25zKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcblxuICAvLyBEZWxldGUgU3Bpbm5lclxuICBjb25zdCBzcGlubmVyID0gbWFpbi5xdWVyeVNlbGVjdG9yKCcuc3Bpbm5lcicpO1xuICBpZiAoc3Bpbm5lcikge1xuICAgIG1haW4ucmVtb3ZlQ2hpbGQoc3Bpbm5lcik7XG4gIH1cblxuICBsZXQgY2FyZHNDb250YWluZXI7XG5cbiAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkc0NvbnRhaW5lcicpKSB7XG4gICAgY2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FyZHNDb250YWluZXInKTtcbiAgfSBlbHNlIHtcbiAgICBjYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gICAgY2FyZHNDb250YWluZXIuY2xhc3NMaXN0LmFkZCgnY2FyZHNDb250YWluZXInKTtcbiAgICBjYXJkc0NvbnRhaW5lci5pZCA9ICdwb2tlbW9ucyc7XG4gICAgbWFpbi5hcHBlbmRDaGlsZChjYXJkc0NvbnRhaW5lcik7XG4gIH1cblxuICBwb2tlbW9ucy5mb3JFYWNoKChwb2tlbW9uKSA9PiB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgY29uc3QgeyBpZCwgbmFtZSB9ID0gcG9rZW1vbjtcbiAgICBjYXJkLmlkID0gYHBva2Vtb24tJHtpZH1gO1xuXG4gICAgY2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZCk7XG5cbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLnNyYyA9IHBva2Vtb24uc3ByaXRlcy5vdGhlci5kcmVhbV93b3JsZC5mcm9udF9kZWZhdWx0O1xuICAgIGltYWdlLmFsdCA9IG5hbWU7XG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgncG9rZW1vbicpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuXG4gICAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm8uY2xhc3NMaXN0LmFkZCgnaW5mbycpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgaW5mby5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICBjb25zdCBidXR0b25IZWFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbkhlYXJ0LmNsYXNzTGlzdC5hZGQoJ2hlYXJ0Jyk7XG4gICAgY29uc3QgaGVhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFydC5jbGFzc0xpc3QuYWRkKCdoZWFydC1zaGFwZScpO1xuICAgIGJ1dHRvbkhlYXJ0LmFwcGVuZENoaWxkKGhlYXJ0KTtcbiAgICBpbmZvLmFwcGVuZENoaWxkKGJ1dHRvbkhlYXJ0KTtcblxuICAgIGNhcmQuYXBwZW5kQ2hpbGQoaW5mbyk7XG5cbiAgICBjb25zdCBsaWtlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsaWtlcy5jbGFzc0xpc3QuYWRkKCdsaWtlcycpO1xuICAgIGxpa2VzLnRleHRDb250ZW50ID0gJzAgTGlrZXMnO1xuXG4gICAgYnV0dG9uSGVhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICBoZWFydC5jbGFzc0xpc3QuYWRkKCdoZWFydC1zaGFwZS1hY3RpdmUnKTtcbiAgICAgIGNvbnN0IG51bWJlck9mbGlrZXMgPSBsaWtlcy50ZXh0Q29udGVudC5tYXRjaChudW1SZWdleClbMF07XG4gICAgICBsaWtlcy50ZXh0Q29udGVudCA9IGAkeytudW1iZXJPZmxpa2VzICsgMX0gTGlrZXNgO1xuICAgICAgYXdhaXQgYWRkTGlrZShgcG9rZW1vbi0ke2lkfWApO1xuICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcblxuICAgIGNhcmQuYXBwZW5kQ2hpbGQobGlrZXMpO1xuXG4gICAgY29uc3QgY29tbWVudHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb21tZW50c0J1dHRvbi5jbGFzc05hbWUgPSAnY29tbWVudHMnO1xuICAgIGNvbW1lbnRzQnV0dG9uLmlkID0gaWQ7XG4gICAgY29tbWVudHNCdXR0b24udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQoY29tbWVudHNCdXR0b24pO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbGlrZXMgPSBhd2FpdCBnZXRMaWtlcygpO1xuICBsaWtlcy5mb3JFYWNoKChsaWtlQ291bnQpID0+IHtcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bGlrZUNvdW50Lml0ZW1faWR9YCk7XG4gICAgaWYgKGNhcmQpIHtcbiAgICAgIGNvbnN0IGxpa2VzRWxlbWVudCA9IGNhcmQucXVlcnlTZWxlY3RvcignLmxpa2VzJyk7XG4gICAgICBsaWtlc0VsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtsaWtlQ291bnQubGlrZXN9IExpa2VzYDtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheUNvdW50ZXJzID0gKCkgPT4ge1xuICBjb25zdCBwb2tlbW9uVGFnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3Bva2Vtb25UYWcnKTtcbiAgcG9rZW1vblRhZy50ZXh0Q29udGVudCA9IGAgUG9rZW1vbnMgKCR7aXRlbXNDb3VudGVyKCl9KWA7XG59O1xuXG5jb25zdCBhZGRNZW51ID0gKCkgPT4ge1xuICBjb25zdCBtZW51ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnUnKTtcbiAgY29uc3QgbWVudUltYWdlID0gbmV3IEltYWdlKCk7XG4gIG1lbnVJbWFnZS5zcmMgPSBNZW51O1xuICBtZW51SW1hZ2UuYWx0ID0gJ01lbnUgQnV0dG9uJztcblxuICBtZW51LmFwcGVuZENoaWxkKG1lbnVJbWFnZSk7XG5cbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2xvc2UnKTtcbiAgY29uc3QgY2xvc2VJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBjbG9zZUltYWdlLnNyYyA9IENsb3NlO1xuICBjbG9zZUltYWdlLmFsdCA9ICdDbG9zZSBCdXR0b24nO1xuXG4gIGNsb3NlLmFwcGVuZENoaWxkKGNsb3NlSW1hZ2UpO1xuXG4gIGNvbnN0IG5hdkNoaWxkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1jaGlsZCcpO1xuICBtZW51LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG5hdkNoaWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnLCAndHJ1ZScpO1xuICB9KTtcbiAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbmF2Q2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZScsICdmYWxzZScpO1xuICB9KTtcblxuICBjb25zdCBwb2tlTG9nbyA9IG5ldyBJbWFnZSgpO1xuICBjb25zdCBsb2dvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2xvZ28nKTtcbiAgcG9rZUxvZ28uc3JjID0gUG9rZUxvZ287XG4gIHBva2VMb2dvLmFsdCA9ICcnO1xuICBsb2dvLmFwcGVuZENoaWxkKHBva2VMb2dvKTtcbn07XG5cbmNvbnN0IGRpc3BsYXlTZWVNb3JlQnV0dG9uID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBzZWVNb3JlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gIHNlZU1vcmUuY2xhc3NMaXN0LmFkZCgnc2VlLW1vcmUnKTtcbiAgc2VlTW9yZS5zZXRBdHRyaWJ1dGUoJ3R5cGUnLCAnYnV0dG9uJyk7XG4gIHNlZU1vcmUudGV4dENvbnRlbnQgPSAnRGlzcGxheSBNb3JlIFBva2Vtb25zISc7XG4gIG1haW4uYXBwZW5kQ2hpbGQoc2VlTW9yZSk7XG5cbiAgc2VlTW9yZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBkaXNwbGF5UG9rZW1vbnMoMTApO1xuICAgIGF3YWl0IGRpc3BsYXlMaWtlcygpO1xuICAgIGRpc3BsYXlQb3B1cCgpO1xuICAgIGRpc3BsYXlDb3VudGVycygpO1xuICB9KTtcbn07XG5cbmNvbnN0IGdlbmVyYXRlRGVzY3JpcHRpb24gPSAodGV4dCwgcGFyZW50KSA9PiB7XG4gIGNvbnN0IGRlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICBkZXNjcmlwdGlvbi5jbGFzc0xpc3QuYWRkKCdkZXNjcmlwdGlvbicpO1xuICBkZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IHRleHQ7XG4gIHBhcmVudC5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbik7XG4gIHJldHVybiBkZXNjcmlwdGlvbjtcbn07XG5cbi8vIERpc3BsYXkgQWJvdXQgUGFnZVxuY29uc3QgYWRkQWJvdXRTZWN0aW9uID0gKCkgPT4ge1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBhYm91dFNlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzZWN0aW9uJyk7XG4gIGFib3V0U2VjdGlvbi5jbGFzc0xpc3QuYWRkKCdhYm91dCcpO1xuICBtYWluLmFwcGVuZENoaWxkKGFib3V0U2VjdGlvbik7XG5cbiAgY29uc3QgaDEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMScpO1xuICBoMS50ZXh0Q29udGVudCA9ICdcIkNob29zZSB5b3VyIFBva2Vtb25cIiBpbml0aWF0aXZlJztcbiAgYWJvdXRTZWN0aW9uLmFwcGVuZENoaWxkKGgxKTtcblxuICBjb25zdCBpbWdDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgaW1nQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ3NhZFBva2Vtb24nKTtcbiAgY29uc3Qgc2FkUG9rZW1vbiA9IG5ldyBJbWFnZSgpO1xuICBzYWRQb2tlbW9uLnNyYyA9IFNhZFBva2Vtb247XG4gIHNhZFBva2Vtb24uYWx0ID0gJ1RocmVlIHBva2Vtb24gY3J5aW5nJztcbiAgaW1nQ29udGFpbmVyLmFwcGVuZENoaWxkKHNhZFBva2Vtb24pO1xuICBhYm91dFNlY3Rpb24uYXBwZW5kQ2hpbGQoaW1nQ29udGFpbmVyKTtcblxuICBjb25zdCBoMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gIGgyLnRleHRDb250ZW50ID0gJ1doYXQgYXJlIHdlPyc7XG4gIGFib3V0U2VjdGlvbi5hcHBlbmRDaGlsZChoMik7XG5cbiAgY29uc3QgZGVzY3JpcHRpb25Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgZGVzY3JpcHRpb25Db250YWluZXIuY2xhc3NMaXN0LmFkZCgnZGVzY3JpcHRpb24tY29udGFpbmVyJyk7XG4gIGFib3V0U2VjdGlvbi5hcHBlbmRDaGlsZChkZXNjcmlwdGlvbkNvbnRhaW5lcik7XG5cbiAgZ2VuZXJhdGVEZXNjcmlwdGlvbihcbiAgICBgTm93YWRheXMgaW50ZXJuZXQgaGFzIGJlY29tZSB0aGUgbW9zdCB1c2VmdWwgdG9vbCBhcm91bmQgdGhlIHdvcmxkLiBcbiAgSXQgaGFzIGFsbG93ZWQgcGVvcGxlIHRvIGNvbm5lY3QgaW4gZXh0ZW5zaXZlIG1hbm5lcnMuIEZvbGxvd2luZyB0aGUgdHJlbmRzIFxuICBQb2tlbW9uIHNwZWNpZXMgc3RhcnRlZCB0byBiZSBpbnRlcmVzdGVkIGluIHRoZSB3ZWIgd29ybGQgYW5kIGhhdmUgdHJpZWQsIFxuICB3aXRob3V0IHN1Y2Nlc3MsIHRvIGdldCBhdHRlbnRpb24gZnJvbSB0aGUgb3V0c2lkZSB3b3JsZC4gV2h5PyBCZWNhdXNlIG5vdCBiZWluZyBodW1hbiBcbiAgZm9yYmlkcyB0aGVtIHRvIGNyZWF0ZSBhbiBJbnN0YWdyYW0gYWNjb3VudCB0byBwdWJsaXNoIHBob3Rvcy4gVGhpcyBpcyBhIGNyaW1lLiBcbiAgWW91IGNhbiBzZWUgaG93IHNhZCB0aGV5IGFyZSBhYm92ZS4gXG4gIGAsIGRlc2NyaXB0aW9uQ29udGFpbmVyLFxuICApO1xuXG4gIGdlbmVyYXRlRGVzY3JpcHRpb24oXG4gICAgYFwiQ2hvb3NlIHlvdXIgUG9rZW1vblwiIGlzIGEgbW92ZW1lbnQgdGhhdCBhaW1zIHRvIGdpdmUgUG9rZW1vbiB0aGUgbG92ZSB0aGV5IFxuICAgIGRlc2VydmUuIEl0IGhvbGRzIGEgbGlzdCBvZiB1cCB0byA1MDAgUG9rZW1vbnMgd2FpdGluZyB0byByZWNlaXZlIGxpa2VzIGFuZCBsb3ZlbHkgY29tbWVudHMuIFxuICAgIEdvLiBEb24ndCBoZXNpdGF0ZS4gR28gYW5kIGNoYW5nZSB0aGVpciBmYWNlcyB0byBzbWlsZXkgUG9rZW1vbnMuYCwgZGVzY3JpcHRpb25Db250YWluZXIsXG4gICk7XG5cbiAgZ2VuZXJhdGVEZXNjcmlwdGlvbihcbiAgICBgSWYgeW91IHdhbnQgdG8gc3VwcG9ydCB0aGlzIG1vdmVtZW50LCBpdCdzIG5vdCBsaWtlIHlvdSBzaG91bGQgZG9uYXRlIDEwMCBCVEMgb3IgYW55dGhpbmcuIFxuICAgIFRoZXkgd291bGQgbG92ZSBpdCB0aG91Z2guYCwgZGVzY3JpcHRpb25Db250YWluZXIsXG4gICk7XG5cbiAgY29uc3Qgbm90ZSA9IGdlbmVyYXRlRGVzY3JpcHRpb24oJycsIGRlc2NyaXB0aW9uQ29udGFpbmVyKTtcbiAgbm90ZS5pbm5lckhUTUwgPSBgXG4gICAgTm90ZTogVGhpcyBpcyBqdXN0IGFuIGV4ZXJjaXNlIG1lYW50IHRvIGxlYXJuIEFQSSBmZXRjaGluZywgVGVzdGluZywgYW5kIEphdmFTY3JpcHQgaW4gZ2VuZXJhbC4gXG4gICAgTm8gZG9uYXRpb25zIG9yIHNvbWV0aGluZyBsaWtlIHRoYXQgKFdlIGluY2x1ZGUgdGhpcyBqdXN0IGluIGNhc2UpLiBSZWNvZ25pdGlvbiBpcyBpbXBvcnRhbnQgc28gXG4gICAgZGVmaW5pdGVseSBnbyBhbmQgY2hlY2sgPGEgaHJlZj1cImh0dHBzOi8vcG9rZWFwaS5jby9cIiB0YXJnZXQ9XCJfYmxhbmtcIj4gUG9rw6lBUEkgPC9hPiBpZiB5b3UncmUgaW50ZXJlc3RlZCBpbiBmZXRjaGluZyB0aGlzIGFuZCBcbiAgICBldmVuIG1vcmUgZGF0YSBhYm91dCBQb2tlbW9uLiBUaGV5J3ZlIGRvbmUgYW4gaW5jcmVkaWJsZSBqb2IuXG4gIGA7XG4gIG5vdGUuY2xhc3NMaXN0LmFkZCgnbm90ZScpO1xuXG4gIGNvbnN0IHBpa2FjaHUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgcGlrYWNodS5pbm5lckhUTUwgPSBgXG4gIDxkaXYgc3R5bGU9XCJ3aWR0aDoxMDAlO2hlaWdodDowO3BhZGRpbmctYm90dG9tOjc1JTtwb3NpdGlvbjpyZWxhdGl2ZTtcIj5cbiAgPGlmcmFtZSBzcmM9XCJodHRwczovL2dpcGh5LmNvbS9lbWJlZC94dVh6Y0hNa3V3dmYyXCIgd2lkdGg9XCIxMDAlXCIgaGVpZ2h0PVwiMTAwJVwiIHN0eWxlPVwicG9zaXRpb246YWJzb2x1dGVcIiBmcmFtZUJvcmRlcj1cIjBcIiBjbGFzcz1cImdpcGh5LWVtYmVkXCIgYWxsb3dGdWxsU2NyZWVuPjwvaWZyYW1lPlxuICA8L2Rpdj5cbiAgYDtcbiAgZGVzY3JpcHRpb25Db250YWluZXIuYXBwZW5kQ2hpbGQocGlrYWNodSk7XG59O1xuXG5leHBvcnQge1xuICBkaXNwbGF5UG9rZW1vbnMsXG4gIGRpc3BsYXlMaWtlcyxcbiAgZGlzcGxheUNvdW50ZXJzLFxuICBhZGRNZW51LFxuICBkaXNwbGF5U2VlTW9yZUJ1dHRvbixcbiAgYWRkQWJvdXRTZWN0aW9uLFxuICBkaXNwbGF5U3Bpbm5lcixcbn07IiwiY29uc3QgZ2V0UG9rZW1vbnMgPSBhc3luYyAoc3RhcnRpbmdJbmRleCwgbnVtYmVyT2ZQb2tlbW9ucykgPT4ge1xuICBsZXQgcG9rZW1vbnMgPSBbXTtcbiAgY29uc3QgZmluYWxJbmRleCA9IChzdGFydGluZ0luZGV4ICsgbnVtYmVyT2ZQb2tlbW9ucykgPj0gNTAwID8gNTAwXG4gICAgOiBzdGFydGluZ0luZGV4ICsgbnVtYmVyT2ZQb2tlbW9ucztcbiAgZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXggKyAxOyBpIDw9IGZpbmFsSW5kZXg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHBva2Vtb24gPSBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aX0vYCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgcG9rZW1vbnMucHVzaChwb2tlbW9uKTtcbiAgfVxuICBwb2tlbW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKHBva2Vtb25zKTtcbiAgcmV0dXJuIHBva2Vtb25zO1xufTtcblxuY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBsaWtlcztcbiAgY29uc3QgdXJsID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL0JlWnI5WGFtTlZPbzMzSzhUUno0L2xpa2VzJztcbiAgdHJ5IHtcbiAgICBsaWtlcyA9IGF3YWl0IGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbGlrZXMgPSBbXTtcbiAgfVxuICByZXR1cm4gbGlrZXM7XG59O1xuXG5jb25zdCBhZGRMaWtlID0gYXN5bmMgKGl0ZW1JRCkgPT4ge1xuICBjb25zdCB1cmwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvQmVacjlYYW1OVk9vMzNLOFRSejQvbGlrZXMnO1xuICBjb25zdCBpdGVtID0ge1xuICAgIGl0ZW1faWQ6IGl0ZW1JRCxcbiAgfTtcbiAgYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKTtcbn07XG5cbmV4cG9ydCB7IGdldFBva2Vtb25zLCBnZXRMaWtlcywgYWRkTGlrZSB9O1xuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XG4gIHJldHVybiBjYXJkcy5sZW5ndGg7XG59OyIsImltcG9ydCBYQnV0dG9uIGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9jbG9zZS5zdmcnO1xuaW1wb3J0IHsgZ2V0UG9rZW1vbkNvbW1lbnRzLCBjb21tZW50Q291bnRlciwgYWRkUG9rZW1vbkNvbW1lbnRzIH0gZnJvbSAnLi9jb21tZW50cy5qcyc7XG5cbmNvbnN0IGdldFBva2Vtb25JbmZvID0gYXN5bmMgKGlkKSA9PiB7XG4gIGNvbnN0IGdldEluZm8gPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWR9L2ApO1xuICBjb25zdCBqc29uID0gYXdhaXQgZ2V0SW5mby5qc29uKCk7XG4gIHJldHVybiBqc29uO1xufTtcblxuY29uc3QgdXBkYXRlQ29tbWVudHMgPSBhc3luYyAocG9rZW1vbklkKSA9PiB7XG4gIGNvbnN0IGpzb24gPSBhd2FpdCBnZXRQb2tlbW9uQ29tbWVudHMocG9rZW1vbklkKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gdWwnKS5pbm5lckhUTUwgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBqc29uLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IGgzJykuaW5uZXJUZXh0ID0gYENvbW1lbnRzICgke2NvbW1lbnRDb3VudGVyKGpzb24pfSlgO1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgbGkuaW5uZXJUZXh0ID0gYCR7dXNlci5jcmVhdGlvbl9kYXRlfS4gJHt1c2VyLnVzZXJuYW1lfTogJHt1c2VyLmNvbW1lbnR9YDtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IHVsJykuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IGgzJykuaW5uZXJUZXh0ID0gYENvbW1lbnRzICgke2NvbW1lbnRDb3VudGVyKGpzb24pfSlgO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnRzJyldO1xuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jbG9zZScpO1xuICBjb25zdCB4SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gIGNvbnN0IG5ld0Zvcm0gPSBmb3JtLmNsb25lTm9kZSh0cnVlKTtcbiAgY29uc3QgcG9rZWRleCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlZGV4Jyk7XG4gIGZvcm0ucGFyZW50Tm9kZS5yZXBsYWNlQ2hpbGQobmV3Rm9ybSwgZm9ybSk7XG4gIGxldCBwb2tlbW9uSWQgPSAnJztcbiAgY2xvc2UuaW5uZXJIVE1MID0gJyc7XG4gIHhJbWcuc3JjID0gWEJ1dHRvbjtcbiAgY2xvc2UuYXBwZW5kQ2hpbGQoeEltZyk7XG4gIGJ1dHRvbnMuZm9yRWFjaCgoYnV0dG9uKSA9PiB7XG4gICAgYnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgICBpZiAod2luZG93Lm91dGVyV2lkdGggPiA5NTApIHtcbiAgICAgICAgcG9rZWRleC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgaWQgfSA9IGV2ZW50LnRhcmdldDtcbiAgICAgIHBva2Vtb25JZCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xuICAgICAgZ2V0UG9rZW1vbkluZm8oaWQpLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAgPiBoMicpO1xuICAgICAgICBjb25zdCBwQmFzZUV4cGVyaWVuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFzZS1leHBlcmllbmNlJyk7XG4gICAgICAgIGNvbnN0IHBBYmlsaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJpbGl0aWVzJyk7XG4gICAgICAgIGNvbnN0IHBIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVpZ2h0Jyk7XG4gICAgICAgIGNvbnN0IHBXZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VpZ2h0Jyk7XG4gICAgICAgIGNvbnN0IHBNb3ZlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlcycpO1xuICAgICAgICBjb25zdCBwb2tlbW9uSW1nQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWltZycpO1xuICAgICAgICBwb2tlbW9uSW1nQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICBjb25zdCBwb2tlbW9uSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFiaWxpdGllcyxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgd2VpZ2h0LFxuICAgICAgICAgIG1vdmVzLFxuICAgICAgICB9ID0ganNvbjtcbiAgICAgICAgY29uc3QgYmFzZUV4cGVyaWVuY2UgPSBqc29uLmJhc2VfZXhwZXJpZW5jZTtcbiAgICAgICAgbGV0IHN0cmluZ1dpdGhhYmlsaXRpZXMgPSAnJztcbiAgICAgICAgbGV0IHN0cmluZ1dpdGhNb3ZlcyA9ICcnO1xuICAgICAgICBwb2tlbW9uSW1nLnNyYyA9IGpzb24uc3ByaXRlcy5vdGhlci5kcmVhbV93b3JsZC5mcm9udF9kZWZhdWx0O1xuICAgICAgICBwb2tlbW9uSW1nQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25JbWcpO1xuICAgICAgICBhYmlsaXRpZXMuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gYWJpbGl0aWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHN0cmluZ1dpdGhhYmlsaXRpZXMgKz0gb2JqLmFiaWxpdHkubmFtZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaW5nV2l0aGFiaWxpdGllcyArPSBgJHtvYmouYWJpbGl0eS5uYW1lfSwgYDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtb3Zlcy5mb3JFYWNoKChvYmosIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID4gMjApIHJldHVybjtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IDIwKSB7XG4gICAgICAgICAgICBzdHJpbmdXaXRoTW92ZXMgKz0gb2JqLm1vdmUubmFtZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaW5nV2l0aE1vdmVzICs9IGAke29iai5tb3ZlLm5hbWV9LCBgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGgyLmlubmVyVGV4dCA9IGAke25hbWV9IGhhczpgO1xuICAgICAgICBwQmFzZUV4cGVyaWVuY2UuaW5uZXJIVE1MID0gYDxzdHJvbmc+QmFzZSBFeHBlcmllbmNlOjwvc3Ryb25nPiAke2Jhc2VFeHBlcmllbmNlfWA7XG4gICAgICAgIHBBYmlsaXRpZXMuaW5uZXJIVE1MID0gYDxzdHJvbmc+QWJpbGl0aWVzOjwvc3Ryb25nPiAke3N0cmluZ1dpdGhhYmlsaXRpZXN9YDtcbiAgICAgICAgcEhlaWdodC5pbm5lckhUTUwgPSBgPHN0cm9uZz5IZWlnaHQ6PC9zdHJvbmc+ICR7aGVpZ2h0IC8gMTB9IG1gO1xuICAgICAgICBwV2VpZ2h0LmlubmVySFRNTCA9IGA8c3Ryb25nPldlaWdodDo8L3N0cm9uZz4gJHt3ZWlnaHR9IGtnYDtcbiAgICAgICAgcE1vdmVzLmlubmVySFRNTCA9IGA8c3Ryb25nPlNvbWUgbW92ZXMgYXJlOjwvc3Ryb25nPiAke3N0cmluZ1dpdGhNb3Zlc31gO1xuICAgICAgICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKS5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gICAgICAgICAgcG9rZW1vbkltZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY29tbWVudHMgPiBoMycpLmlubmVyVGV4dCA9ICcnO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IHVsJykuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgcG9rZWRleC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdXBkYXRlQ29tbWVudHMocG9rZW1vbklkKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICB9KTtcbiAgfSk7XG4gIG5ld0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKTtcbiAgICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQnKTtcbiAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250YWluZXInKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGF3YWl0IGFkZFBva2Vtb25Db21tZW50cyhwb2tlbW9uSWQsIHVzZXJuYW1lLnZhbHVlLCBjb21tZW50LnZhbHVlKTtcbiAgICBhd2FpdCB1cGRhdGVDb21tZW50cyhwb2tlbW9uSWQpO1xuICAgIG5ld0Zvcm0ucmVzZXQoKTtcbiAgICBtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9LCAyMDAwKTtcbiAgfSk7XG59OyIsImNvbnN0IGdldFBva2Vtb25Db21tZW50cyA9IGFzeW5jIChwb2tlbW9uSWQpID0+IHtcbiAgY29uc3QganNvbiA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9CZVpyOVhhbU5WT28zM0s4VFJ6NC9jb21tZW50cz9pdGVtX2lkPSR7cG9rZW1vbklkfWApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICByZXR1cm4ganNvbjtcbn07XG5cbmNvbnN0IGFkZFBva2Vtb25Db21tZW50cyA9IGFzeW5jIChwb2tlbW9uSWQsIHVzZXJuYW1lLCBjb21tZW50KSA9PiB7XG4gIGNvbnN0IHNlbmRJbmZvID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL0JlWnI5WGFtTlZPbzMzSzhUUno0L2NvbW1lbnRzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IHBva2Vtb25JZCxcbiAgICAgIHVzZXJuYW1lLFxuICAgICAgY29tbWVudCxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBqc29uID0gYXdhaXQgc2VuZEluZm8udGV4dCgpO1xuICByZXR1cm4ganNvbjtcbn07XG5cbmNvbnN0IGNvbW1lbnRDb3VudGVyID0gKGpzb24pID0+IHtcbiAgaWYgKGpzb24ubGVuZ3RoID09PSB1bmRlZmluZWQgfHwganNvbi5sZW5ndGggPT09IG51bGwpIHJldHVybiAwO1xuICByZXR1cm4ganNvbi5sZW5ndGg7XG59O1xuXG5leHBvcnQge1xuICBnZXRQb2tlbW9uQ29tbWVudHMsXG4gIGNvbW1lbnRDb3VudGVyLFxuICBhZGRQb2tlbW9uQ29tbWVudHMsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvY2hvb3NlLXlvdXItcG9rZW1vbi9cIjsiLCIvLyBJbmNsdWRlIHlvdXIgY29kZSBoZXJlXG5pbXBvcnQgJy4vc3R5bGVzL21haW4uc2Nzcyc7XG5pbXBvcnQge1xuICBkaXNwbGF5UG9rZW1vbnMsXG4gIGRpc3BsYXlMaWtlcyxcbiAgZGlzcGxheUNvdW50ZXJzLFxuICBhZGRNZW51LFxuICBkaXNwbGF5U2VlTW9yZUJ1dHRvbixcbiAgYWRkQWJvdXRTZWN0aW9uLFxuICBkaXNwbGF5U3Bpbm5lcixcbn0gZnJvbSAnLi9tb2R1bGVzL2dlbmVyYXRvcnMuanMnO1xuaW1wb3J0IGRpc3BsYXlQb3B1cCBmcm9tICcuL21vZHVsZXMvcG9wdXAuanMnO1xuXG5kaXNwbGF5U3Bpbm5lcigpO1xuYWRkTWVudSgpO1xuXG53aW5kb3cub25sb2FkID0gYXN5bmMgKCkgPT4ge1xuICBhd2FpdCBkaXNwbGF5UG9rZW1vbnMoMjApO1xuICBhd2FpdCBkaXNwbGF5TGlrZXMoKTtcbiAgZGlzcGxheVNlZU1vcmVCdXR0b24oKTtcbiAgZGlzcGxheVBvcHVwKCk7XG4gIGRpc3BsYXlDb3VudGVycygpO1xufTtcblxuY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdi1jaGlsZCcpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmNvbnN0IGxpbmtUYWdzID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblxubGlua1RhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gIGNvbnN0IHJlR2V4ID0gLyNbXFx3LV0rL2c7XG4gIHRhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHBhZ2VJZCA9IGV2ZW50LnRhcmdldC5ocmVmLm1hdGNoKHJlR2V4KVswXTtcbiAgICBtYWluLmlubmVySFRNTCA9ICcnO1xuICAgIGlmIChwYWdlSWQgPT09ICcjcG9rZW1vbnMnKSB7XG4gICAgICBtYWluLmlubmVySFRNTCA9ICc8aDE+IFBpY2sgeW91ciBGYXZvcml0ZSBQb2tlbW9uISA8L2gxPic7XG4gICAgICBkaXNwbGF5U3Bpbm5lcigpO1xuICAgICAgYXdhaXQgZGlzcGxheVBva2Vtb25zKDIwKTtcbiAgICAgIGF3YWl0IGRpc3BsYXlMaWtlcygpO1xuICAgICAgZGlzcGxheVNlZU1vcmVCdXR0b24oKTtcbiAgICAgIGRpc3BsYXlQb3B1cCgpO1xuICAgICAgZGlzcGxheUNvdW50ZXJzKCk7XG4gICAgfSBlbHNlIGlmIChwYWdlSWQgPT09ICcjYWJvdXQnKSB7XG4gICAgICBhZGRBYm91dFNlY3Rpb24oKTtcbiAgICB9XG4gICAgY29uc3QgbmF2Q2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNoaWxkJyk7XG4gICAgbmF2Q2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZScsICdmYWxzZScpO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9