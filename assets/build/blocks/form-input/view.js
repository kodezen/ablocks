/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/form-input/input.js":
/*!****************************************!*\
  !*** ./src/blocks/form-input/input.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__);

function ablocksInput(element) {
  const input = element?.querySelector('.ablocks-form-builder__input');
  const checkRequired = element?.getAttribute('data-required');
  const inputType = input?.getAttribute('type');

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

  // Function to validate email
  const validateEmail = value => {
    return emailRegex.test(value);
  };
  const validateUrl = value => {
    return urlRegex.test(value);
  };
  if (input) {
    // Handle required field validation
    if (checkRequired === 'true') {
      input?.addEventListener('focusout', () => {
        if (input.value.trim() === '') {
          element.classList.add('error-msg');
          const errorDiv = element.querySelector('.ablocks-block-error-msg');
          if (errorDiv) {
            errorDiv.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This field is required', 'ablocks');
          }
        } else if (inputType === 'email' && !validateEmail(input.value.trim())) {
          // Handle invalid email
          element.classList.add('error-msg');
          const errorDiv = element.querySelector('.ablocks-block-error-msg');
          if (errorDiv) {
            errorDiv.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Please enter a valid Email', 'ablocks');
          }
        } else if (inputType === 'url' && !validateUrl(input.value.trim())) {
          // Handle invalid URL
          element.classList.add('error-msg');
          const errorDiv = element.querySelector('.ablocks-block-error-msg');
          if (errorDiv) {
            errorDiv.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Please enter a valid URL', 'ablocks');
          }
        }
      });
    }
    input?.addEventListener('input', () => {
      if (input.value.trim() !== '') {
        if (inputType === 'email' && !validateEmail(input.value.trim())) {
          // Keep error if email is invalid
          element.classList.add('error-msg');
          const errorDiv = element.querySelector('.ablocks-block-error-msg');
          if (errorDiv) {
            errorDiv.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Please enter a valid Email', 'ablocks');
          }
        } else if (inputType === 'url' && !validateUrl(input.value.trim())) {
          // Keep error if URL is invalid
          element.classList.add('error-msg');
          const errorDiv = element.querySelector('.ablocks-block-error-msg');
          if (errorDiv) {
            errorDiv.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('Please enter a valid URL', 'ablocks');
          }
        } else {
          // Remove error if input is valid
          element.classList.remove('error-msg');
          const errorDiv = element.querySelector('.ablocks-block-error-msg');
          if (errorDiv) {
            errorDiv.textContent = checkRequired === 'true' ? (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This field is required', 'ablocks') : '';
          }
        }
      } else if (checkRequired === 'true') {
        element.classList.add('error-msg');
        const errorDiv = element.querySelector('.ablocks-block-error-msg');
        if (errorDiv) {
          errorDiv.textContent = (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_0__.__)('This field is required', 'ablocks');
        }
      } else {
        element.classList.remove('error-msg');
      }
    });
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ablocksInput);

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/*!***************************************!*\
  !*** ./src/blocks/form-input/view.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/blocks/form-input/input.js");

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