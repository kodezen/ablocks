/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/heading/heading-animation/rotate-slide-down.js":
/*!*******************************************************************!*\
  !*** ./src/blocks/heading/heading-animation/rotate-slide-down.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABHeadingRotateSlideDown {
  constructor(element, attributes) {
    if (!element) {
      return;
    }
    this.element = element;
    this.texts = this.element.querySelectorAll('.ablocks-dynamic-text');
    this.index = 0;
    this.intervalId = null;
    this.isLoop = attributes.isloop === 'true' || attributes.isloop === true;
    this.highlightDuration = parseInt(attributes.duration) || 2000;
    this.txtWrapper = this.element.querySelector('.ablocks-animated-text-wrapper');
    if (this.txtWrapper) {
      const maxWidth = Array.from(this.texts).reduce((max, text) => {
        return Math.max(max, text.offsetWidth);
      }, 0);
      this.txtWrapper.style.minWidth = `${maxWidth}px`;
    }
    if (this.texts.length === 0) {
      return;
    }
    this.texts[0].classList.add('ablocks-dynamic-text-active');
    setTimeout(() => {
      this.texts.forEach((text, index) => {
        if (index === 0) {
          text.classList.add('ablocks-dynamic-text-active');
        } else {
          text.classList.remove('ablocks-dynamic-text-active');
        }
      });
    }, 100);
    this.startRotation();
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }
  startRotation() {
    this.stopRotation();
    this.intervalId = setInterval(() => {
      if (this.index === this.texts.length - 1 && !this.isLoop) {
        this.stopRotation();
        return;
      }
      this.texts[this.index].classList.remove('ablocks-dynamic-text-active');
      this.index++;
      if (this.index >= this.texts.length && this.isLoop) {
        this.index = 0;
      }
      this.texts[this.index].classList.add('ablocks-dynamic-text-active');
    }, this.highlightDuration);
  }
  stopRotation() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
  handleVisibilityChange() {
    if (document.hidden) {
      this.stopRotation();
    } else {
      this.startRotation();
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABHeadingRotateSlideDown);

/***/ }),

/***/ "./src/blocks/heading/heading-animation/rotate-swirl.js":
/*!**************************************************************!*\
  !*** ./src/blocks/heading/heading-animation/rotate-swirl.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABHeadingRotateSwirl {
  constructor(element, attributes) {
    if (!element) {
      return;
    }
    this.element = element;
    this.texts = element.querySelectorAll('.ablocks-dynamic-text');
    this.currentIndex = 0;
    this.isLoop = attributes.isloop === 'true' || attributes.isloop === true;
    this.highlightDuration = parseInt(attributes.duration) || 2000;
    this.timeoutId = null;
    if (this.texts.length === 0) {
      return;
    }
    this.texts.forEach(text => text.classList.remove('ablocks-headline-text-active'));
    this.showNextText();
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }
  showNextText() {
    this.stopRotation();
    this.texts.forEach(text => {
      text.classList.remove('ablocks-headline-text-active');
      text.querySelectorAll('.ablocks-dynamic-letter').forEach(letter => {
        letter.classList.remove('ablocks-animation-in');
        void letter.offsetWidth; // reflow
      });
    });
    const currentText = this.texts[this.currentIndex];
    const letters = currentText.querySelectorAll('.ablocks-dynamic-letter');
    if (letters.length > 0) {
      this.typeSpeed = this.highlightDuration / letters.length;
    } else {
      this.typeSpeed = this.highlightDuration; // fallback
    }
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < letters.length) {
        letters[i].classList.add('ablocks-animation-in');
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, this.typeSpeed);
    currentText.classList.add('ablocks-headline-text-active');
    const isLastText = this.currentIndex === this.texts.length - 1;
    if (isLastText && !this.isLoop) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    this.timeoutId = setTimeout(() => this.showNextText(), this.highlightDuration);
  }
  stopRotation() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  handleVisibilityChange() {
    if (document.hidden) {
      this.stopRotation();
    } else {
      this.showNextText();
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABHeadingRotateSwirl);

/***/ }),

/***/ "./src/blocks/heading/heading-animation/rotate-typing.js":
/*!***************************************************************!*\
  !*** ./src/blocks/heading/heading-animation/rotate-typing.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABHeadingRotateTyping {
  constructor(element, attributes) {
    if (!element) {
      return;
    }
    this.element = element; // the .ablocks-rotate-typing element
    this.texts = element.querySelectorAll('.ablocks-dynamic-text');
    this.currentIndex = 0;
    this.isLoop = attributes.isloop === 'true' || attributes.isloop === true;
    this.highlightDuration = parseInt(attributes.duration) || 2000;
    this.timeoutId = null;
    if (this.texts.length === 0) {
      return;
    }
    this.texts.forEach(text => text.classList.remove('ablocks-headline-text-active'));
    this.showNextText();
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }
  showNextText() {
    this.stopRotation();
    // Reset all other texts
    this.texts.forEach(text => {
      text.classList.remove('ablocks-headline-text-active');
      text.querySelectorAll('.ablocks-dynamic-letter').forEach(letter => {
        letter.classList.remove('ablocks-animation-in');
      });
    });
    const currentText = this.texts[this.currentIndex];
    const letters = currentText.querySelectorAll('.ablocks-dynamic-letter');
    if (letters.length > 0) {
      this.typeSpeed = this.highlightDuration / letters.length;
    } else {
      this.typeSpeed = this.highlightDuration;
    }
    let i = 0;
    const typeInterval = setInterval(() => {
      if (i < letters.length) {
        letters[i].classList.add('ablocks-animation-in');
        i++;
      } else {
        clearInterval(typeInterval);
      }
    }, this.typeSpeed);
    currentText.classList.add('ablocks-headline-text-active');
    const isLastText = this.currentIndex === this.texts.length - 1;
    if (isLastText && !this.isLoop) {
      return;
    }
    this.currentIndex = (this.currentIndex + 1) % this.texts.length;
    this.timeoutId = setTimeout(() => this.showNextText(), this.highlightDuration);
  }
  stopRotation() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null;
    }
  }
  handleVisibilityChange() {
    if (document.hidden) {
      this.stopRotation();
    } else {
      this.showNextText();
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABHeadingRotateTyping);

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
  !*** ./src/blocks/heading/view.js ***!
  \************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _heading_animation_rotate_slide_down__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./heading-animation/rotate-slide-down */ "./src/blocks/heading/heading-animation/rotate-slide-down.js");
/* harmony import */ var _heading_animation_rotate_swirl__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./heading-animation/rotate-swirl */ "./src/blocks/heading/heading-animation/rotate-swirl.js");
/* harmony import */ var _heading_animation_rotate_typing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./heading-animation/rotate-typing */ "./src/blocks/heading/heading-animation/rotate-typing.js");



function initialHeadingAnimation() {
  // const headingBlock = document.querySelectorAll( '.ablocks-block--heading' );
  const animatedText = document.querySelectorAll('.ablocks-animated-text');
  const hasAnyClass = (el, classList) => classList.some(cls => el.classList.contains(cls));
  animatedText.forEach(element => {
    const attributes = element.closest('.ablocks-block--heading').dataset;
    if (hasAnyClass(element, ['ablocks-rotate-slide-down', 'ablocks-rotate-clip', 'ablocks-rotate-drop-in', 'ablocks-rotate-flip', 'ablocks-rotate-slide'])) {
      new _heading_animation_rotate_slide_down__WEBPACK_IMPORTED_MODULE_0__["default"](element, attributes);
    }
    if (hasAnyClass(element, ['ablocks-rotate-typing'])) {
      // "ablocks-rotate-blind", "ablocks-rotate-wave"
      new _heading_animation_rotate_typing__WEBPACK_IMPORTED_MODULE_2__["default"](element, attributes);
    }
    if (hasAnyClass(element, ['ablocks-rotate-swirl'])) {
      new _heading_animation_rotate_swirl__WEBPACK_IMPORTED_MODULE_1__["default"](element, attributes);
    }
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initialHeadingAnimation();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map