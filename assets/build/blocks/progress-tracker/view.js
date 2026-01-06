/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/progress-tracker/progress.js":
/*!*************************************************!*\
  !*** ./src/blocks/progress-tracker/progress.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ progressTracker)
/* harmony export */ });
function progressTracker(element, isFrontend = false) {
  const progressBars = element?.querySelector('.ablocks-block-progress-bar');
  const progressCircles = element?.querySelector('.ablocks-block-progress-circle');
  const layout = element?.getAttribute('data-layout');
  const direction = element?.getAttribute('data-direction');
  const progressRelative = element?.getAttribute('data-progress-relative');
  const progressRelativeSelector = element?.getAttribute('data-progress-relative-selector');
  const percentageText = element?.querySelector('.ablocks-block-progress__text');
  const circleBar = progressCircles?.querySelector('.ablocks-block-progress-circle__svg-bar');
  const scrollTarget = isFrontend ? window : document.querySelector('[name="editor-canvas"]')?.contentWindow;
  if (!scrollTarget) {
    return;
  }
  const updateBarProgress = scrollPercentage => {
    if (progressBars) {
      progressBars.style.width = `${scrollPercentage}%`;
    }
    if (percentageText) {
      percentageText.textContent = `${Math.round(scrollPercentage)}%`;
    }
  };
  const updateCircleProgress = scrollPercentage => {
    if (percentageText) {
      percentageText.textContent = `${Math.round(scrollPercentage)}%`;
    }
    if (circleBar) {
      const radius = parseFloat(circleBar.getAttribute('r') || 0);
      if (!radius) {
        return;
      }
      const circumference = 2 * Math.PI * radius;
      const offset = circumference - scrollPercentage / 100 * circumference;
      if (direction === 'left') {
        circleBar.style.strokeDashoffset = `-${offset}`;
      } else if (direction === 'right') {
        circleBar.style.strokeDashoffset = offset;
      } else {
        circleBar.style.strokeDashoffset = offset;
      }
    }
  };
  const updateProgress = scrollPercentage => {
    const clampedPercentage = Math.min(Math.max(Math.floor(scrollPercentage), 0), 100);
    if (layout === 'bar') {
      updateBarProgress(clampedPercentage);
    } else if (layout === 'circle') {
      updateCircleProgress(clampedPercentage);
    }
  };
  const handleWindowScroll = () => {
    const scrollTop = scrollTarget.scrollY || 0;
    const windowHeight = scrollTarget.innerHeight || 0;
    const documentHeight = scrollTarget.document.documentElement.scrollHeight || 0;
    const denominator = documentHeight - windowHeight;
    const scrollPercentage = denominator > 0 ? scrollTop / denominator * 100 : 20;
    updateProgress(scrollPercentage);
  };
  const handleSelectorScroll = () => {
    if (!progressRelativeSelector) {
      return;
    }
    const relativeElement = element?.ownerDocument?.querySelector(progressRelativeSelector);
    if (!relativeElement) {
      return;
    }
    const divTop = relativeElement.getBoundingClientRect().top;
    const divHeight = relativeElement.offsetHeight;
    const windowHeight = scrollTarget.innerHeight;
    if (divHeight === 0) {
      updateProgress(0);
      return;
    }
    if (divTop < windowHeight && divTop + divHeight > 0) {
      const scrolled = Math.min(windowHeight - divTop, divHeight);
      const scrollPercentage = Math.max(0, Math.min(100, scrolled / divHeight * 100));
      if (scrolled >= divHeight) {
        updateProgress(100);
      } else {
        updateProgress(scrollPercentage);
      }
    } else {
      updateProgress(0);
    }
  };
  if (progressRelative === 'entire_page') {
    scrollTarget.addEventListener('scroll', handleWindowScroll);
  } else if (progressRelative === 'selector' && progressRelativeSelector) {
    scrollTarget.addEventListener('scroll', handleSelectorScroll);
  }
  handleWindowScroll();
  if (progressRelativeSelector) {
    handleSelectorScroll();
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
/*!*********************************************!*\
  !*** ./src/blocks/progress-tracker/view.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _progress__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./progress */ "./src/blocks/progress-tracker/progress.js");

function initializeCounters() {
  const progressElements = document.querySelectorAll('.ablocks-block--progress-tracker');
  progressElements.forEach(element => {
    (0,_progress__WEBPACK_IMPORTED_MODULE_0__["default"])(element, true);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeCounters();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map