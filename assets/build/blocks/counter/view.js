/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/counter/counter.js":
/*!***************************************!*\
  !*** ./src/blocks/counter/counter.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksCounter {
  constructor(element) {
    this.ablocksCounter = element;
    if (!this.ablocksCounter) {
      return;
    }
    const countElement = element;
    this.startValue = Number(countElement?.getAttribute('data-start')) || 0;
    this.endValue = Number(countElement?.getAttribute('data-end')) || 0;
    this.totalNumber = Number(countElement?.getAttribute('data-total')) || 0;
    this.duration = Number(countElement?.getAttribute('data-duration')); // Default duration 1000ms
    this.separator = countElement?.getAttribute('data-separator');
    this.decimalPlaces = Number(countElement?.getAttribute('data-decimalPlaces')) || 0;
    this.circleSize = Number(countElement?.getAttribute('data-circleSize')) || 220;
    const layout = countElement?.getAttribute('data-layout');
    this.animationRepeat = countElement?.getAttribute('data-animationRepeat');
    this.layout = layout;
    if (!layout) {
      // eslint-disable-next-line
      console.error(`Missing 'data-layout' attribute for '${countElement}'.`);
      return;
    }
    if (layout !== 'number' && this.endValue >= this.totalNumber) {
      this.endValue = this.totalNumber;
    }
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5 // When 50% of the section is in view
    };
    const IO = new window.IntersectionObserver(this.IOCallback.bind(this), observerOptions);
    IO.observe(this.ablocksCounter);
  }
  init = () => {
    if (this.layout === 'number') {
      this.numberCounter();
    } else if (this.layout === 'circle') {
      this.circleCounter();
    } else if (this.layout === 'bar') {
      this.bar();
    } else {
      // eslint-disable-next-line
      console.error(`Unsupported layout '${this.layout}' for '${this.countElement}'.`);
    }
  };
  playOnce = false;
  IOCallback(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (this.animationRepeat === 'false' && !this.playOnce) {
          this.playOnce = true;
          this.init();
        }
        if (this.animationRepeat === 'true') {
          this.init();
        }
      }
    });
  }
  numberCounter() {
    const numberCounter = this.ablocksCounter?.querySelector('.ablocks-counter__content-number');
    if (!numberCounter) {
      // eslint-disable-next-line
      console.error(`'.ablocks-counter__content-number' element not found.`);
      return;
    }
    const {
      startValue,
      endValue,
      duration,
      separator,
      decimalPlaces
    } = this;
    let start = null;
    const range = endValue - startValue;
    const animate = timestamp => {
      if (!start) {
        start = timestamp;
      }
      const progress = timestamp - start;
      const percentage = duration === 0 ? 1 : Math.min(progress / duration, 1);
      const newCount = startValue + percentage * range;
      numberCounter.innerHTML = this.formatNumberWithSeparator(newCount, separator, decimalPlaces);
      if (progress < duration) {
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }
  circleCounter() {
    this.numberCounter();
    const circleCounter = this.ablocksCounter?.querySelector('.ablocks-circle-counter__progress');
    if (!circleCounter) {
      // eslint-disable-next-line
      console.error(`'.ablocks-circle-counter__progress' element not found.`);
      return;
    }
    const {
      startValue,
      endValue,
      totalNumber,
      duration,
      circleSize
    } = this;
    const radius = circleSize / 2;
    const circumference = 2 * Math.PI * radius;
    const startPercentage = startValue / totalNumber * 100;
    const endPercentage = endValue / totalNumber * 100;
    const startOffset = circumference - startPercentage / 100 * circumference;
    const endOffset = circumference - endPercentage / 100 * circumference;
    const animationKeyframes = [{
      strokeDashoffset: startOffset
    }, {
      strokeDashoffset: endOffset
    }];
    const animationProperties = {
      duration,
      fill: 'forwards'
    };
    circleCounter.animate(animationKeyframes, animationProperties);
  }
  bar() {
    this.numberCounter();
    const barCounter = this.ablocksCounter?.querySelector('.ablocks-bar-counter__progress');
    if (!barCounter) {
      // eslint-disable-next-line
      console.error(`'.ablocks-bar-counter__progress' element not found.`);
      return;
    }
    const {
      startValue,
      endValue,
      totalNumber,
      duration
    } = this;
    const startWidth = startValue / totalNumber * 100;
    const endWidth = endValue / totalNumber * 100;
    const animationKeyframes = [{
      width: startWidth + '%'
    }, {
      width: endWidth + '%'
    }];
    const animationProperties = {
      duration,
      fill: 'forwards'
    };
    barCounter.animate(animationKeyframes, animationProperties);
  }
  formatNumberWithSeparator(number, separator, decimalPlaces) {
    const options = {
      minimumFractionDigits: decimalPlaces,
      maximumFractionDigits: decimalPlaces
    };
    const formattedNumber = number.toLocaleString('en-US', options);
    return formattedNumber.replace(/,/g, separator);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksCounter);

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
/*!************************************!*\
  !*** ./src/blocks/counter/view.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _counter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./counter */ "./src/blocks/counter/counter.js");

// Function to initialize ABlocksCounter for each .ablocks-block--counter element
function initializeCounters() {
  const counterElements = document.querySelectorAll('.ablocks-block--counter');
  counterElements.forEach(element => {
    new _counter__WEBPACK_IMPORTED_MODULE_0__["default"](element);
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