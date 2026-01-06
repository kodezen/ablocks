/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/toggle/toggle.js":
/*!*************************************!*\
  !*** ./src/blocks/toggle/toggle.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ablocksToggle = element => {
  const childElements = element.querySelectorAll('.ablocks-block--toggle-child');
  const toggleBtn = element.querySelector('.ablocks-toggle__checkbox');
  const leftLabel = element?.querySelector('.ablocks-toggle__label--left');
  const rightLabel = element?.querySelector('.ablocks-toggle__label--right');
  toggleBtn.onchange = event => handleToggle(event.target.checked);
  const handleToggle = currentSwitch => {
    if (!currentSwitch) {
      childElements[0].classList.add('ablocks-block--toggle-child--active');
      childElements[1].classList.remove('ablocks-block--toggle-child--active');
      leftLabel.classList.add('ablocks-toggle__label--active');
      rightLabel.classList.remove('ablocks-toggle__label--active');
    } else {
      childElements[1].classList.add('ablocks-block--toggle-child--active');
      childElements[0].classList.remove('ablocks-block--toggle-child--active');
      leftLabel.classList.remove('ablocks-toggle__label--active');
      rightLabel.classList.add('ablocks-toggle__label--active');
    }
  };
  handleToggle(toggleBtn.checked);
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ablocksToggle);

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
/*!***********************************!*\
  !*** ./src/blocks/toggle/view.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _toggle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./toggle */ "./src/blocks/toggle/toggle.js");

function initializeCounters() {
  const toggleElements = document.querySelectorAll('.ablocks-block--toggle');
  toggleElements.forEach(element => {
    (0,_toggle__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  });
}

// Initialize counters when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeCounters();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map