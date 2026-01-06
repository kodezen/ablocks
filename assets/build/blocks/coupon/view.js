/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/coupon/coupon.js":
/*!*************************************!*\
  !*** ./src/blocks/coupon/coupon.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const copyCouponCode = (couponCode, onCopyCallback, onResetCallback, resetDelay = 3000) => {
  const textArea = document.createElement('textarea');
  textArea.value = couponCode;
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand('copy');
  document.body.removeChild(textArea);
  if (onCopyCallback) {
    onCopyCallback();
  }
  if (onResetCallback) {
    setTimeout(() => {
      onResetCallback();
    }, resetDelay);
  }
};
const handleCopyAction = (clipboardText, couponCode, newText, couponStyle, clippedText) => {
  copyCouponCode(couponCode, () => {
    if (couponStyle === 'style4') {
      clipboardText.style.opacity = 0;
    } else {
      clipboardText.textContent = newText;
    }
  }, () => (couponStyle !== 'style4' ? clipboardText.textContent = clippedText : '', clipboardText.style.opacity = 1), 3000);
};
const ablocksCoupon = element => {
  let clipboard = element.querySelector('.ablocks-coupon-clipboard');
  let clipboardText = clipboard;
  const couponCode = element.getAttribute('data-coupon-code');
  const couponBtnText = element.getAttribute('data-clipboard-text');
  const couponBtnAfterCopyText = element.getAttribute('data-clipped-text');
  const couponStyle = element.getAttribute('data-coupon-style');
  let clippedText = couponBtnText;
  if (couponStyle === 'default' || couponStyle === 'style2') {
    clipboard = element.querySelector('.ablocks-coupon-clipboard');
    clipboardText = element.querySelector('.ablocks-coupon-clipboard-text');
    clippedText = couponBtnText;
  } else if (couponStyle === 'style4') {
    clipboard = element.querySelector('.ablocks-coupon-clipboard');
    clipboardText = clipboard;
    clippedText = couponBtnText;
  } else {
    clipboard = element.querySelector('.ablocks-coupon-code');
    clipboardText = element.querySelector('.ablocks-coupon-code-text');
    clippedText = couponCode;
  }
  clipboard?.addEventListener('click', () => {
    handleCopyAction(clipboardText, couponCode, couponBtnAfterCopyText, couponStyle, clippedText);
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ablocksCoupon);

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
/*!***********************************!*\
  !*** ./src/blocks/coupon/view.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _coupon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./coupon */ "./src/blocks/coupon/coupon.js");

function initializeCounters() {
  const couponElements = document.querySelectorAll('.ablocks-block--coupon');
  couponElements.forEach(element => {
    (0,_coupon__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
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