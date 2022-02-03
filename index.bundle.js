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
/* harmony export */   "addMenu": () => (/* binding */ addMenu)
/* harmony export */ });
/* harmony import */ var _APIhandling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _assets_icons_hamburger_svg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _assets_icons_close_svg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);





const numRegex = /\d+/;
// Display Home page
const displayPokemons = async () => {
  // Array of pokemons
  const pokemons = await (0,_APIhandling_js__WEBPACK_IMPORTED_MODULE_0__.getPokemons)();
  const main = document.querySelector('main');
  const cardsContainer = document.createElement('ul');
  cardsContainer.classList.add('cardsContainer');
  main.appendChild(cardsContainer);

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
    const likesElement = card.querySelector('.likes');
    likesElement.textContent = `${likeCount.likes} Likes`;
  });
};

const displayCounters = () => {
  const tags = document.querySelectorAll('a');
  tags.forEach((tag) => {
    if (tag.textContent.trim() === 'Pokemons') {
      tag.textContent = ` Pokemons (${(0,_util_js__WEBPACK_IMPORTED_MODULE_1__["default"])()})`;
    }
  });
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
const getPokemons = async () => {
  let pokemons = [];
  for (let i = 1; i <= 20; i += 1) {
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
  form.addEventListener('submit', async (event) => {
    const username = document.getElementById('username');
    const comment = document.getElementById('comment');
    const modalContainer = document.querySelector('.modal-container');
    event.preventDefault();
    await (0,_comments_js__WEBPACK_IMPORTED_MODULE_1__.addPokemonComments)(pokemonId, username.value, comment.value);
    await updateComments(pokemonId);
    form.reset();
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
  await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemons)();
  await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayLikes)();
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
      await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayPokemons)();
      await (0,_modules_generators_js__WEBPACK_IMPORTED_MODULE_1__.displayLikes)();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0EsVUFBVSxnRUFBa0I7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0gsQ0FBQzs7Ozs7Ozs7Ozs7O0FDdkdEO0FBQ0EsNElBQTRJLFVBQVU7QUFDdEo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0EseUNBQXlDO0FBQ3pDLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDekJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOzs7Ozs7Ozs7OztBQ0FBO0FBQzRCO0FBTUs7QUFDYTs7QUFFOUM7QUFDQSxRQUFRLHVFQUFlO0FBQ3ZCLFFBQVEsb0VBQVk7QUFDcEIsRUFBRSw2REFBWTtBQUNkLEVBQUUsdUVBQWU7QUFDakIsRUFBRSwrREFBTztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksdUVBQWU7QUFDM0IsWUFBWSxvRUFBWTtBQUN4QixNQUFNLDZEQUFZO0FBQ2xCLE1BQU0sdUVBQWU7QUFDckI7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9zdHlsZXMvbWFpbi5zY3NzPzRjNTUiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy9nZW5lcmF0b3JzLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvQVBJaGFuZGxpbmcuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy91dGlsLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvcG9wdXAuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvbW9kdWxlcy9jb21tZW50cy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiaW1wb3J0IHsgZ2V0UG9rZW1vbnMsIGdldExpa2VzLCBhZGRMaWtlIH0gZnJvbSAnLi9BUEloYW5kbGluZy5qcyc7XG5pbXBvcnQgaXRlbXNDb3VudGVyIGZyb20gJy4vdXRpbC5qcyc7XG5pbXBvcnQgTWVudSBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvaGFtYnVyZ2VyLnN2Zyc7XG5pbXBvcnQgQ2xvc2UgZnJvbSAnLi4vLi4vYXNzZXRzL2ljb25zL2Nsb3NlLnN2Zyc7XG5cbmNvbnN0IG51bVJlZ2V4ID0gL1xcZCsvO1xuLy8gRGlzcGxheSBIb21lIHBhZ2VcbmNvbnN0IGRpc3BsYXlQb2tlbW9ucyA9IGFzeW5jICgpID0+IHtcbiAgLy8gQXJyYXkgb2YgcG9rZW1vbnNcbiAgY29uc3QgcG9rZW1vbnMgPSBhd2FpdCBnZXRQb2tlbW9ucygpO1xuICBjb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuICBjb25zdCBjYXJkc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3VsJyk7XG4gIGNhcmRzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoJ2NhcmRzQ29udGFpbmVyJyk7XG4gIG1haW4uYXBwZW5kQ2hpbGQoY2FyZHNDb250YWluZXIpO1xuXG4gIHBva2Vtb25zLmZvckVhY2goKHBva2Vtb24pID0+IHtcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICBjYXJkLmNsYXNzTGlzdC5hZGQoJ2NhcmQnKTtcbiAgICBjb25zdCB7IGlkLCBuYW1lIH0gPSBwb2tlbW9uO1xuICAgIGNhcmQuaWQgPSBgcG9rZW1vbi0ke2lkfWA7XG5cbiAgICBjYXJkc0NvbnRhaW5lci5hcHBlbmRDaGlsZChjYXJkKTtcblxuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uuc3JjID0gcG9rZW1vbi5zcHJpdGVzLm90aGVyLmRyZWFtX3dvcmxkLmZyb250X2RlZmF1bHQ7XG4gICAgaW1hZ2UuYWx0ID0gbmFtZTtcbiAgICBpbWFnZS5jbGFzc0xpc3QuYWRkKCdwb2tlbW9uJyk7XG4gICAgY2FyZC5hcHBlbmRDaGlsZChpbWFnZSk7XG5cbiAgICBjb25zdCBpbmZvID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaW5mby5jbGFzc0xpc3QuYWRkKCdpbmZvJyk7XG4gICAgY29uc3QgdGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdoMicpO1xuICAgIHRpdGxlLnRleHRDb250ZW50ID0gbmFtZTtcbiAgICBpbmZvLmFwcGVuZENoaWxkKHRpdGxlKTtcblxuICAgIGNvbnN0IGJ1dHRvbkhlYXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYnV0dG9uJyk7XG4gICAgYnV0dG9uSGVhcnQuY2xhc3NMaXN0LmFkZCgnaGVhcnQnKTtcbiAgICBjb25zdCBoZWFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYXJ0LmNsYXNzTGlzdC5hZGQoJ2hlYXJ0LXNoYXBlJyk7XG4gICAgYnV0dG9uSGVhcnQuYXBwZW5kQ2hpbGQoaGVhcnQpO1xuICAgIGluZm8uYXBwZW5kQ2hpbGQoYnV0dG9uSGVhcnQpO1xuXG4gICAgY2FyZC5hcHBlbmRDaGlsZChpbmZvKTtcblxuICAgIGNvbnN0IGxpa2VzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xuICAgIGxpa2VzLmNsYXNzTGlzdC5hZGQoJ2xpa2VzJyk7XG4gICAgbGlrZXMudGV4dENvbnRlbnQgPSAnMCBMaWtlcyc7XG5cbiAgICBidXR0b25IZWFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGhlYXJ0LmNsYXNzTGlzdC5hZGQoJ2hlYXJ0LXNoYXBlLWFjdGl2ZScpO1xuICAgICAgY29uc3QgbnVtYmVyT2ZsaWtlcyA9IGxpa2VzLnRleHRDb250ZW50Lm1hdGNoKG51bVJlZ2V4KVswXTtcbiAgICAgIGxpa2VzLnRleHRDb250ZW50ID0gYCR7K251bWJlck9mbGlrZXMgKyAxfSBMaWtlc2A7XG4gICAgICBhd2FpdCBhZGRMaWtlKGBwb2tlbW9uLSR7aWR9YCk7XG4gICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xuXG4gICAgY2FyZC5hcHBlbmRDaGlsZChsaWtlcyk7XG5cbiAgICBjb25zdCBjb21tZW50c0J1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGNvbW1lbnRzQnV0dG9uLmNsYXNzTmFtZSA9ICdjb21tZW50cyc7XG4gICAgY29tbWVudHNCdXR0b24uaWQgPSBpZDtcbiAgICBjb21tZW50c0J1dHRvbi50ZXh0Q29udGVudCA9ICdDb21tZW50cyc7XG4gICAgY2FyZC5hcHBlbmRDaGlsZChjb21tZW50c0J1dHRvbik7XG4gIH0pO1xufTtcblxuY29uc3QgZGlzcGxheUxpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBsaWtlcyA9IGF3YWl0IGdldExpa2VzKCk7XG4gIGxpa2VzLmZvckVhY2goKGxpa2VDb3VudCkgPT4ge1xuICAgIGNvbnN0IGNhcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjJHtsaWtlQ291bnQuaXRlbV9pZH1gKTtcbiAgICBjb25zdCBsaWtlc0VsZW1lbnQgPSBjYXJkLnF1ZXJ5U2VsZWN0b3IoJy5saWtlcycpO1xuICAgIGxpa2VzRWxlbWVudC50ZXh0Q29udGVudCA9IGAke2xpa2VDb3VudC5saWtlc30gTGlrZXNgO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlDb3VudGVycyA9ICgpID0+IHtcbiAgY29uc3QgdGFncyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2EnKTtcbiAgdGFncy5mb3JFYWNoKCh0YWcpID0+IHtcbiAgICBpZiAodGFnLnRleHRDb250ZW50LnRyaW0oKSA9PT0gJ1Bva2Vtb25zJykge1xuICAgICAgdGFnLnRleHRDb250ZW50ID0gYCBQb2tlbW9ucyAoJHtpdGVtc0NvdW50ZXIoKX0pYDtcbiAgICB9XG4gIH0pO1xufTtcblxuY29uc3QgYWRkTWVudSA9ICgpID0+IHtcbiAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51Jyk7XG4gIGNvbnN0IG1lbnVJbWFnZSA9IG5ldyBJbWFnZSgpO1xuICBtZW51SW1hZ2Uuc3JjID0gTWVudTtcbiAgbWVudUltYWdlLmFsdCA9ICdNZW51IEJ1dHRvbic7XG5cbiAgbWVudS5hcHBlbmRDaGlsZChtZW51SW1hZ2UpO1xuXG4gIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNsb3NlJyk7XG4gIGNvbnN0IGNsb3NlSW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgY2xvc2VJbWFnZS5zcmMgPSBDbG9zZTtcbiAgY2xvc2VJbWFnZS5hbHQgPSAnQ2xvc2UgQnV0dG9uJztcblxuICBjbG9zZS5hcHBlbmRDaGlsZChjbG9zZUltYWdlKTtcblxuICBjb25zdCBuYXZDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY2hpbGQnKTtcbiAgbWVudS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBuYXZDaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJywgJ3RydWUnKTtcbiAgfSk7XG4gIGNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgIG5hdkNoaWxkLnNldEF0dHJpYnV0ZSgnZGF0YS1hY3RpdmUnLCAnZmFsc2UnKTtcbiAgfSk7XG59O1xuXG5leHBvcnQge1xuICBkaXNwbGF5UG9rZW1vbnMsXG4gIGRpc3BsYXlMaWtlcyxcbiAgZGlzcGxheUNvdW50ZXJzLFxuICBhZGRNZW51LFxufTsiLCJjb25zdCBnZXRQb2tlbW9ucyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IHBva2Vtb25zID0gW107XG4gIGZvciAobGV0IGkgPSAxOyBpIDw9IDIwOyBpICs9IDEpIHtcbiAgICBjb25zdCBwb2tlbW9uID0gZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2l9L2ApLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICAgIHBva2Vtb25zLnB1c2gocG9rZW1vbik7XG4gIH1cbiAgcG9rZW1vbnMgPSBhd2FpdCBQcm9taXNlLmFsbChwb2tlbW9ucyk7XG4gIHJldHVybiBwb2tlbW9ucztcbn07XG5cbmNvbnN0IGdldExpa2VzID0gYXN5bmMgKCkgPT4ge1xuICBsZXQgbGlrZXM7XG4gIGNvbnN0IHVybCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9CZVpyOVhhbU5WT28zM0s4VFJ6NC9saWtlcyc7XG4gIHRyeSB7XG4gICAgbGlrZXMgPSBhd2FpdCBmZXRjaCh1cmwpLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxpa2VzID0gW107XG4gIH1cbiAgcmV0dXJuIGxpa2VzO1xufTtcblxuY29uc3QgYWRkTGlrZSA9IGFzeW5jIChpdGVtSUQpID0+IHtcbiAgY29uc3QgdXJsID0gJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL0JlWnI5WGFtTlZPbzMzSzhUUno0L2xpa2VzJztcbiAgY29uc3QgaXRlbSA9IHtcbiAgICBpdGVtX2lkOiBpdGVtSUQsXG4gIH07XG4gIGF3YWl0IGZldGNoKHVybCwge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KGl0ZW0pLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdDb250ZW50LXR5cGUnOiAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD1VVEYtOCcsXG4gICAgfSxcbiAgfSkudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLnRleHQoKSk7XG59O1xuXG5leHBvcnQgeyBnZXRQb2tlbW9ucywgZ2V0TGlrZXMsIGFkZExpa2UgfTtcbiIsImV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgY2FyZHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY2FyZCcpO1xuICByZXR1cm4gY2FyZHMubGVuZ3RoO1xufTsiLCJpbXBvcnQgWEJ1dHRvbiBmcm9tICcuLi8uLi9hc3NldHMvaWNvbnMvY2xvc2Uuc3ZnJztcbmltcG9ydCB7IGdldFBva2Vtb25Db21tZW50cywgY29tbWVudENvdW50ZXIsIGFkZFBva2Vtb25Db21tZW50cyB9IGZyb20gJy4vY29tbWVudHMuanMnO1xuXG5jb25zdCBnZXRQb2tlbW9uSW5mbyA9IGFzeW5jIChpZCkgPT4ge1xuICBjb25zdCBnZXRJbmZvID0gYXdhaXQgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2lkfS9gKTtcbiAgY29uc3QganNvbiA9IGF3YWl0IGdldEluZm8uanNvbigpO1xuICByZXR1cm4ganNvbjtcbn07XG5cbmNvbnN0IHVwZGF0ZUNvbW1lbnRzID0gYXN5bmMgKHBva2Vtb25JZCkgPT4ge1xuICBjb25zdCBqc29uID0gYXdhaXQgZ2V0UG9rZW1vbkNvbW1lbnRzKHBva2Vtb25JZCk7XG4gIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cC1jb21tZW50cyA+IHVsJykuaW5uZXJIVE1MID0gJyc7XG4gIGlmIChqc29uLmxlbmd0aCAhPT0gdW5kZWZpbmVkKSB7XG4gICAganNvbi5mb3JFYWNoKCh1c2VyKSA9PiB7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY29tbWVudHMgPiBoMycpLmlubmVyVGV4dCA9IGBDb21tZW50cyAoJHtjb21tZW50Q291bnRlcihqc29uKX0pYDtcbiAgICAgIGNvbnN0IGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGknKTtcbiAgICAgIGxpLmlubmVyVGV4dCA9IGAke3VzZXIuY3JlYXRpb25fZGF0ZX0uICR7dXNlci51c2VybmFtZX06ICR7dXNlci5jb21tZW50fWA7XG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY29tbWVudHMgPiB1bCcpLmFwcGVuZENoaWxkKGxpKTtcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY29tbWVudHMgPiBoMycpLmlubmVyVGV4dCA9IGBDb21tZW50cyAoJHtjb21tZW50Q291bnRlcihqc29uKX0pYDtcbiAgfVxufTtcblxuZXhwb3J0IGRlZmF1bHQgKCkgPT4ge1xuICBjb25zdCBidXR0b25zID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5jb21tZW50cycpXTtcbiAgY29uc3QgY2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY2xvc2UnKTtcbiAgY29uc3QgeEltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICBjb25zdCBmb3JtID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignZm9ybScpO1xuICBsZXQgcG9rZW1vbklkID0gJyc7XG4gIGNsb3NlLmlubmVySFRNTCA9ICcnO1xuICB4SW1nLnNyYyA9IFhCdXR0b247XG4gIGNsb3NlLmFwcGVuZENoaWxkKHhJbWcpO1xuICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyBpZCB9ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgcG9rZW1vbklkID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQ7XG4gICAgICBnZXRQb2tlbW9uSW5mbyhpZCkudGhlbigoanNvbikgPT4ge1xuICAgICAgICBjb25zdCBoMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCA+IGgyJyk7XG4gICAgICAgIGNvbnN0IHBCYXNlRXhwZXJpZW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXNlLWV4cGVyaWVuY2UnKTtcbiAgICAgICAgY29uc3QgcEFiaWxpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYmlsaXRpZXMnKTtcbiAgICAgICAgY29uc3QgcEhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWlnaHQnKTtcbiAgICAgICAgY29uc3QgcFdlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWlnaHQnKTtcbiAgICAgICAgY29uc3QgcE1vdmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVzJyk7XG4gICAgICAgIGNvbnN0IHBva2Vtb25JbWdDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtaW1nJyk7XG4gICAgICAgIGNvbnN0IHBva2Vtb25JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWJpbGl0aWVzLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB3ZWlnaHQsXG4gICAgICAgICAgbW92ZXMsXG4gICAgICAgIH0gPSBqc29uO1xuICAgICAgICBjb25zdCBiYXNlRXhwZXJpZW5jZSA9IGpzb24uYmFzZV9leHBlcmllbmNlO1xuICAgICAgICBsZXQgc3RyaW5nV2l0aGFiaWxpdGllcyA9ICcnO1xuICAgICAgICBsZXQgc3RyaW5nV2l0aE1vdmVzID0gJyc7XG4gICAgICAgIHBva2Vtb25JbWcuc3JjID0ganNvbi5zcHJpdGVzLm90aGVyLmRyZWFtX3dvcmxkLmZyb250X2RlZmF1bHQ7XG4gICAgICAgIHBva2Vtb25JbWdDb250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vbkltZyk7XG4gICAgICAgIGFiaWxpdGllcy5mb3JFYWNoKChvYmosIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBhYmlsaXRpZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgc3RyaW5nV2l0aGFiaWxpdGllcyArPSBvYmouYWJpbGl0eS5uYW1lO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpbmdXaXRoYWJpbGl0aWVzICs9IGAke29iai5hYmlsaXR5Lm5hbWV9LCBgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1vdmVzLmZvckVhY2goKG9iaiwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPiAyMCkgcmV0dXJuO1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gMjApIHtcbiAgICAgICAgICAgIHN0cmluZ1dpdGhNb3ZlcyArPSBvYmoubW92ZS5uYW1lO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpbmdXaXRoTW92ZXMgKz0gYCR7b2JqLm1vdmUubmFtZX0sIGA7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaDIuaW5uZXJUZXh0ID0gYCR7bmFtZX0gaGFzOmA7XG4gICAgICAgIHBCYXNlRXhwZXJpZW5jZS5pbm5lckhUTUwgPSBgPHN0cm9uZz5CYXNlIEV4cGVyaWVuY2U6PC9zdHJvbmc+ICR7YmFzZUV4cGVyaWVuY2V9YDtcbiAgICAgICAgcEFiaWxpdGllcy5pbm5lckhUTUwgPSBgPHN0cm9uZz5BYmlsaXRpZXM6PC9zdHJvbmc+ICR7c3RyaW5nV2l0aGFiaWxpdGllc31gO1xuICAgICAgICBwSGVpZ2h0LmlubmVySFRNTCA9IGA8c3Ryb25nPkhlaWdodDo8L3N0cm9uZz4gJHtoZWlnaHR9YDtcbiAgICAgICAgcFdlaWdodC5pbm5lckhUTUwgPSBgPHN0cm9uZz5XZWlnaHQ6PC9zdHJvbmc+ICR7d2VpZ2h0fWA7XG4gICAgICAgIHBNb3Zlcy5pbm5lckhUTUwgPSBgPHN0cm9uZz5Tb21lIG1vdmVzIGFyZTo8L3N0cm9uZz4gJHtzdHJpbmdXaXRoTW92ZXN9YDtcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICAgIHBva2Vtb25JbWdDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gaDMnKS5pbm5lclRleHQgPSAnJztcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY29tbWVudHMgPiB1bCcpLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdXBkYXRlQ29tbWVudHMocG9rZW1vbklkKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICB9KTtcbiAgfSk7XG4gIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKTtcbiAgICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQnKTtcbiAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250YWluZXInKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGF3YWl0IGFkZFBva2Vtb25Db21tZW50cyhwb2tlbW9uSWQsIHVzZXJuYW1lLnZhbHVlLCBjb21tZW50LnZhbHVlKTtcbiAgICBhd2FpdCB1cGRhdGVDb21tZW50cyhwb2tlbW9uSWQpO1xuICAgIGZvcm0ucmVzZXQoKTtcbiAgICBtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9LCAyMDAwKTtcbiAgfSk7XG59OyIsImNvbnN0IGdldFBva2Vtb25Db21tZW50cyA9IGFzeW5jIChwb2tlbW9uSWQpID0+IHtcbiAgY29uc3QganNvbiA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9CZVpyOVhhbU5WT28zM0s4VFJ6NC9jb21tZW50cz9pdGVtX2lkPSR7cG9rZW1vbklkfWApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICByZXR1cm4ganNvbjtcbn07XG5cbmNvbnN0IGFkZFBva2Vtb25Db21tZW50cyA9IGFzeW5jIChwb2tlbW9uSWQsIHVzZXJuYW1lLCBjb21tZW50KSA9PiB7XG4gIGNvbnN0IHNlbmRJbmZvID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL0JlWnI5WGFtTlZPbzMzSzhUUno0L2NvbW1lbnRzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IHBva2Vtb25JZCxcbiAgICAgIHVzZXJuYW1lLFxuICAgICAgY29tbWVudCxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBqc29uID0gYXdhaXQgc2VuZEluZm8udGV4dCgpO1xuICByZXR1cm4ganNvbjtcbn07XG5cbmNvbnN0IGNvbW1lbnRDb3VudGVyID0gKGpzb24pID0+IHtcbiAgaWYgKGpzb24ubGVuZ3RoID09PSB1bmRlZmluZWQgfHwganNvbi5sZW5ndGggPT09IG51bGwpIHJldHVybiAwO1xuICByZXR1cm4ganNvbi5sZW5ndGg7XG59O1xuXG5leHBvcnQge1xuICBnZXRQb2tlbW9uQ29tbWVudHMsXG4gIGNvbW1lbnRDb3VudGVyLFxuICBhZGRQb2tlbW9uQ29tbWVudHMsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvY2hvb3NlLXlvdXItcG9rZW1vbi9cIjsiLCIvLyBJbmNsdWRlIHlvdXIgY29kZSBoZXJlXG5pbXBvcnQgJy4vc3R5bGVzL21haW4uc2Nzcyc7XG5pbXBvcnQge1xuICBkaXNwbGF5UG9rZW1vbnMsXG4gIGRpc3BsYXlMaWtlcyxcbiAgZGlzcGxheUNvdW50ZXJzLFxuICBhZGRNZW51LFxufSBmcm9tICcuL21vZHVsZXMvZ2VuZXJhdG9ycy5qcyc7XG5pbXBvcnQgZGlzcGxheVBvcHVwIGZyb20gJy4vbW9kdWxlcy9wb3B1cC5qcyc7XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGRpc3BsYXlQb2tlbW9ucygpO1xuICBhd2FpdCBkaXNwbGF5TGlrZXMoKTtcbiAgZGlzcGxheVBvcHVwKCk7XG4gIGRpc3BsYXlDb3VudGVycygpO1xuICBhZGRNZW51KCk7XG59O1xuXG5jb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuY29uc3QgbGlua1RhZ3MgPSBuYXYucXVlcnlTZWxlY3RvckFsbCgnYScpO1xubGlua1RhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gIGNvbnN0IHJlR2V4ID0gLyNbXFx3LV0rL2c7XG4gIHRhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHBhZ2VJZCA9IGV2ZW50LnRhcmdldC5ocmVmLm1hdGNoKHJlR2V4KVswXTtcbiAgICBtYWluLmlubmVySFRNTCA9ICc8aDE+IFBpY2sgeW91ciBGYXZvcml0ZSBQb2tlbW9uISA8L2gxPic7XG4gICAgaWYgKHBhZ2VJZCA9PT0gJyNwb2tlbW9ucycpIHtcbiAgICAgIGF3YWl0IGRpc3BsYXlQb2tlbW9ucygpO1xuICAgICAgYXdhaXQgZGlzcGxheUxpa2VzKCk7XG4gICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgIGRpc3BsYXlDb3VudGVycygpO1xuICAgIH1cbiAgICBjb25zdCBuYXZDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY2hpbGQnKTtcbiAgICBuYXZDaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJywgJ2ZhbHNlJyk7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=