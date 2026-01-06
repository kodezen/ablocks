/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/news-ticker/newsTicker.js":
/*!**********************************************!*\
  !*** ./src/blocks/news-ticker/newsTicker.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksMarquee {
  constructor(element, options = {}) {
    this.marqueeElement = element;
    if (!this.marqueeElement) {
      return;
    }
    this.marqueeContent = this.marqueeElement.querySelector('.ablocks-block-news-ticker_marquee--content');
    this.slideSpeed = options.slideSpeed || Number(this.marqueeElement.getAttribute('data-slide-speed')) || 1;
    this.slideDirection = options.slideDirection || this.marqueeElement.getAttribute('data-slide-direction') || 'ltr';
    this.isPauseOnOver = options.isPauseOnOver || false;
    this.currentPosition = this.slideDirection === 'rtl' ? -this.marqueeContent.offsetWidth : 0;
    this.isPaused = false;
    this.updateDimensions();
    this.animationFrameId = null;
    this.handlePause = this.pauseAnimation.bind(this);
    this.handleResume = this.resumeAnimation.bind(this);
    this.handleTogglePause = this.togglePause.bind(this);
    this.handleNext = this.moveNext.bind(this);
    this.handlePrev = this.movePrev.bind(this);
    this.handleResize = this.updateDimensions.bind(this);
    this.bindEvents();
    this.startAnimation();
    window.addEventListener('resize', this.handleResize);
  }
  bindEvents() {
    if (this.isPauseOnOver) {
      this.marqueeContent.addEventListener('mouseenter', this.handlePause);
      this.marqueeContent.addEventListener('mouseleave', this.handleResume);
    }
    const pauseButton = this.marqueeElement.querySelector('.ablocks-block-news-ticker--icons__pause');
    if (pauseButton) {
      pauseButton.addEventListener('click', this.handleTogglePause);
    }
    const nextButton = this.marqueeElement.querySelector('.ablocks-block-news-ticker--icons__next');
    if (nextButton) {
      nextButton.addEventListener('click', this.handleNext);
    }
    const prevButton = this.marqueeElement.querySelector('.ablocks-block-news-ticker--icons__prev');
    if (prevButton) {
      prevButton.addEventListener('click', this.handlePrev);
    }
  }
  removeHoverEvents() {
    this.marqueeContent.removeEventListener('mouseenter', this.handlePause);
    this.marqueeContent.removeEventListener('mouseleave', this.handleResume);
  }
  updateDimensions() {
    this.contentWidth = this.marqueeContent.offsetWidth;
    this.parentWidth = this.marqueeContent.parentElement.offsetWidth;
  }
  startAnimation() {
    const animate = () => {
      if (this.isPaused) {
        this.animationFrameId = window.requestAnimationFrame(animate);
        return;
      }
      if (this.slideDirection === 'rtl') {
        this.currentPosition += this.slideSpeed;
        if (this.currentPosition > this.parentWidth) {
          this.currentPosition = -this.contentWidth;
        }
      } else {
        this.currentPosition -= this.slideSpeed;
        if (this.currentPosition < -this.contentWidth) {
          this.currentPosition = this.parentWidth;
        }
      }
      this.marqueeContent.style.transform = `translateX(${this.currentPosition}px)`;
      this.animationFrameId = window.requestAnimationFrame(animate);
    };
    this.animationFrameId = window.requestAnimationFrame(animate);
  }
  pauseAnimation() {
    this.isPaused = true;
    window.cancelAnimationFrame(this.animationFrameId);
  }
  resumeAnimation() {
    if (this.isPaused) {
      this.isPaused = false;
      this.startAnimation();
    }
  }
  togglePause() {
    if (this.isPaused) {
      this.resumeAnimation();
    } else {
      this.pauseAnimation();
    }
  }
  moveNext() {
    const step = 50;
    if (this.slideDirection === 'rtl') {
      this.currentPosition += step;
      if (this.currentPosition > this.parentWidth) {
        this.currentPosition = -this.contentWidth;
      }
    } else {
      this.currentPosition -= step;
      if (this.currentPosition < -this.contentWidth) {
        this.currentPosition = this.parentWidth;
      }
    }
    this.marqueeContent.style.transform = `translateX(${this.currentPosition}px)`;
  }
  movePrev() {
    const step = 50;
    if (this.slideDirection === 'rtl') {
      this.currentPosition -= step;
      if (this.currentPosition < -this.contentWidth) {
        this.currentPosition = this.parentWidth;
      }
    } else {
      this.currentPosition += step;
      if (this.currentPosition > this.parentWidth) {
        this.currentPosition = -this.contentWidth;
      }
    }
    this.marqueeContent.style.transform = `translateX(${this.currentPosition}px)`;
  }
  destroy() {
    this.removeHoverEvents();
    const pauseButton = this.marqueeElement.querySelector('.ablocks-block-news-ticker--icons__pause');
    if (pauseButton) {
      pauseButton.removeEventListener('click', this.handleTogglePause);
    }
    const nextButton = this.marqueeElement.querySelector('.ablocks-block-news-ticker--icons__next');
    if (nextButton) {
      nextButton.removeEventListener('click', this.handleNext);
    }
    const prevButton = this.marqueeElement.querySelector('.ablocks-block-news-ticker--icons__prev');
    if (prevButton) {
      prevButton.removeEventListener('click', this.handlePrev);
    }
    window.cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener('resize', this.handleResize);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksMarquee);

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
/*!****************************************!*\
  !*** ./src/blocks/news-ticker/view.js ***!
  \****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _newsTicker__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./newsTicker */ "./src/blocks/news-ticker/newsTicker.js");

function initializeMarquee() {
  const marqueeElements = document.querySelectorAll('.ablocks-block-news-ticker');
  marqueeElements.forEach(element => {
    const slideSpeed = parseFloat(element.getAttribute('data-slide-speed')) || 1;
    const slideDirection = element.getAttribute('data-slide-direction') || 'left';
    const isPauseOnOver = element.getAttribute('data-pause-on-hover') === 'true';
    const navigatorColor = element.getAttribute('data-navigator-color') || '#13191B';
    const marqueeInstance = new _newsTicker__WEBPACK_IMPORTED_MODULE_0__["default"](element, {
      slideSpeed,
      slideDirection,
      isPauseOnOver
    });
    const pauseButton = element.querySelector('.ablocks-block-news-ticker--icons__pause');
    let isPaused = false;
    if (pauseButton) {
      pauseButton.innerHTML = `
               <svg class="ablocks-block-news-ticker--icons__pause" width="24" height="50" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
					<rect x="9" y="4" width="1.55556" height="19.25" fill="${navigatorColor}" />
					<rect x="18.2" y="4" width="1.55556" height="19.25" fill="${navigatorColor}" />
				</svg>`;
      pauseButton.addEventListener('click', () => {
        if (isPaused) {
          marqueeInstance.resumeAnimation();
          pauseButton.innerHTML = `

                    <svg class="ablocks-block-news-ticker--icons__resume" width="24" height="50" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
							<rect x="9" y="4" width="1.55556" height="19.25" fill="${navigatorColor}" />
							<rect x="18.2" y="4" width="1.55556" height="19.25" fill="${navigatorColor}" />
						</svg>

                    `;
        } else {
          marqueeInstance.pauseAnimation();
          pauseButton.innerHTML = `
                     <svg class="ablocks-block-news-ticker--icons__pause" width="24" height="50" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.4347 12.7449L8.10069 4.58794C7.87588 4.45028 7.6184 4.37513 7.35484 4.37025C7.09128 4.36537 6.8312 4.43093 6.60145 4.56018C6.37389 4.68741 6.18432 4.87296 6.05225 5.09775C5.92017 5.32253 5.85036 5.57844 5.84998 5.83916V22.1513C5.85169 22.5424 6.00863 22.9168 6.2863 23.1922C6.56396 23.4676 6.93963 23.6215 7.33071 23.62C7.60367 23.6199 7.87134 23.5446 8.10439 23.4025L21.4347 15.2455C21.649 15.1149 21.826 14.9314 21.9489 14.7126C22.0718 14.4938 22.1363 14.2471 22.1363 13.9961C22.1363 13.7452 22.0718 13.4985 21.9489 13.2797C21.826 13.0609 21.649 12.8774 21.4347 12.7468V12.7449ZM7.33071 22.1337V5.85119L20.6416 13.9952L7.33071 22.1337Z" fill="${navigatorColor}"/>
                    </svg>`;
        }
        isPaused = !isPaused;
      });
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeMarquee();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map