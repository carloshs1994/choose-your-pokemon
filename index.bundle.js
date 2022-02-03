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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVUsZ0VBQWtCO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILENBQUM7Ozs7Ozs7Ozs7OztBQ3pHRDtBQUNBLDRJQUE0SSxVQUFVO0FBQ3RKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLHlDQUF5QztBQUN6QyxLQUFLO0FBQ0wsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ3pCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7V0NOQTs7Ozs7Ozs7Ozs7QUNBQTtBQUM0QjtBQU1LO0FBQ2E7O0FBRTlDO0FBQ0EsUUFBUSx1RUFBZTtBQUN2QixRQUFRLG9FQUFZO0FBQ3BCLEVBQUUsNkRBQVk7QUFDZCxFQUFFLHVFQUFlO0FBQ2pCLEVBQUUsK0RBQU87QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLHVFQUFlO0FBQzNCLFlBQVksb0VBQVk7QUFDeEIsTUFBTSw2REFBWTtBQUNsQixNQUFNLHVFQUFlO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlLy4vc3JjL3NjcmlwdHMvc3R5bGVzL21haW4uc2Nzcz80YzU1Iiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvZ2VuZXJhdG9ycy5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9tb2R1bGVzL0FQSWhhbmRsaW5nLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvdXRpbC5qcyIsIndlYnBhY2s6Ly93ZWJwYWNrdGVtcGxhdGUvLi9zcmMvc2NyaXB0cy9tb2R1bGVzL3BvcHVwLmpzIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL21vZHVsZXMvY29tbWVudHMuanMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFja3RlbXBsYXRlL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL3dlYnBhY2t0ZW1wbGF0ZS8uL3NyYy9zY3JpcHRzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsImltcG9ydCB7IGdldFBva2Vtb25zLCBnZXRMaWtlcywgYWRkTGlrZSB9IGZyb20gJy4vQVBJaGFuZGxpbmcuanMnO1xuaW1wb3J0IGl0ZW1zQ291bnRlciBmcm9tICcuL3V0aWwuanMnO1xuaW1wb3J0IE1lbnUgZnJvbSAnLi4vLi4vYXNzZXRzL2ljb25zL2hhbWJ1cmdlci5zdmcnO1xuaW1wb3J0IENsb3NlIGZyb20gJy4uLy4uL2Fzc2V0cy9pY29ucy9jbG9zZS5zdmcnO1xuXG5jb25zdCBudW1SZWdleCA9IC9cXGQrLztcbi8vIERpc3BsYXkgSG9tZSBwYWdlXG5jb25zdCBkaXNwbGF5UG9rZW1vbnMgPSBhc3luYyAoKSA9PiB7XG4gIC8vIEFycmF5IG9mIHBva2Vtb25zXG4gIGNvbnN0IHBva2Vtb25zID0gYXdhaXQgZ2V0UG9rZW1vbnMoKTtcbiAgY29uc3QgbWFpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ21haW4nKTtcbiAgY29uc3QgY2FyZHNDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd1bCcpO1xuICBjYXJkc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjYXJkc0NvbnRhaW5lcicpO1xuICBtYWluLmFwcGVuZENoaWxkKGNhcmRzQ29udGFpbmVyKTtcblxuICBwb2tlbW9ucy5mb3JFYWNoKChwb2tlbW9uKSA9PiB7XG4gICAgY29uc3QgY2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgY2FyZC5jbGFzc0xpc3QuYWRkKCdjYXJkJyk7XG4gICAgY29uc3QgeyBpZCwgbmFtZSB9ID0gcG9rZW1vbjtcbiAgICBjYXJkLmlkID0gYHBva2Vtb24tJHtpZH1gO1xuXG4gICAgY2FyZHNDb250YWluZXIuYXBwZW5kQ2hpbGQoY2FyZCk7XG5cbiAgICBjb25zdCBpbWFnZSA9IG5ldyBJbWFnZSgpO1xuICAgIGltYWdlLnNyYyA9IHBva2Vtb24uc3ByaXRlcy5vdGhlci5kcmVhbV93b3JsZC5mcm9udF9kZWZhdWx0O1xuICAgIGltYWdlLmFsdCA9IG5hbWU7XG4gICAgaW1hZ2UuY2xhc3NMaXN0LmFkZCgncG9rZW1vbicpO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQoaW1hZ2UpO1xuXG4gICAgY29uc3QgaW5mbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGluZm8uY2xhc3NMaXN0LmFkZCgnaW5mbycpO1xuICAgIGNvbnN0IHRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaDInKTtcbiAgICB0aXRsZS50ZXh0Q29udGVudCA9IG5hbWU7XG4gICAgaW5mby5hcHBlbmRDaGlsZCh0aXRsZSk7XG5cbiAgICBjb25zdCBidXR0b25IZWFydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2J1dHRvbicpO1xuICAgIGJ1dHRvbkhlYXJ0LmNsYXNzTGlzdC5hZGQoJ2hlYXJ0Jyk7XG4gICAgY29uc3QgaGVhcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFydC5jbGFzc0xpc3QuYWRkKCdoZWFydC1zaGFwZScpO1xuICAgIGJ1dHRvbkhlYXJ0LmFwcGVuZENoaWxkKGhlYXJ0KTtcbiAgICBpbmZvLmFwcGVuZENoaWxkKGJ1dHRvbkhlYXJ0KTtcblxuICAgIGNhcmQuYXBwZW5kQ2hpbGQoaW5mbyk7XG5cbiAgICBjb25zdCBsaWtlcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcbiAgICBsaWtlcy5jbGFzc0xpc3QuYWRkKCdsaWtlcycpO1xuICAgIGxpa2VzLnRleHRDb250ZW50ID0gJzAgTGlrZXMnO1xuXG4gICAgYnV0dG9uSGVhcnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBhc3luYyAoKSA9PiB7XG4gICAgICBoZWFydC5jbGFzc0xpc3QuYWRkKCdoZWFydC1zaGFwZS1hY3RpdmUnKTtcbiAgICAgIGNvbnN0IG51bWJlck9mbGlrZXMgPSBsaWtlcy50ZXh0Q29udGVudC5tYXRjaChudW1SZWdleClbMF07XG4gICAgICBsaWtlcy50ZXh0Q29udGVudCA9IGAkeytudW1iZXJPZmxpa2VzICsgMX0gTGlrZXNgO1xuICAgICAgYXdhaXQgYWRkTGlrZShgcG9rZW1vbi0ke2lkfWApO1xuICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcblxuICAgIGNhcmQuYXBwZW5kQ2hpbGQobGlrZXMpO1xuXG4gICAgY29uc3QgY29tbWVudHNCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdidXR0b24nKTtcbiAgICBjb21tZW50c0J1dHRvbi5jbGFzc05hbWUgPSAnY29tbWVudHMnO1xuICAgIGNvbW1lbnRzQnV0dG9uLmlkID0gaWQ7XG4gICAgY29tbWVudHNCdXR0b24udGV4dENvbnRlbnQgPSAnQ29tbWVudHMnO1xuICAgIGNhcmQuYXBwZW5kQ2hpbGQoY29tbWVudHNCdXR0b24pO1xuICB9KTtcbn07XG5cbmNvbnN0IGRpc3BsYXlMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgY29uc3QgbGlrZXMgPSBhd2FpdCBnZXRMaWtlcygpO1xuICBsaWtlcy5mb3JFYWNoKChsaWtlQ291bnQpID0+IHtcbiAgICBjb25zdCBjYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgIyR7bGlrZUNvdW50Lml0ZW1faWR9YCk7XG4gICAgY29uc3QgbGlrZXNFbGVtZW50ID0gY2FyZC5xdWVyeVNlbGVjdG9yKCcubGlrZXMnKTtcbiAgICBsaWtlc0VsZW1lbnQudGV4dENvbnRlbnQgPSBgJHtsaWtlQ291bnQubGlrZXN9IExpa2VzYDtcbiAgfSk7XG59O1xuXG5jb25zdCBkaXNwbGF5Q291bnRlcnMgPSAoKSA9PiB7XG4gIGNvbnN0IHRhZ3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhJyk7XG4gIHRhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gICAgaWYgKHRhZy50ZXh0Q29udGVudC50cmltKCkgPT09ICdQb2tlbW9ucycpIHtcbiAgICAgIHRhZy50ZXh0Q29udGVudCA9IGAgUG9rZW1vbnMgKCR7aXRlbXNDb3VudGVyKCl9KWA7XG4gICAgfVxuICB9KTtcbn07XG5cbmNvbnN0IGFkZE1lbnUgPSAoKSA9PiB7XG4gIGNvbnN0IG1lbnUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudScpO1xuICBjb25zdCBtZW51SW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgbWVudUltYWdlLnNyYyA9IE1lbnU7XG4gIG1lbnVJbWFnZS5hbHQgPSAnTWVudSBCdXR0b24nO1xuXG4gIG1lbnUuYXBwZW5kQ2hpbGQobWVudUltYWdlKTtcblxuICBjb25zdCBjbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbG9zZScpO1xuICBjb25zdCBjbG9zZUltYWdlID0gbmV3IEltYWdlKCk7XG4gIGNsb3NlSW1hZ2Uuc3JjID0gQ2xvc2U7XG4gIGNsb3NlSW1hZ2UuYWx0ID0gJ0Nsb3NlIEJ1dHRvbic7XG5cbiAgY2xvc2UuYXBwZW5kQ2hpbGQoY2xvc2VJbWFnZSk7XG5cbiAgY29uc3QgbmF2Q2hpbGQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2LWNoaWxkJyk7XG4gIG1lbnUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgbmF2Q2hpbGQuc2V0QXR0cmlidXRlKCdkYXRhLWFjdGl2ZScsICd0cnVlJyk7XG4gIH0pO1xuICBjbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICBuYXZDaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJywgJ2ZhbHNlJyk7XG4gIH0pO1xufTtcblxuZXhwb3J0IHtcbiAgZGlzcGxheVBva2Vtb25zLFxuICBkaXNwbGF5TGlrZXMsXG4gIGRpc3BsYXlDb3VudGVycyxcbiAgYWRkTWVudSxcbn07IiwiY29uc3QgZ2V0UG9rZW1vbnMgPSBhc3luYyAoKSA9PiB7XG4gIGxldCBwb2tlbW9ucyA9IFtdO1xuICBmb3IgKGxldCBpID0gMTsgaSA8PSAyMDsgaSArPSAxKSB7XG4gICAgY29uc3QgcG9rZW1vbiA9IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpfS9gKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgICBwb2tlbW9ucy5wdXNoKHBva2Vtb24pO1xuICB9XG4gIHBva2Vtb25zID0gYXdhaXQgUHJvbWlzZS5hbGwocG9rZW1vbnMpO1xuICByZXR1cm4gcG9rZW1vbnM7XG59O1xuXG5jb25zdCBnZXRMaWtlcyA9IGFzeW5jICgpID0+IHtcbiAgbGV0IGxpa2VzO1xuICBjb25zdCB1cmwgPSAnaHR0cHM6Ly91cy1jZW50cmFsMS1pbnZvbHZlbWVudC1hcGkuY2xvdWRmdW5jdGlvbnMubmV0L2NhcHN0b25lQXBpL2FwcHMvQmVacjlYYW1OVk9vMzNLOFRSejQvbGlrZXMnO1xuICB0cnkge1xuICAgIGxpa2VzID0gYXdhaXQgZmV0Y2godXJsKS50aGVuKChyZXNwb25zZSkgPT4gcmVzcG9uc2UuanNvbigpKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsaWtlcyA9IFtdO1xuICB9XG4gIHJldHVybiBsaWtlcztcbn07XG5cbmNvbnN0IGFkZExpa2UgPSBhc3luYyAoaXRlbUlEKSA9PiB7XG4gIGNvbnN0IHVybCA9ICdodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9CZVpyOVhhbU5WT28zM0s4VFJ6NC9saWtlcyc7XG4gIGNvbnN0IGl0ZW0gPSB7XG4gICAgaXRlbV9pZDogaXRlbUlELFxuICB9O1xuICBhd2FpdCBmZXRjaCh1cmwsIHtcbiAgICBtZXRob2Q6ICdQT1NUJyxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeShpdGVtKSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gIH0pLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS50ZXh0KCkpO1xufTtcblxuZXhwb3J0IHsgZ2V0UG9rZW1vbnMsIGdldExpa2VzLCBhZGRMaWtlIH07XG4iLCJleHBvcnQgZGVmYXVsdCAoKSA9PiB7XG4gIGNvbnN0IGNhcmRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNhcmQnKTtcbiAgcmV0dXJuIGNhcmRzLmxlbmd0aDtcbn07IiwiaW1wb3J0IFhCdXR0b24gZnJvbSAnLi4vLi4vYXNzZXRzL2ljb25zL2Nsb3NlLnN2Zyc7XG5pbXBvcnQgeyBnZXRQb2tlbW9uQ29tbWVudHMsIGNvbW1lbnRDb3VudGVyLCBhZGRQb2tlbW9uQ29tbWVudHMgfSBmcm9tICcuL2NvbW1lbnRzLmpzJztcblxuY29uc3QgZ2V0UG9rZW1vbkluZm8gPSBhc3luYyAoaWQpID0+IHtcbiAgY29uc3QgZ2V0SW5mbyA9IGF3YWl0IGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHtpZH0vYCk7XG4gIGNvbnN0IGpzb24gPSBhd2FpdCBnZXRJbmZvLmpzb24oKTtcbiAgcmV0dXJuIGpzb247XG59O1xuXG5jb25zdCB1cGRhdGVDb21tZW50cyA9IGFzeW5jIChwb2tlbW9uSWQpID0+IHtcbiAgY29uc3QganNvbiA9IGF3YWl0IGdldFBva2Vtb25Db21tZW50cyhwb2tlbW9uSWQpO1xuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY29tbWVudHMgPiB1bCcpLmlubmVySFRNTCA9ICcnO1xuICBpZiAoanNvbi5sZW5ndGggIT09IHVuZGVmaW5lZCkge1xuICAgIGpzb24uZm9yRWFjaCgodXNlcikgPT4ge1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gaDMnKS5pbm5lclRleHQgPSBgQ29tbWVudHMgKCR7Y29tbWVudENvdW50ZXIoanNvbil9KWA7XG4gICAgICBjb25zdCBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xpJyk7XG4gICAgICBsaS5pbm5lclRleHQgPSBgJHt1c2VyLmNyZWF0aW9uX2RhdGV9LiAke3VzZXIudXNlcm5hbWV9OiAke3VzZXIuY29tbWVudH1gO1xuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gdWwnKS5hcHBlbmRDaGlsZChsaSk7XG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gaDMnKS5pbm5lclRleHQgPSBgQ29tbWVudHMgKCR7Y29tbWVudENvdW50ZXIoanNvbil9KWA7XG4gIH1cbn07XG5cbmV4cG9ydCBkZWZhdWx0ICgpID0+IHtcbiAgY29uc3QgYnV0dG9ucyA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29tbWVudHMnKV07XG4gIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNsb3NlJyk7XG4gIGNvbnN0IHhJbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgY29uc3QgZm9ybSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2Zvcm0nKTtcbiAgY29uc3QgbmV3Rm9ybSA9IGZvcm0uY2xvbmVOb2RlKHRydWUpO1xuICBmb3JtLnBhcmVudE5vZGUucmVwbGFjZUNoaWxkKG5ld0Zvcm0sIGZvcm0pO1xuICBsZXQgcG9rZW1vbklkID0gJyc7XG4gIGNsb3NlLmlubmVySFRNTCA9ICcnO1xuICB4SW1nLnNyYyA9IFhCdXR0b247XG4gIGNsb3NlLmFwcGVuZENoaWxkKHhJbWcpO1xuICBidXR0b25zLmZvckVhY2goKGJ1dHRvbikgPT4ge1xuICAgIGJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xuICAgICAgY29uc3QgeyBpZCB9ID0gZXZlbnQudGFyZ2V0O1xuICAgICAgcG9rZW1vbklkID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuaWQ7XG4gICAgICBnZXRQb2tlbW9uSW5mbyhpZCkudGhlbigoanNvbikgPT4ge1xuICAgICAgICBjb25zdCBoMiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCA+IGgyJyk7XG4gICAgICAgIGNvbnN0IHBCYXNlRXhwZXJpZW5jZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5iYXNlLWV4cGVyaWVuY2UnKTtcbiAgICAgICAgY29uc3QgcEFiaWxpdGllcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hYmlsaXRpZXMnKTtcbiAgICAgICAgY29uc3QgcEhlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWlnaHQnKTtcbiAgICAgICAgY29uc3QgcFdlaWdodCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy53ZWlnaHQnKTtcbiAgICAgICAgY29uc3QgcE1vdmVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vdmVzJyk7XG4gICAgICAgIGNvbnN0IHBva2Vtb25JbWdDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtaW1nJyk7XG4gICAgICAgIGNvbnN0IHBva2Vtb25JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgICAgY29uc3Qge1xuICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgYWJpbGl0aWVzLFxuICAgICAgICAgIGhlaWdodCxcbiAgICAgICAgICB3ZWlnaHQsXG4gICAgICAgICAgbW92ZXMsXG4gICAgICAgIH0gPSBqc29uO1xuICAgICAgICBjb25zdCBiYXNlRXhwZXJpZW5jZSA9IGpzb24uYmFzZV9leHBlcmllbmNlO1xuICAgICAgICBsZXQgc3RyaW5nV2l0aGFiaWxpdGllcyA9ICcnO1xuICAgICAgICBsZXQgc3RyaW5nV2l0aE1vdmVzID0gJyc7XG4gICAgICAgIHBva2Vtb25JbWcuc3JjID0ganNvbi5zcHJpdGVzLm90aGVyLmRyZWFtX3dvcmxkLmZyb250X2RlZmF1bHQ7XG4gICAgICAgIHBva2Vtb25JbWdDb250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vbkltZyk7XG4gICAgICAgIGFiaWxpdGllcy5mb3JFYWNoKChvYmosIGluZGV4KSA9PiB7XG4gICAgICAgICAgaWYgKGluZGV4ID09PSBhYmlsaXRpZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgc3RyaW5nV2l0aGFiaWxpdGllcyArPSBvYmouYWJpbGl0eS5uYW1lO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpbmdXaXRoYWJpbGl0aWVzICs9IGAke29iai5hYmlsaXR5Lm5hbWV9LCBgO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIG1vdmVzLmZvckVhY2goKG9iaiwgaW5kZXgpID0+IHtcbiAgICAgICAgICBpZiAoaW5kZXggPiAyMCkgcmV0dXJuO1xuICAgICAgICAgIGlmIChpbmRleCA9PT0gMjApIHtcbiAgICAgICAgICAgIHN0cmluZ1dpdGhNb3ZlcyArPSBvYmoubW92ZS5uYW1lO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzdHJpbmdXaXRoTW92ZXMgKz0gYCR7b2JqLm1vdmUubmFtZX0sIGA7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaDIuaW5uZXJUZXh0ID0gYCR7bmFtZX0gaGFzOmA7XG4gICAgICAgIHBCYXNlRXhwZXJpZW5jZS5pbm5lckhUTUwgPSBgPHN0cm9uZz5CYXNlIEV4cGVyaWVuY2U6PC9zdHJvbmc+ICR7YmFzZUV4cGVyaWVuY2V9YDtcbiAgICAgICAgcEFiaWxpdGllcy5pbm5lckhUTUwgPSBgPHN0cm9uZz5BYmlsaXRpZXM6PC9zdHJvbmc+ICR7c3RyaW5nV2l0aGFiaWxpdGllc31gO1xuICAgICAgICBwSGVpZ2h0LmlubmVySFRNTCA9IGA8c3Ryb25nPkhlaWdodDo8L3N0cm9uZz4gJHtoZWlnaHR9YDtcbiAgICAgICAgcFdlaWdodC5pbm5lckhUTUwgPSBgPHN0cm9uZz5XZWlnaHQ6PC9zdHJvbmc+ICR7d2VpZ2h0fWA7XG4gICAgICAgIHBNb3Zlcy5pbm5lckhUTUwgPSBgPHN0cm9uZz5Tb21lIG1vdmVzIGFyZTo8L3N0cm9uZz4gJHtzdHJpbmdXaXRoTW92ZXN9YDtcbiAgICAgICAgY2xvc2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwJykuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdycpO1xuICAgICAgICAgIHBva2Vtb25JbWdDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XG4gICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBvcHVwLWNvbW1lbnRzID4gaDMnKS5pbm5lclRleHQgPSAnJztcbiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9wdXAtY29tbWVudHMgPiB1bCcpLmlubmVySFRNTCA9ICcnO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgdXBkYXRlQ29tbWVudHMocG9rZW1vbklkKTtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb3B1cCcpLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKTtcbiAgICB9KTtcbiAgfSk7XG4gIG5ld0Zvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgY29uc3QgdXNlcm5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndXNlcm5hbWUnKTtcbiAgICBjb25zdCBjb21tZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbW1lbnQnKTtcbiAgICBjb25zdCBtb2RhbENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tb2RhbC1jb250YWluZXInKTtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGF3YWl0IGFkZFBva2Vtb25Db21tZW50cyhwb2tlbW9uSWQsIHVzZXJuYW1lLnZhbHVlLCBjb21tZW50LnZhbHVlKTtcbiAgICBhd2FpdCB1cGRhdGVDb21tZW50cyhwb2tlbW9uSWQpO1xuICAgIG5ld0Zvcm0ucmVzZXQoKTtcbiAgICBtb2RhbENvbnRhaW5lci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgbW9kYWxDb250YWluZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICB9LCAyMDAwKTtcbiAgfSk7XG59OyIsImNvbnN0IGdldFBva2Vtb25Db21tZW50cyA9IGFzeW5jIChwb2tlbW9uSWQpID0+IHtcbiAgY29uc3QganNvbiA9IGF3YWl0IGZldGNoKGBodHRwczovL3VzLWNlbnRyYWwxLWludm9sdmVtZW50LWFwaS5jbG91ZGZ1bmN0aW9ucy5uZXQvY2Fwc3RvbmVBcGkvYXBwcy9CZVpyOVhhbU5WT28zM0s4VFJ6NC9jb21tZW50cz9pdGVtX2lkPSR7cG9rZW1vbklkfWApXG4gICAgLnRoZW4oKHJlc3BvbnNlKSA9PiByZXNwb25zZS5qc29uKCkpO1xuICByZXR1cm4ganNvbjtcbn07XG5cbmNvbnN0IGFkZFBva2Vtb25Db21tZW50cyA9IGFzeW5jIChwb2tlbW9uSWQsIHVzZXJuYW1lLCBjb21tZW50KSA9PiB7XG4gIGNvbnN0IHNlbmRJbmZvID0gYXdhaXQgZmV0Y2goJ2h0dHBzOi8vdXMtY2VudHJhbDEtaW52b2x2ZW1lbnQtYXBpLmNsb3VkZnVuY3Rpb25zLm5ldC9jYXBzdG9uZUFwaS9hcHBzL0JlWnI5WGFtTlZPbzMzSzhUUno0L2NvbW1lbnRzJywge1xuICAgIG1ldGhvZDogJ1BPU1QnLFxuICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgIGl0ZW1faWQ6IHBva2Vtb25JZCxcbiAgICAgIHVzZXJuYW1lLFxuICAgICAgY29tbWVudCxcbiAgICB9KSxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAnQ29udGVudC10eXBlJzogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9VVRGLTgnLFxuICAgIH0sXG4gIH0pO1xuICBjb25zdCBqc29uID0gYXdhaXQgc2VuZEluZm8udGV4dCgpO1xuICByZXR1cm4ganNvbjtcbn07XG5cbmNvbnN0IGNvbW1lbnRDb3VudGVyID0gKGpzb24pID0+IHtcbiAgaWYgKGpzb24ubGVuZ3RoID09PSB1bmRlZmluZWQgfHwganNvbi5sZW5ndGggPT09IG51bGwpIHJldHVybiAwO1xuICByZXR1cm4ganNvbi5sZW5ndGg7XG59O1xuXG5leHBvcnQge1xuICBnZXRQb2tlbW9uQ29tbWVudHMsXG4gIGNvbW1lbnRDb3VudGVyLFxuICBhZGRQb2tlbW9uQ29tbWVudHMsXG59OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCIvY2hvb3NlLXlvdXItcG9rZW1vbi9cIjsiLCIvLyBJbmNsdWRlIHlvdXIgY29kZSBoZXJlXG5pbXBvcnQgJy4vc3R5bGVzL21haW4uc2Nzcyc7XG5pbXBvcnQge1xuICBkaXNwbGF5UG9rZW1vbnMsXG4gIGRpc3BsYXlMaWtlcyxcbiAgZGlzcGxheUNvdW50ZXJzLFxuICBhZGRNZW51LFxufSBmcm9tICcuL21vZHVsZXMvZ2VuZXJhdG9ycy5qcyc7XG5pbXBvcnQgZGlzcGxheVBvcHVwIGZyb20gJy4vbW9kdWxlcy9wb3B1cC5qcyc7XG5cbndpbmRvdy5vbmxvYWQgPSBhc3luYyAoKSA9PiB7XG4gIGF3YWl0IGRpc3BsYXlQb2tlbW9ucygpO1xuICBhd2FpdCBkaXNwbGF5TGlrZXMoKTtcbiAgZGlzcGxheVBvcHVwKCk7XG4gIGRpc3BsYXlDb3VudGVycygpO1xuICBhZGRNZW51KCk7XG59O1xuXG5jb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XG5jb25zdCBtYWluID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignbWFpbicpO1xuY29uc3QgbGlua1RhZ3MgPSBuYXYucXVlcnlTZWxlY3RvckFsbCgnYScpO1xubGlua1RhZ3MuZm9yRWFjaCgodGFnKSA9PiB7XG4gIGNvbnN0IHJlR2V4ID0gLyNbXFx3LV0rL2c7XG4gIHRhZy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGFzeW5jIChldmVudCkgPT4ge1xuICAgIGNvbnN0IHBhZ2VJZCA9IGV2ZW50LnRhcmdldC5ocmVmLm1hdGNoKHJlR2V4KVswXTtcbiAgICBtYWluLmlubmVySFRNTCA9ICc8aDE+IFBpY2sgeW91ciBGYXZvcml0ZSBQb2tlbW9uISA8L2gxPic7XG4gICAgaWYgKHBhZ2VJZCA9PT0gJyNwb2tlbW9ucycpIHtcbiAgICAgIGF3YWl0IGRpc3BsYXlQb2tlbW9ucygpO1xuICAgICAgYXdhaXQgZGlzcGxheUxpa2VzKCk7XG4gICAgICBkaXNwbGF5UG9wdXAoKTtcbiAgICAgIGRpc3BsYXlDb3VudGVycygpO1xuICAgIH1cbiAgICBjb25zdCBuYXZDaGlsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYtY2hpbGQnKTtcbiAgICBuYXZDaGlsZC5zZXRBdHRyaWJ1dGUoJ2RhdGEtYWN0aXZlJywgJ2ZhbHNlJyk7XG4gIH0pO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=