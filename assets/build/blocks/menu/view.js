/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/menu/nav.js":
/*!********************************!*\
  !*** ./src/blocks/menu/nav.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksNav {
  constructor(element, isFrontend = false) {
    this.element = element;
    const menuDevice = element?.getAttribute('data-menu-device');
    this.menuDevice = menuDevice;
    this.menu = element?.querySelector(`.ablocks-menu-${menuDevice}`);
    this.newMenu = this.menu?.cloneNode(true);
    this.mainMenu = this.newMenu?.querySelector('.ablocks-main-menu');
    this.initMenuTriggers(isFrontend);
    this.initMenuItems(isFrontend);
    this.editorDiv = document?.querySelector('.interface-navigable-region.interface-interface-skeleton__content');
  }
  initMenuTriggers(isFrontend) {
    const toggleButton = this.element?.querySelector(`.ablocks-menu-${this.menuDevice}__trigger`);
    this.toggleButton = toggleButton;
    toggleButton?.addEventListener('click', () => this.toggleMenu(isFrontend));
  }
  initMenuItems(isFrontend) {
    if (!isFrontend || !this.mainMenu) {
      return;
    }
    const menuItems = this.mainMenu?.querySelectorAll('.ablocks-menu-item');
    menuItems.forEach(menuItem => {
      menuItem?.addEventListener('click', event => {
        event.stopPropagation();
        this.toggleMenuItem(menuItem, event);
      });
    });
  }
  toggleMenuItem(menuItem, event) {
    if (!event.target.closest('.ablocks-menu-child-mega')) {
      menuItem.classList.toggle('ablocks-sub-menu--active');
    }
  }
  toggleMenu = isFrontend => {
    const newMenu = this.newMenu;
    const toggleButtonRect = this.toggleButton.getBoundingClientRect();
    if (!isFrontend) {
      this.menu.classList.toggle(`ablocks-menu-${this.menuDevice}--active`);
    }
    newMenu.style.position = 'absolute';
    newMenu.style.top = `${toggleButtonRect.bottom + window.scrollY}px`;
    newMenu.style.right = `${window.innerWidth - toggleButtonRect.right}px`;
    newMenu.classList.add('ablocks-menu--outside');
    newMenu?.classList.toggle(`ablocks-menu-${this.menuDevice}--active`);
    if (isFrontend) {
      document.body.appendChild(newMenu);
    }
  };
  toggleSubMenu(subMenu) {
    subMenu.classList.toggle('ablocks-menu-child-sub--active');
  }
  toggleMegaMenu(megaMenu, event) {
    if (!event.target.closest('.ablocks-menu-child-mega--active')) {
      megaMenu.classList.toggle('ablocks-menu-child-mega--active');
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksNav);

/***/ })

/******/ 	});
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./src/blocks/menu/view.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _nav__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./nav */ "./src/blocks/menu/nav.js");

function initializeMenu() {
  const menuElements = document.querySelectorAll('.ablocks-block--menu');
  menuElements.forEach(element => {
    new _nav__WEBPACK_IMPORTED_MODULE_0__["default"](element, true);
  });
}

// Initialize counters when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeMenu();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map