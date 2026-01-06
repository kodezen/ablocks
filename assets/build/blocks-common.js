/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets/scss/blocks-common.scss":
/*!****************************************!*\
  !*** ./assets/scss/blocks-common.scss ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/blocks-common/animation.js":
/*!****************************************!*\
  !*** ./src/blocks-common/animation.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksAnimation {
  constructor(element) {
    this.ablocksAnimation = element;
    if (!this.ablocksAnimation || !element?.classList.contains('ablocks-invisible')) {
      return;
    }
    const observerOptions = {
      threshold: 0.5 // 50% of the element must be visible
    };
    // eslint-disable-next-line
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.applyAnimation(entry.target);
          // Stop observing after the animation is triggered
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    // eslint-disable-next-line
    if (Array.isArray(element) || element instanceof NodeList) {
      element.forEach(item => {
        observer.observe(item);
      });
    } else if (element) {
      observer.observe(element);
    }

    // Handle window resize to reapply animations
    window.addEventListener('resize', () => this.handleResize(element));
  }
  applyAnimation(target) {
    if (target.getAttribute('data-settings')) {
      const settings = JSON.parse(target.getAttribute('data-settings'));

      // Check for device type using custom breakpoints
      const isTablet = window.matchMedia(`(max-width: ${this.getBreakpoint('tablet')}) and (min-width: ${this.getBreakpoint('mobile')})`).matches;
      const isMobile = window.matchMedia(`(max-width: ${this.getBreakpoint('mobile')})`).matches;

      // Adjust animation based on device type
      let animationType = settings.animationType;
      if (isTablet) {
        animationType = settings.animationTypeTablet || settings.animationType; // Tablet-specific animation
      } else if (isMobile) {
        animationType = settings.animationTypeMobile || settings.animationType; // Mobile-specific animation
      }

      // Make the element visible
      target.style.visibility = 'visible';

      // If animation type is "none," do not apply any animation classes
      if (animationType === 'none') {
        return;
      }

      // Set animation properties
      target.style.setProperty('--animate-duration', `${settings.animationDuration || 1}s`);
      target.style.setProperty('--animate-delay', `${settings.animationDelay || 0}s`);
      target.classList.add('animate__animated', 'animate__' + animationType);
    }
  }
  handleResize(elements) {
    // eslint-disable-next-line
    if (Array.isArray(elements) || elements instanceof NodeList) {
      elements.forEach(item => {
        this.applyAnimation(item);
      });
    } else if (elements) {
      this.applyAnimation(elements);
    }
  }

  // Custom breakpoint method
  getBreakpoint(mediaQuery) {
    switch (mediaQuery) {
      case 'tablet':
        return '800px';
      case 'mobile':
        return '480px';
      default:
        return '1200px';
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksAnimation);

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
/*!******************************!*\
  !*** ./src/blocks-common.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _blocks_common_animation__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./blocks-common/animation */ "./src/blocks-common/animation.js");
/* harmony import */ var _assets_scss_blocks_common_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../assets/scss/blocks-common.scss */ "./assets/scss/blocks-common.scss");


function ABlocksAnimationInit() {
  const animationElements = document.querySelectorAll('.ablocks-invisible');
  if (animationElements?.length) {
    animationElements.forEach(element => {
      new _blocks_common_animation__WEBPACK_IMPORTED_MODULE_0__["default"](element);
    });
  }
}

// Initialize counters when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  ABlocksAnimationInit();
});
})();

/******/ })()
;
//# sourceMappingURL=blocks-common.js.map