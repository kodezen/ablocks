/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/image-comparison/image-comparison.js":
/*!*********************************************************!*\
  !*** ./src/blocks/image-comparison/image-comparison.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksImageComparison {
  constructor(element) {
    this.slider = element;
    if (!this.slider) {
      return;
    }
    this.sliderInput = this.slider.querySelector('[data-ablocks-slider-input]');
    this.moveOnHover = this.slider.getAttribute('data-ablocks-move-on-hover') === 'true';
    this.sliderOrientation = this.slider.getAttribute('data-ablocks-slider-orientation');
    if (this.sliderInput) {
      this.sliderInput.addEventListener('input', e => {
        this.updateSliderPosition(e.target.value);
      });
    }
    if (this.moveOnHover) {
      this.slider.addEventListener('mousemove', e => {
        this.handleMouseMove(e);
      });
    }
  }
  updateSliderPosition(position) {
    const beforeImage = this.slider.querySelector('.ablocks-image-comparison__before-image');
    const sliderLine = this.slider.querySelector('.ablocks-image-comparison__slider-line');
    const sliderIcon = this.slider.querySelector('.ablocks-image-comparison__slider-icon');
    if (this.sliderOrientation === 'horizontal') {
      beforeImage.style.width = position + '%';
      sliderLine.style.left = position + '%';
      sliderIcon.style.left = position + '%';
    } else {
      beforeImage.style.height = position + '%';
      sliderLine.style.top = position + '%';
      sliderIcon.style.top = position + '%';
    }
  }
  handleMouseMove(e) {
    const rect = this.slider.getBoundingClientRect();
    let newValue;
    if (this.sliderOrientation === 'horizontal') {
      const offsetX = e.clientX - rect.left;
      newValue = Math.round(offsetX / rect.width * 100);
    } else {
      const offsetY = e.clientY - rect.top;
      newValue = Math.round(offsetY / rect.height * 100);
    }
    newValue = Math.max(0, Math.min(100, newValue));
    if (this.sliderInput) {
      this.sliderInput.value = newValue;
      this.updateSliderPosition(newValue);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksImageComparison);

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
/*!*********************************************!*\
  !*** ./src/blocks/image-comparison/view.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_comparison__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-comparison */ "./src/blocks/image-comparison/image-comparison.js");

function initImageComparison() {
  const imageComparisons = document.querySelectorAll('[data-ablocks-slider-container]');
  imageComparisons.forEach(imageComparison => {
    new _image_comparison__WEBPACK_IMPORTED_MODULE_0__["default"](imageComparison);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initImageComparison();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map