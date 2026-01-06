/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/countdown/countDown.js":
/*!*******************************************!*\
  !*** ./src/blocks/countdown/countDown.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ABlocksCountDown(element) {
  if (!element) {
    return;
  }
  const ablocksCountDownDay = element?.querySelector('.ablocks-countdown__item--day .ablocks-countdown-value');
  const ablocksCountDownHour = element?.querySelector('.ablocks-countdown__item--hour .ablocks-countdown-value');
  const ablocksCountDownMinute = element?.querySelector('.ablocks-countdown__item--minute .ablocks-countdown-value');
  const ablocksCountDownSecond = element?.querySelector('.ablocks-countdown__item--second .ablocks-countdown-value');
  const clearTimer = setInterval(() => {
    updateUI();
  }, 1000);
  const updateUI = () => {
    try {
      const targetTime = new Date(element.getAttribute('data-target-time')).getTime();
      const currentTime = Date.now();
      const timeDifference = targetTime - currentTime;
      if (timeDifference <= 0) {
        clearInterval(clearTimer);
        if (ablocksCountDownDay) {
          ablocksCountDownDay.innerHTML = '00';
        }
        if (ablocksCountDownHour) {
          ablocksCountDownHour.innerHTML = '00';
        }
        if (ablocksCountDownMinute) {
          ablocksCountDownMinute.innerHTML = '00';
        }
        if (ablocksCountDownSecond) {
          ablocksCountDownSecond.innerHTML = '00';
        }
        return;
      }
      const second = Math.floor(timeDifference / 1000 % 60).toString().padStart(2, '0');
      const minute = Math.floor(timeDifference / (1000 * 60) % 60).toString().padStart(2, '0');
      const hour = Math.floor(timeDifference / (1000 * 60 * 60) % 24).toString().padStart(2, '0');
      const day = Math.floor(timeDifference / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');
      if (ablocksCountDownDay) {
        ablocksCountDownDay.innerHTML = day;
      }
      if (ablocksCountDownHour) {
        ablocksCountDownHour.innerHTML = hour;
      }
      if (ablocksCountDownMinute) {
        ablocksCountDownMinute.innerHTML = minute;
      }
      if (ablocksCountDownSecond) {
        ablocksCountDownSecond.innerHTML = second;
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  };
  updateUI();
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksCountDown);

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
/*!**************************************!*\
  !*** ./src/blocks/countdown/view.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _countDown__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./countDown */ "./src/blocks/countdown/countDown.js");

function initializeCounters() {
  const countDownElements = document.querySelectorAll('.ablocks-block--countdown');
  countDownElements.forEach(element => {
    (0,_countDown__WEBPACK_IMPORTED_MODULE_0__["default"])(element, true);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeCounters();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map