/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/flip-box/flip-box.js":
/*!*****************************************!*\
  !*** ./src/blocks/flip-box/flip-box.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const ablocksFlipBox = element => {
  const flipboxWrapper = element.children[0];
  if (!flipboxWrapper) {
    return;
  }

  // query for the theme class to determine if the block is in the FSE theme
  const theme = document.querySelector('.ablocks-is-fse-theme');
  const isFseTheme = theme ? true : false;

  // Destructure the child elements, assuming the front and back elements are at specific positions
  const frontNdBack = flipboxWrapper.querySelectorAll('.ablocks-block--flip-box-child');
  if (!frontNdBack || frontNdBack.length < 2) {
    element.style.pointerEvents = 'none';
    element.style.cursor = 'default';
    return;
  }
  const frontChild = frontNdBack[0].children[0];
  const backChild = frontNdBack[1].children[0];

  // Get the .ablocks-block--flip-box-child element and its width
  const blockFlipBoxChild = element.querySelectorAll('.ablocks-block--flip-box-child');
  // const blockFlipBoxChildWidth = blockFlipBoxChild
  // 	? blockFlipBoxChild.offsetWidth
  // 	: 0;
  // there are two .ablocks-block--flip-box-child elements, so we need to get the width of the largest one
  let blockFlipBoxChildWidth = 0;
  blockFlipBoxChild.forEach(child => {
    const childWidth = child.offsetWidth;
    if (childWidth > blockFlipBoxChildWidth) {
      blockFlipBoxChildWidth = childWidth;
    }
  });

  // Calculate the maximum height of the front and back children
  const frontHeight = frontChild.offsetHeight;
  const backHeight = backChild.offsetHeight;
  const maxHeight = Math.max(frontHeight, backHeight);

  // Calculate the maximum width of the front and back children
  const frontWidth = frontChild.offsetWidth;
  const backWidth = backChild.offsetWidth;
  const maxWidth = Math.max(frontWidth, backWidth);

  // Set the minimum width to be equal to .ablocks-block--flip-box-child if it's larger
  const effectiveWidth = Math.max(maxWidth, blockFlipBoxChildWidth);
  if (!isFseTheme) {
    // set max height to both front and back children
    frontChild.style.height = `${maxHeight}px`;
    backChild.style.height = `${maxHeight}px`;

    // set max width to both front and back children
    frontChild.style.width = `${effectiveWidth}px`;
    backChild.style.width = `${effectiveWidth}px`;
  } else {
    const frontBorder = frontChild.offsetHeight - frontChild.clientHeight;
    const frontBorderWidth = frontChild.offsetWidth - frontChild.clientWidth;

    // Helper function to calculate the total padding of an element
    const getPadding = (e, direction = 'vertical') => {
      const style = window.getComputedStyle(e);
      if (direction === 'vertical') {
        return parseInt(style.paddingTop) + parseInt(style.paddingBottom);
      }
      return parseInt(style.paddingLeft) + parseInt(style.paddingRight);
    };

    // Calculate the padding for both the front and back child elements
    const frontPaddingVertical = getPadding(frontChild, 'vertical');
    const backPaddingVertical = getPadding(backChild, 'vertical');
    const maxPaddingVertical = Math.max(frontPaddingVertical, backPaddingVertical);
    const frontPaddingHorizontal = getPadding(frontChild, 'horizontal');
    const backPaddingHorizontal = getPadding(backChild, 'horizontal');
    const maxPaddingHorizontal = Math.max(frontPaddingHorizontal, backPaddingHorizontal);

    // Helper function to adjust the height and width of an element based on padding differences
    const adjustDimensions = (e, paddingDiffHeight, paddingDiffWidth) => {
      e.style.height = `${maxHeight - frontBorder - maxPaddingVertical + paddingDiffHeight}px`;
      e.style.width = `${effectiveWidth - frontBorderWidth - maxPaddingHorizontal + paddingDiffWidth}px`;
    };

    // Set the adjusted height and width to both the front and back child elements
    adjustDimensions(frontChild, maxPaddingVertical - frontPaddingVertical, maxPaddingHorizontal - frontPaddingHorizontal);
    adjustDimensions(backChild, maxPaddingVertical - backPaddingVertical, maxPaddingHorizontal - backPaddingHorizontal);
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ablocksFlipBox);

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
/*!*************************************!*\
  !*** ./src/blocks/flip-box/view.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _flip_box__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./flip-box */ "./src/blocks/flip-box/flip-box.js");

function initializeFlipBox() {
  const flipBox = document.querySelectorAll('.ablocks-block--flip-box');
  if (flipBox.length) {
    flipBox.forEach(element => {
      (0,_flip_box__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
    });
  }
}
document.addEventListener('DOMContentLoaded', () => {
  initializeFlipBox();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map