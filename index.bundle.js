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
/* harmony export */   "displaySeeMoreButton": () => (/* binding */ displaySeeMoreButton)
/* harmony export */ });
/* harmony import */ var _APIhandling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _assets_icons_hamburger_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _assets_icons_close_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _popup_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _assets_icons_pokeLogo_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);







const numRegex = /\d+/;
// Display Home page
const displayPokemons = async (numberOfPokemons) => {
  // Array of pokemons
  const startingIndex = (0,_util_js__WEBPACK_IMPORTED_MODULE_1__["default"])();
  const pokemons = await (0,_APIhandling_js__WEBPACK_IMPORTED_MODULE_0__.getPokemons)(startingIndex, numberOfPokemons);
  const main = document.querySelector('main');
  let cardsContainer;

  if (document.querySelector('.cardsContainer')) {
    cardsContainer = document.querySelector('.cardsContainer');
  } else {
    cardsContainer = document.createElement('ul');
    cardsContainer.classList.add('cardsContainer');
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
  form.parentNode.replaceChild(newForm, form);
  let pokemonId = '';
  close.innerHTML = '';
  xImg.src = _assets_icons_close_svg__WEBPACK_IMPORTED_MODULE_0__;
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
        pHeight.innerHTML = `<strong>Height:</strong> ${height}`;
        pWeight.innerHTML = `<strong>Weight:</strong> ${weight}`;
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




window.onload = async () => {
  await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemons)(20);
  await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayLikes)();
  (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displaySeeMoreButton)();
  (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayCounters)();
  (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.addMenu)();
};

const nav = document.querySelector('.nav');
const main = document.querySelector('main');
const linkTags = nav.querySelectorAll('a');

linkTags.forEach((tag) => {
  const reGex = /#[\w-]+/g;
  tag.addEventListener('click', async (event) => {
    const pageId = event.target.href.match(reGex)[0];
    main.innerHTML = '<h1> Pick your Favorite Pokemon! </h1>';
    if (pageId === '#pokemons') {
      await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemons)(20);
      await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayLikes)();
      (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displaySeeMoreButton)();
      (0,_modules_popup_js__WEBPACK_IMPORTED_MODULE_2__["default"])();
      (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayCounters)();
    }
    const navChild = document.querySelector('.nav-child');
    navChild.setAttribute('data-active', 'false');
  });
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBLFlBQVksdUVBQWU7QUFDM0IsWUFBWSxvRUFBWTtBQUN4QixNQUFNLDRFQUFvQjtBQUMxQixNQUFNLDZEQUFZO0FBQ2xCLE1BQU0sdUVBQWU7QUFDckI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9zdHlsZXMvbWFpbi5zY3NzPzRjNTUiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy9nZW5lcmF0b3JzLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvQVBJaGFuZGxpbmcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy91dGlsLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy9jb21tZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgZ2V0UG9rZW1vbnMsIGdldExpa2VzLCBhZGRMaWtlIH0gZnJvbSAnLi9BUEloYW5kbGluZy5qcyc7XG5pbXBvcnQgaXRlbXNDb3VudGVyIGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgTWVudSBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvaGFtYnVyZ2VyLnN2Zyc7XG5pbXBvcnQgQ2xvc2UgZnJvbSAnLi4vLi4vYXNzZXRzL2ljb25zL2Nsb3NlLnN2Zyc7XG5pbXBvcnQgZGlzcGxheVBvcHVwIGZyb20gJy4vcG9wdXAuanMnO1xuaW1wb3J0IFBva2VMb2dvIGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9wb2tlTG9nby5zdmcnO1xuXG5jb25zdCBudW1SZWdleCA9IC9cXGQrLztcbi8vIERpc3BsYXkgSG9tZSBwYWdlXG5jb25zdCBkaXNwbGF5UG9rZW1vbnMgPSBhc3luYyAobnVtYmVyT2ZQb2tlbW9ucykgPT4ge1xuICAvLyBBcnJheSBvZiBwb2tlbW9uc1xuICBjb25zdCBzdGFydGluZ0luZGV4ID0gaXRlbXNDb3VudGVyKCk7XG4gIGNvbnN0IHBva2Vtb25zID0gYXdhaXQgZ2V0UG9rZW1vbnMoc3RhcnRpbmdJbmRleCwgbnVtYmVyT2ZQb2tlbW9ucyk7XG4gIGNvbnN0IG1haW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdtYWluJyk7XG4gIGxldCBjYXJkc0NvbnRhaW5lcjtcblxuICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNhcmRzQ29udGFpbmVyJykpIHtcbiAgICBjYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jYXJkc0NvbnRhaW5lcicpO1xuICB9IGVsc2Uge1xuICAgIGNhcmRzQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndWwnKTtcbiAgICBjYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjYXJkc0NvbnRhaW5lcicpO1xuICAgIG1haW4uYXBwZW5kQ2hpbGQoY2FyZHNDb250YWluZXIpO1xuICB9XG5cbiAgcG9rZW1vbnMuZm9yRWFjaCgocG9rZW1vbikgPT4ge1xuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgIGNhcmQuY2xhc3NMaXN0LmFkZCgnY2FyZCcpO1xuICAgIGNvbnN0IHsgaWQsIG5hbWUgfSA9IHBva2Vtb247XG4gICAgY2FyZC5pZCA9IGBwb2tlbW9uLSR7aWR9YDtcblxuICAgIGNhcmRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGNhcmQpO1xuXG4gICAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgICBpbWFnZS5zcmMgPSBwb2tlbW9uLnNwcml0ZXMub3RoZXIuZHJlYW1fd29ybGQuZnJvbnRfZGVmYXVsdDtcbiAgICBpbWFnZS5hbHQgPSBuYW1lO1xuICAgIGltYWdlLmNsYXNzTGlzdC5hZGQoJ3Bva2Vtb24nKTtcbiAgICBjYXJkLmFwcGVuZENoaWxkKGltYWdlKTtcblxuICAgIGNvbnN0IGluZm8gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBpbmZvLmNsYXNzTGlzdC5hZGQoJ2luZm8nKTtcbiAgICBjb25zdCB0aXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2gyJyk7XG4gICAgdGl0bGUudGV4dENvbnRlbnQgPSBuYW1lO1xuICAgIGluZm8uYXBwZW5kQ2hpbGQodGl0bGUpO1xuXG4gICAgY29uc3QgYnV0dG9uSGVhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBidXR0b25IZWFydC5jbGFzc0xpc3QuYWRkKCdoZWFydCcpO1xuICAgIGNvbnN0IGhlYXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVhcnQuY2xhc3NMaXN0LmFkZCgnaGVhcnQtc2hhcGUnKTtcbiAgICBidXR0b25IZWFydC5hcHBlbmRDaGlsZChoZWFydCk7XG4gICAgaW5mby5hcHBlbmRDaGlsZChidXR0b25IZWFydCk7XG5cbiAgICBjYXJkLmFwcGVuZENoaWxkKGluZm8pO1xuXG4gICAgY29uc3QgbGlrZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XG4gICAgbGlrZXMuY2xhc3NMaXN0LmFkZCgnbGlrZXMnKTtcbiAgICBsaWtlcy50ZXh0Q29udGVudCA9ICcwIExpa2VzJztcblxuICAgIGJ1dHRvbkhlYXJ0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaGVhcnQuY2xhc3NMaXN0LmFkZCgnaGVhcnQtc2hhcGUtYWN0aXZlJyk7XG4gICAgICBjb25zdCBudW1iZXJPZmxpa2VzID0gbGlrZXMudGV4dENvbnRlbnQubWF0Y2gobnVtUmVnZXgpWzBdO1xuICAgICAgbGlrZXMudGV4dENvbnRlbnQgPSBgJHsrbnVtYmVyT2ZsaWtlcyArIDF9IExpa2VzYDtcbiAgICAgIGF3YWl0IGFkZExpa2UoYHBva2Vtb24tJHtpZH1gKTtcbiAgICB9LCB7IG9uY2U6IHRydWUgfSk7XG5cbiAgICBjYXJkLmFwcGVuZENoaWxkKGxpa2VzKTtcblxuICAgIGNvbnN0IGNvbW1lbnRzQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgY29tbWVudHNCdXR0b24uY2xhc3NOYW1lID0gJ2NvbW1lbnRzJztcbiAgICBjb21tZW50c0J1dHRvbi5pZCA9IGlkO1xuICAgIGNvbW1lbnRzQnV0dG9uLnRleHRDb250ZW50ID0gJ0NvbW1lbnRzJztcbiAgICBjYXJkLmFwcGVuZENoaWxkKGNvbW1lbnRzQnV0dG9uKTtcbiAgfSk7XG59O1xuXG5jb25zdCBkaXNwbGF5TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGxpa2VzID0gYXdhaXQgZ2V0TGlrZXMoKTtcbiAgbGlrZXMuZm9yRWFjaCgobGlrZUNvdW50KSA9PiB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCMke2xpa2VDb3VudC5pdGVtX2lkfWApO1xuICAgIGlmIChjYXJkKSB7XG4gICAgICBjb25zdCBsaWtlc0VsZW1lbnQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5saWtlcycpO1xuICAgICAgbGlrZXNFbGVtZW50LnRleHRDb250ZW50ID0gYCR7bGlrZUNvdW50Lmxpa2VzfSBMaWtlc2A7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlDb3VudGVycyA9ICgpID0+IHtcbiAgY29uc3QgcG9rZW1vblRhZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwb2tlbW9uVGFnJyk7XG4gIHBva2Vtb25UYWcudGV4dENvbnRlbnQgPSBgIFBva2Vtb25zICgke2l0ZW1zQ291bnRlcigpfSlgO1xufTtcblxuY29uc3QgYWRkTWVudSA9ICgpID0+IHtcbiAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gIGNvbnN0IG1lbnVJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBtZW51SW1hZ2Uuc3JjID0gTWVudTtcbiAgbWVudUltYWdlLmFsdCA9ICdNZW51IEJ1dHRvbic7XG5cbiAgbWVudS5hcHBlbmRDaGlsZChtZW51SW1hZ2UpO1xuXG4gIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJyk7XG4gIGNvbnN0IGNsb3NlSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgY2xvc2VJbWFnZS5zcmMgPSBDbG9zZTtcbiAgY2xvc2VJbWFnZS5hbHQgPSAnQ2xvc2UgQnV0dG9uJztcblxuICBjbG9zZS5hcHBlbmRDaGlsZChjbG9zZUltYWdlKTtcblxuICBjb25zdCBuYXZDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY2hpbGQnKTtcbiAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBuYXZDaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJywgJ3RydWUnKTtcbiAgfSk7XG4gIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG5hdkNoaWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnLCAnZmFsc2UnKTtcbiAgfSk7XG5cbiAgY29uc3QgcG9rZUxvZ28gPSBuZXcgSW1hZ2UoKTtcbiAgY29uc3QgbG9nbyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNsb2dvJyk7XG4gIHBva2VMb2dvLnNyYyA9IFBva2VMb2dvO1xuICBwb2tlTG9nby5hbHQgPSAnJztcbiAgbG9nby5hcHBlbmRDaGlsZChwb2tlTG9nbyk7XG59O1xuXG5jb25zdCBkaXNwbGF5U2VlTW9yZUJ1dHRvbiA9ICgpID0+IHtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3Qgc2VlTW9yZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICBzZWVNb3JlLmNsYXNzTGlzdC5hZGQoJ3NlZS1tb3JlJyk7XG4gIHNlZU1vcmUuc2V0QXR0cmlidXRlKCd0eXBlJywgJ2J1dHRvbicpO1xuICBzZWVNb3JlLnRleHRDb250ZW50ID0gJ0Rpc3BsYXkgTW9yZSBQb2tlbW9ucyEnO1xuICBtYWluLmFwcGVuZENoaWxkKHNlZU1vcmUpO1xuXG4gIHNlZU1vcmUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgZGlzcGxheVBva2Vtb25zKDEwKTtcbiAgICBhd2FpdCBkaXNwbGF5TGlrZXMoKTtcbiAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICBkaXNwbGF5Q291bnRlcnMoKTtcbiAgfSk7XG59O1xuXG5leHBvcnQge1xuICBkaXNwbGF5UG9rZW1vbnMsXG4gIGRpc3BsYXlMaWtlcyxcbiAgZGlzcGxheUNvdW50ZXJzLFxuICBhZGRNZW51LFxuICBkaXNwbGF5U2VlTW9yZUJ1dHRvbixcbn07IiwiY29uc3QgZ2V0UG9rZW1vbnMgPSBhc3luYyAoc3RhcnRpbmdJbmRleCwgbnVtYmVyT2ZQb2tlbW9ucykgPT4ge1xuICBsZXQgcG9rZW1vbnMgPSBbXTtcbiAgY29uc3QgZmluYWxJbmRleCA9IChzdGFydGluZ0luZGV4ICsgbnVtYmVyT2ZQb2tlbW9ucykgPj0gNTAwID8gNTAwXG4gICAgOiBzdGFydGluZ0luZGV4ICsgbnVtYmVyT2ZQb2tlbW9ucztcbiAgZm9yIChsZXQgaSA9IHN0YXJ0aW5nSW5kZXggKyAxOyBpIDw9IGZpbmFsSW5kZXg7IGkgKz0gMSkge1xuICAgIGNvbnN0IHBva2Vtb24gPSBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aX0vYCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gICAgcG9rZW1vbnMucHVzaChwb2tlbW9uKTtcbiAgfVxuICBwb2tlbW9ucyA9IGF3YWl0IFByb21pc2UuYWxsKHBva2Vtb25zKTtcbiAgcmV0dXJuIHBva2Vtb25zO1xufTtcblxuY29uc3QgZ2V0TGlrZXMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBsaWtlcztcbiAgY29uc3QgdXJsID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL0JlWnI5WGFtTlZPbzMzSzhUUno0L2xpa2VzJztcbiAgdHJ5IHtcbiAgICBsaWtlcyA9IGF3YWl0IGZldGNoKHVybCkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmpzb24oKSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbGlrZXMgPSBbXTtcbiAgfVxuICByZXR1cm4gbGlrZXM7XG59O1xuXG5jb25zdCBhZGRMaWtlID0gYXN5bmMgKGl0ZW1JRCkgPT4ge1xuICBjb25zdCB1cmwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvQmVacjlYYW1OVk9vMzNLOFRSejQvbGlrZXMnO1xuICBjb25zdCBpdGVtID0ge1xuICAgIGl0ZW1faWQ6IGl0ZW1JRCxcbiAgfTtcbiAgYXdhaXQgZmV0Y2godXJsLCB7XG4gICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgYm9keTogSlNPTi5zdHJpbmdpZnkoaXRlbSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UudGV4dCgpKTtcbn07XG5cbmV4cG9ydCB7IGdldFBva2Vtb25zLCBnZXRMaWtlcywgYWRkTGlrZSB9O1xuIiwiZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCBjYXJkcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jYXJkJyk7XG4gIHJldHVybiBjYXJkcy5sZW5ndGg7XG59OyIsImltcG9ydCBYQnV0dG9uIGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9jbG9zZS5zdmcnO1xuaW1wb3J0IHsgZ2V0UG9rZW1vbkNvbW1lbnRzLCBjb21tZW50Q291bnRlciwgYWRkUG9rZW1vbkNvbW1lbnRzIH0gZnJvbSAnLi9jb21tZW50cy5qcyc7XG5cbmNvbnN0IGdldFBva2Vtb25JbmZvID0gYXN5bmMgKGlkKSA9PiB7XG4gIGNvbnN0IGdldEluZm8gPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7aWR9L2ApO1xuICBjb25zdCBqc29uID0gYXdhaXQgZ2V0SW5mby5qc29uKCk7XG4gIHJldHVybiBqc29uO1xufTtcblxuY29uc3QgdXBkYXRlQ29tbWVudHMgPSBhc3luYyAocG9rZW1vbklkKSA9PiB7XG4gIGNvbnN0IGpzb24gPSBhd2FpdCBnZXRQb2tlbW9uQ29tbWVudHMocG9rZW1vbklkKTtcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gdWwnKS5pbm5lckhUTUwgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoICE9PSB1bmRlZmluZWQpIHtcbiAgICBqc29uLmZvckVhY2goKHVzZXIpID0+IHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IGgzJykuaW5uZXJUZXh0ID0gYENvbW1lbnRzICgke2NvbW1lbnRDb3VudGVyKGpzb24pfSlgO1xuICAgICAgY29uc3QgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsaScpO1xuICAgICAgbGkuaW5uZXJUZXh0ID0gYCR7dXNlci5jcmVhdGlvbl9kYXRlfS4gJHt1c2VyLnVzZXJuYW1lfTogJHt1c2VyLmNvbW1lbnR9YDtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IHVsJykuYXBwZW5kQ2hpbGQobGkpO1xuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IGgzJykuaW5uZXJUZXh0ID0gYENvbW1lbnRzICgke2NvbW1lbnRDb3VudGVyKGpzb24pfSlgO1xuICB9XG59O1xuXG5leHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IGJ1dHRvbnMgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbW1lbnRzJyldO1xuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jbG9zZScpO1xuICBjb25zdCB4SW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gIGNvbnN0IGZvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdmb3JtJyk7XG4gIGNvbnN0IG5ld0Zvcm0gPSBmb3JtLmNsb25lTm9kZSh0cnVlKTtcbiAgZm9ybS5wYXJlbnROb2RlLnJlcGxhY2VDaGlsZChuZXdGb3JtLCBmb3JtKTtcbiAgbGV0IHBva2Vtb25JZCA9ICcnO1xuICBjbG9zZS5pbm5lckhUTUwgPSAnJztcbiAgeEltZy5zcmMgPSBYQnV0dG9uO1xuICBjbG9zZS5hcHBlbmRDaGlsZCh4SW1nKTtcbiAgYnV0dG9ucy5mb3JFYWNoKChidXR0b24pID0+IHtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IGV2ZW50LnRhcmdldDtcbiAgICAgIHBva2Vtb25JZCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmlkO1xuICAgICAgZ2V0UG9rZW1vbkluZm8oaWQpLnRoZW4oKGpzb24pID0+IHtcbiAgICAgICAgY29uc3QgaDIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAgPiBoMicpO1xuICAgICAgICBjb25zdCBwQmFzZUV4cGVyaWVuY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYmFzZS1leHBlcmllbmNlJyk7XG4gICAgICAgIGNvbnN0IHBBYmlsaXRpZXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWJpbGl0aWVzJyk7XG4gICAgICAgIGNvbnN0IHBIZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVpZ2h0Jyk7XG4gICAgICAgIGNvbnN0IHBXZWlnaHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcud2VpZ2h0Jyk7XG4gICAgICAgIGNvbnN0IHBNb3ZlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb3ZlcycpO1xuICAgICAgICBjb25zdCBwb2tlbW9uSW1nQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWltZycpO1xuICAgICAgICBjb25zdCBwb2tlbW9uSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuYW1lLFxuICAgICAgICAgIGFiaWxpdGllcyxcbiAgICAgICAgICBoZWlnaHQsXG4gICAgICAgICAgd2VpZ2h0LFxuICAgICAgICAgIG1vdmVzLFxuICAgICAgICB9ID0ganNvbjtcbiAgICAgICAgY29uc3QgYmFzZUV4cGVyaWVuY2UgPSBqc29uLmJhc2VfZXhwZXJpZW5jZTtcbiAgICAgICAgbGV0IHN0cmluZ1dpdGhhYmlsaXRpZXMgPSAnJztcbiAgICAgICAgbGV0IHN0cmluZ1dpdGhNb3ZlcyA9ICcnO1xuICAgICAgICBwb2tlbW9uSW1nLnNyYyA9IGpzb24uc3ByaXRlcy5vdGhlci5kcmVhbV93b3JsZC5mcm9udF9kZWZhdWx0O1xuICAgICAgICBwb2tlbW9uSW1nQ29udGFpbmVyLmFwcGVuZENoaWxkKHBva2Vtb25JbWcpO1xuICAgICAgICBhYmlsaXRpZXMuZm9yRWFjaCgob2JqLCBpbmRleCkgPT4ge1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gYWJpbGl0aWVzLmxlbmd0aCAtIDEpIHtcbiAgICAgICAgICAgIHN0cmluZ1dpdGhhYmlsaXRpZXMgKz0gb2JqLmFiaWxpdHkubmFtZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaW5nV2l0aGFiaWxpdGllcyArPSBgJHtvYmouYWJpbGl0eS5uYW1lfSwgYDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBtb3Zlcy5mb3JFYWNoKChvYmosIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID4gMjApIHJldHVybjtcbiAgICAgICAgICBpZiAoaW5kZXggPT09IDIwKSB7XG4gICAgICAgICAgICBzdHJpbmdXaXRoTW92ZXMgKz0gb2JqLm1vdmUubmFtZTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc3RyaW5nV2l0aE1vdmVzICs9IGAke29iai5tb3ZlLm5hbWV9LCBgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGgyLmlubmVyVGV4dCA9IGAke25hbWV9IGhhczpgO1xuICAgICAgICBwQmFzZUV4cGVyaWVuY2UuaW5uZXJIVE1MID0gYDxzdHJvbmc+QmFzZSBFeHBlcmllbmNlOjwvc3Ryb25nPiAke2Jhc2VFeHBlcmllbmNlfWA7XG4gICAgICAgIHBBYmlsaXRpZXMuaW5uZXJIVE1MID0gYDxzdHJvbmc+QWJpbGl0aWVzOjwvc3Ryb25nPiAke3N0cmluZ1dpdGhhYmlsaXRpZXN9YDtcbiAgICAgICAgcEhlaWdodC5pbm5lckhUTUwgPSBgPHN0cm9uZz5IZWlnaHQ6PC9zdHJvbmc+ICR7aGVpZ2h0fWA7XG4gICAgICAgIHBXZWlnaHQuaW5uZXJIVE1MID0gYDxzdHJvbmc+V2VpZ2h0Ojwvc3Ryb25nPiAke3dlaWdodH1gO1xuICAgICAgICBwTW92ZXMuaW5uZXJIVE1MID0gYDxzdHJvbmc+U29tZSBtb3ZlcyBhcmU6PC9zdHJvbmc+ICR7c3RyaW5nV2l0aE1vdmVzfWA7XG4gICAgICAgIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgICAgICAgICBwb2tlbW9uSW1nQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xuICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IGgzJykuaW5uZXJUZXh0ID0gJyc7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gdWwnKS5pbm5lckhUTUwgPSAnJztcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHVwZGF0ZUNvbW1lbnRzKHBva2Vtb25JZCk7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAnKS5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gICAgfSk7XG4gIH0pO1xuICBuZXdGb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHVzZXJuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3VzZXJuYW1lJyk7XG4gICAgY29uc3QgY29tbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21tZW50Jyk7XG4gICAgY29uc3QgbW9kYWxDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwtY29udGFpbmVyJyk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBhd2FpdCBhZGRQb2tlbW9uQ29tbWVudHMocG9rZW1vbklkLCB1c2VybmFtZS52YWx1ZSwgY29tbWVudC52YWx1ZSk7XG4gICAgYXdhaXQgdXBkYXRlQ29tbWVudHMocG9rZW1vbklkKTtcbiAgICBuZXdGb3JtLnJlc2V0KCk7XG4gICAgbW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIG1vZGFsQ29udGFpbmVyLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgfSwgMjAwMCk7XG4gIH0pO1xufTsiLCJjb25zdCBnZXRQb2tlbW9uQ29tbWVudHMgPSBhc3luYyAocG9rZW1vbklkKSA9PiB7XG4gIGNvbnN0IGpzb24gPSBhd2FpdCBmZXRjaChgaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvQmVacjlYYW1OVk9vMzNLOFRSejQvY29tbWVudHM/aXRlbV9pZD0ke3Bva2Vtb25JZH1gKVxuICAgIC50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgcmV0dXJuIGpzb247XG59O1xuXG5jb25zdCBhZGRQb2tlbW9uQ29tbWVudHMgPSBhc3luYyAocG9rZW1vbklkLCB1c2VybmFtZSwgY29tbWVudCkgPT4ge1xuICBjb25zdCBzZW5kSW5mbyA9IGF3YWl0IGZldGNoKCdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9CZVpyOVhhbU5WT28zM0s4VFJ6NC9jb21tZW50cycsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBpdGVtX2lkOiBwb2tlbW9uSWQsXG4gICAgICB1c2VybmFtZSxcbiAgICAgIGNvbW1lbnQsXG4gICAgfSksXG4gICAgaGVhZGVyczoge1xuICAgICAgJ0NvbnRlbnQtdHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PVVURi04JyxcbiAgICB9LFxuICB9KTtcbiAgY29uc3QganNvbiA9IGF3YWl0IHNlbmRJbmZvLnRleHQoKTtcbiAgcmV0dXJuIGpzb247XG59O1xuXG5jb25zdCBjb21tZW50Q291bnRlciA9IChqc29uKSA9PiB7XG4gIGlmIChqc29uLmxlbmd0aCA9PT0gdW5kZWZpbmVkIHx8IGpzb24ubGVuZ3RoID09PSBudWxsKSByZXR1cm4gMDtcbiAgcmV0dXJuIGpzb24ubGVuZ3RoO1xufTtcblxuZXhwb3J0IHtcbiAgZ2V0UG9rZW1vbkNvbW1lbnRzLFxuICBjb21tZW50Q291bnRlcixcbiAgYWRkUG9rZW1vbkNvbW1lbnRzLFxufTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiL2Nob29zZS15b3VyLXBva2Vtb24vXCI7IiwiLy8gSW5jbHVkZSB5b3VyIGNvZGUgaGVyZVxuaW1wb3J0ICcuL3N0eWxlcy9tYWluLnNjc3MnO1xuaW1wb3J0IHtcbiAgZGlzcGxheVBva2Vtb25zLFxuICBkaXNwbGF5TGlrZXMsXG4gIGRpc3BsYXlDb3VudGVycyxcbiAgYWRkTWVudSxcbiAgZGlzcGxheVNlZU1vcmVCdXR0b24sXG59IGZyb20gJy4vbW9kdWxlcy9nZW5lcmF0b3JzLmpzJztcbmltcG9ydCBkaXNwbGF5UG9wdXAgZnJvbSAnLi9tb2R1bGVzL3BvcHVwLmpzJztcblxud2luZG93Lm9ubG9hZCA9IGFzeW5jICgpID0+IHtcbiAgYXdhaXQgZGlzcGxheVBva2Vtb25zKDIwKTtcbiAgYXdhaXQgZGlzcGxheUxpa2VzKCk7XG4gIGRpc3BsYXlTZWVNb3JlQnV0dG9uKCk7XG4gIGRpc3BsYXlQb3B1cCgpO1xuICBkaXNwbGF5Q291bnRlcnMoKTtcbiAgYWRkTWVudSgpO1xufTtcblxuY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xuY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbmNvbnN0IGxpbmtUYWdzID0gbmF2LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcblxubGlua1RhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gIGNvbnN0IHJlR2V4ID0gLyNbXFx3LV0rL2c7XG4gIHRhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHBhZ2VJZCA9IGV2ZW50LnRhcmdldC5ocmVmLm1hdGNoKHJlR2V4KVswXTtcbiAgICBtYWluLmlubmVySFRNTCA9ICc8aDE+IFBpY2sgeW91ciBGYXZvcml0ZSBQb2tlbW9uISA8L2gxPic7XG4gICAgaWYgKHBhZ2VJZCA9PT0gJyNwb2tlbW9ucycpIHtcbiAgICAgIGF3YWl0IGRpc3BsYXlQb2tlbW9ucygyMCk7XG4gICAgICBhd2FpdCBkaXNwbGF5TGlrZXMoKTtcbiAgICAgIGRpc3BsYXlTZWVNb3JlQnV0dG9uKCk7XG4gICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgIGRpc3BsYXlDb3VudGVycygpO1xuICAgIH1cbiAgICBjb25zdCBuYXZDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY2hpbGQnKTtcbiAgICBuYXZDaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJywgJ2ZhbHNlJyk7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=