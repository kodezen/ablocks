/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/form-radio/input.js":
/*!****************************************!*\
  !*** ./src/blocks/form-radio/input.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ablocksInput(element) {
  const inputAllOptions = element?.querySelectorAll('.ablocks-form-builder__radio-all-options .ablocks-form-builder__radio-option');
  if (inputAllOptions) {
    const inputArray = Array.from(inputAllOptions);
    inputArray.forEach(input => {
      input.addEventListener('click', event => {
        const clickInput = input.querySelector('input');
        if (clickInput.type === 'checkbox') {
          // Uncheck all other inputs and remove the checked class
          if (event.target === clickInput) {
            inputArray.forEach(inputItem => {
              if (inputItem.querySelector('input').checked !== true) {
                inputItem.classList.remove('checked');
              }
            });
            if (clickInput.checked === true) {
              input.classList.add('checked');
            } else {
              input.classList.remove('checked');
            }
          } else {
            inputArray.forEach(inputItem => {
              if (inputItem.querySelector('input').checked !== true) {
                inputItem.classList.remove('checked');
              }
            });
            // Check the clicked input and add the checked class
            clickInput.checked = !clickInput.checked;
            if (clickInput.checked === true) {
              input.classList.add('checked');
            } else {
              input.classList.remove('checked');
            }
          }
        } else if (clickInput.type === 'radio') {
          if (event.target === clickInput) {
            inputArray.forEach(inputItem => {
              inputItem.classList.remove('checked');
            });
            if (clickInput.checked === true) {
              input.classList.add('checked');
            }
          } else {
            inputArray.forEach(inputItem => {
              inputItem.classList.remove('checked');
            });
            clickInput.checked = !clickInput.checked;
            if (clickInput.checked === true) {
              input.classList.add('checked');
            }
          }
        }
      });
    });
  }
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
/*!***************************************!*\
  !*** ./src/blocks/form-radio/view.js ***!
  \***************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _input__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./input */ "./src/blocks/form-radio/input.js");

// Function to initialize ablocksInput for each .ablocks-block--input element
function initializeInput() {
  const inputElements = document.querySelectorAll('.ablocks-form-builder__radio-field');
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