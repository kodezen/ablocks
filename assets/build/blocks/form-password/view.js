/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/form-password/input.js":
/*!*******************************************!*\
  !*** ./src/blocks/form-password/input.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ablocksInput(element) {
  const input = element?.querySelector('.ablocks-form-builder__input');
  const toggleShowPassword = element?.querySelector('.ablocks-form-builder__input-toggle--show-password');
  const toggleHidePassword = element?.querySelector('.ablocks-form-builder__input-toggle--hide-password');
  const checkRequired = element?.getAttribute('data-required');
  if (input && checkRequired === 'true') {
    input?.addEventListener('focusout', () => {
      if (input?.value.trim() === '') {
        element?.classList.add('error-msg');
      }
    });
  }
  input?.addEventListener('input', () => {
    if (input.value.trim() !== '') {
      element?.classList.remove('error-msg');
    }
  });
  function toggle(passwordShow) {
    if (!toggleHidePassword && !toggleShowPassword) {
      return;
    }
    if (passwordShow) {
      input.type = 'password';
      toggleShowPassword?.classList.add('ablocks-form-builder__input-toggle--show-password--active');
      toggleHidePassword?.classList.remove('ablocks-form-builder__input-toggle--hide-password--active');
    } else {
      input.type = 'text';
      toggleShowPassword?.classList.remove('ablocks-form-builder__input-toggle--show-password--active');
      toggleHidePassword?.classList.add('ablocks-form-builder__input-toggle--hide-password--active');
    }
  }
  if (toggleShowPassword) {
    toggleShowPassword.addEventListener('click', () => toggle(false));
  }
  if (toggleHidePassword) {
    toggleHidePassword.addEventListener('click', () => toggle(true));
  }
  toggle(true);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ablocksInput);

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
/*!******************************************!*\
  !*** ./src/blocks/form-password/view.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/blocks/form-password/input.js");

// Function to initialize ablocksInput for each .ablocks-block--input element
function initializeInput() {
  const inputElements = document.querySelectorAll('.ablocks-form-builder__field');
  inputElements.forEach(element => {
    (0,_input__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  });
}

// Initialize Input when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  initializeInput();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map