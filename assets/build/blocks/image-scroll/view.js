/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/image-scroll/image-scroll.js":
/*!*************************************************!*\
  !*** ./src/blocks/image-scroll/image-scroll.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABlocksImageScroll)
/* harmony export */ });
class ABlocksImageScroll {
  constructor(element) {
    this.imageScroll = element;
    this.imageContainer = this.imageScroll.querySelector('.ablocks-block-container');
    this.imageContainerWidth = this.imageContainer.getBoundingClientRect().width;
    this.imageFigure = this.imageScroll.querySelector('.ablocks-image-scroll__figure');
    this.scrollOption = this.imageFigure.getAttribute('data-scroll-option');

    // Handle both number and JSON string formats for scrollHeight
    const scrollHeightAttr = this.imageFigure.getAttribute('data-scroll-height');
    try {
      const parsed = JSON.parse(scrollHeightAttr);
      this.scrollHeight = typeof parsed === 'object' ? parsed.value : parsed;
    } catch (e) {
      this.scrollHeight = parseInt(scrollHeightAttr) || 0;
    }
    this.transitionTime = parseInt(this.imageFigure.getAttribute('data-transition-time'));

    // Check if image element exists
    this.image = this.imageScroll.querySelector('.ablocks-image-scroll__figure img');
    if (!this.image) {
      return; // Exit early if the image is not found
    }
    this.imageSize = null;
    this.imageWidth = null;

    // Handle image load event
    this.image.onload = () => this.onImageLoad();
    if (this.image.complete) {
      this.onImageLoad();
    }

    // Apply initial transition time
    this.imageFigure.style.transitionDuration = `${this.transitionTime}s`;

    // Handle mouse enter/leave events
    this.imageScroll.addEventListener('mouseenter', () => this.handleMouseEnter());
    this.imageScroll.addEventListener('mouseleave', () => this.handleMouseLeave());
  }
  onImageLoad() {
    this.imageSize = this.image.offsetHeight;
    this.imageWidth = this.image.offsetWidth;

    // Apply transformations based on scroll option
    this.applyTransformations();
  }
  applyTransformations() {
    switch (this.scrollOption) {
      case 'mouse-scroll':
      case 'horizontal-scroll':
        this.imageFigure.style.transform = 'translateX(0) translateY(0)';
        break;
      case 'bottom-to-top':
        const bottomHeight = this.imageSize - this.scrollHeight;
        this.imageFigure.style.transform = `translateY(${-Math.max(bottomHeight, 0)}px)`;
        break;
      case 'right-to-left':
        const width = this.imageContainerWidth - this.imageWidth;
        this.imageFigure.style.transform = `translateX(${width}px)`;
        break;
      default:
        break;
    }
  }
  handleMouseEnter() {
    switch (this.scrollOption) {
      case 'mouse-scroll':
      case 'horizontal-scroll':
        this.imageFigure.style.transform = 'translateX(0) translateY(0)';
        break;
      case 'top-to-bottom':
        const topHeight = Math.max(this.imageSize - this.scrollHeight, 0);
        this.imageFigure.style.transform = `translateY(${-topHeight}px)`;
        break;
      case 'bottom-to-top':
        this.imageFigure.style.transform = 'translateY(0)';
        break;
      case 'left-to-right':
        const width = this.imageContainerWidth - this.imageWidth;
        this.imageFigure.style.transform = `translateX(${width}px)`;
        break;
      case 'right-to-left':
        this.imageFigure.style.transform = 'translateX(0)';
        break;
      default:
        break;
    }
  }
  handleMouseLeave() {
    switch (this.scrollOption) {
      case 'mouse-scroll':
      case 'horizontal-scroll':
        this.imageFigure.style.transform = 'translateX(0) translateY(0)';
        break;
      case 'top-to-bottom':
        this.imageFigure.style.transform = 'translateY(0)';
        break;
      case 'bottom-to-top':
        const bottomHeight = this.imageSize - this.scrollHeight;
        this.imageFigure.style.transform = `translateY(${-Math.max(bottomHeight, 0)}px)`;
        break;
      case 'left-to-right':
        this.imageFigure.style.transform = 'translateX(0)';
        break;
      case 'right-to-left':
        const width = this.imageContainerWidth - this.imageWidth;
        this.imageFigure.style.transform = `translateX(${width}px)`;
        break;
      default:
        break;
    }
  }

  // Optionally, you could use a method to notify when the image has loaded
  imageLoaded() {
    return new Promise(resolve => {
      if (this.imageSize) {
        resolve(this.imageSize); // If the size is already set, resolve immediately
      } else {
        this.image.onload = () => {
          resolve(this.image.offsetHeight);
        };
      }
    });
  }
}

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
/*!*****************************************!*\
  !*** ./src/blocks/image-scroll/view.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-scroll */ "./src/blocks/image-scroll/image-scroll.js");

function initializeContentTimeline() {
  const accordionElements = document.querySelectorAll('.ablocks-block--image-scroll');
  accordionElements.forEach(element => {
    new _image_scroll__WEBPACK_IMPORTED_MODULE_0__["default"](element, false);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeContentTimeline();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map