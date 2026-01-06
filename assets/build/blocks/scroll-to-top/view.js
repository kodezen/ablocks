/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/scroll-to-top/scroll.js":
/*!********************************************!*\
  !*** ./src/blocks/scroll-to-top/scroll.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ScrollToTop {
  constructor(element, isFrontend) {
    this.element = element;
    this.isFrontend = isFrontend;
    this.scrollTarget = isFrontend ? window : document.querySelector('[name="editor-canvas"]')?.contentWindow;
    this.circle = this.element?.querySelector('.ablocks-scroll-progress-ring__circle');
    this.scrollButton = this.element?.querySelector('.ablocks-scroll-progress-wrapper, .ablocks-scroll-to-top-button-text, .ablocks-icon-wrap');
    this.setupCircle();
    this.init();
  }
  setupCircle() {
    if (!this.circle) {
      return;
    }
    this.radius = this.circle.r.baseVal.value;
    this.circumference = 2 * Math.PI * this.radius;
    Object.assign(this.circle.style, {
      strokeDasharray: `${this.circumference} ${this.circumference}`,
      strokeDashoffset: this.circumference,
      transform: 'rotate(-90deg)',
      transformOrigin: '50% 50%'
    });
  }
  init() {
    if (!this.element || !this.scrollTarget) {
      return;
    }
    this.scrollTarget.addEventListener('scroll', () => this.updateProgress());
    this.scrollButton?.addEventListener('click', () => {
      this.scrollTarget.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
    this.updateProgress(); // initial state
  }
  updateProgress() {
    if (!this.scrollTarget?.document) {
      return;
    }
    const {
      document,
      innerHeight,
      scrollY
    } = this.scrollTarget;
    const docHeight = document.documentElement.scrollHeight - innerHeight;
    const scrollTop = scrollY !== null && scrollY !== void 0 ? scrollY : document.documentElement.scrollTop;
    if (this.isFrontend) {
      if (scrollTop === 0) {
        this.element.style.visibility = 'hidden';
        this.element.style.opacity = '0';
        this.element.style.transition = 'opacity 0.3s ease';
      } else {
        this.element.style.visibility = 'visible';
        this.element.style.opacity = '1';
        this.element.style.transition = 'opacity 0.3s ease';
      }
    }
    if (this.circle) {
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      this.circle.style.strokeDashoffset = this.circumference * (1 - progress);
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ScrollToTop);

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
  !*** ./src/blocks/scroll-to-top/view.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scroll__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./scroll */ "./src/blocks/scroll-to-top/scroll.js");

document.addEventListener('DOMContentLoaded', () => {
  const scrollToTopContainers = document.querySelectorAll('.ablocks-block--scroll-to-top');
  scrollToTopContainers.forEach(element => {
    new _scroll__WEBPACK_IMPORTED_MODULE_0__["default"](element, true);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map