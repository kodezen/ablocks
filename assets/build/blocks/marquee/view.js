/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/marquee/marquee.js":
/*!***************************************!*\
  !*** ./src/blocks/marquee/marquee.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MarqueeHandler: () => (/* binding */ MarqueeHandler)
/* harmony export */ });
class MarqueeHandler {
  constructor(marqueeElements) {
    this.marqueeElements = marqueeElements;
    if (!this.marqueeElements) {}
  }
  addMarqueeAnimation() {
    this.marqueeElements.forEach(marqueeElement => {
      marqueeElement.setAttribute('data-animated', 'true');
      const speed = parseFloat(marqueeElement.getAttribute('data-speed')) || 10;
      const direction = marqueeElement.getAttribute('data-direction') || 'normal';
      const contentGap = parseFloat(marqueeElement.getAttribute('data-content-gap')) || 12;
      const pauseOnHover = marqueeElement.getAttribute('data-pause') === 'true';
      const loop = marqueeElement.getAttribute('data-loop') === 'true';
      const loopCount = parseInt(marqueeElement.getAttribute('data-loop-count'), 10) || 1;
      const isVertical = direction === 'up' || direction === 'down';
      const animationName = isVertical ? 'marquee-scroll-vertical' : 'marquee-scroll';
      const animationDirection = direction === 'up' ? 'reverse' : direction === 'down' ? 'normal' : direction;
      marqueeElement.style.setProperty('--ablocks-block-animation-speed', `${speed}s`);
      marqueeElement.style.setProperty('--ablocks-block-animation-name', animationName);
      marqueeElement.style.setProperty('--ablocks-block-animation-direction', animationDirection);
      marqueeElement.style.setProperty('--ablocks-block-content-gap', `${contentGap}px`);
      const marqueeInner = marqueeElement.querySelector('.ablocks-block-marquee__children');
      if (!marqueeInner) {
        return;
      }
      const clonedMarqueeInner = marqueeInner.cloneNode(true);
      clonedMarqueeInner.classList.add('ablocks-block-marquee__children-mirror');
      clonedMarqueeInner.setAttribute('aria-hidden', 'true');
      marqueeElement.appendChild(clonedMarqueeInner);
      // eslint-disable-next-line
      requestAnimationFrame(() => {
        if (isVertical) {
          const totalHeight = marqueeInner.scrollHeight;
          marqueeElement.style.setProperty('--ablocks-block-total-height', `${totalHeight + contentGap}px`);
        } else {
          const totalWidth = marqueeInner.scrollWidth;
          marqueeElement.style.setProperty('--ablocks-block-total-width', `${totalWidth + contentGap}px`);
        }
      });
      if (loop && loopCount > 0) {
        let currentLoop = 0;
        const handleAnimationIteration = () => {
          currentLoop++;
          if (currentLoop >= loopCount) {
            marqueeInner.style.animation = 'none';
            clonedMarqueeInner.style.animation = 'none';
            marqueeInner.removeEventListener('animationiteration', handleAnimationIteration);
            clonedMarqueeInner.removeEventListener('animationiteration', handleAnimationIteration);
          }
        };
        marqueeInner.addEventListener('animationiteration', handleAnimationIteration);
        clonedMarqueeInner.addEventListener('animationiteration', handleAnimationIteration);
      }
      if (pauseOnHover) {
        marqueeElement.addEventListener('mouseenter', () => {
          marqueeInner.style.animationPlayState = 'paused';
          clonedMarqueeInner.style.animationPlayState = 'paused';
        });
        marqueeElement.addEventListener('mouseleave', () => {
          marqueeInner.style.animationPlayState = 'running';
          clonedMarqueeInner.style.animationPlayState = 'running';
        });
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
/*!************************************!*\
  !*** ./src/blocks/marquee/view.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _marquee__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./marquee */ "./src/blocks/marquee/marquee.js");

function initializeMarquee() {
  const marqueeElements = document.querySelectorAll('.ablocks-block-marquee');
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const marqueeHandler = new _marquee__WEBPACK_IMPORTED_MODULE_0__.MarqueeHandler(marqueeElements);
    marqueeHandler.addMarqueeAnimation();
  }
}
document.addEventListener('DOMContentLoaded', () => {
  initializeMarquee();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map