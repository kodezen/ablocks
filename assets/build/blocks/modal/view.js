/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/modal/modal.js":
/*!***********************************!*\
  !*** ./src/blocks/modal/modal.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const openPanel = element => {
  element.classList.add('ablocks-block-modal-panel-visibility--open');
};
const closePanel = element => {
  const blockId = element.classList[1].replace('ablocks-block-', '');
  element.classList.remove('ablocks-block-modal-panel-visibility--open');
  if (element.dataset.autoShowOnce === 'true') {
    localStorage.setItem(`ablocks-modal-${blockId}`, 'true');
  }
};
const modal = element => {
  const panelOpener = () => openPanel(element);
  const panelCloser = () => closePanel(element);
  const isOnHover = element.classList.contains('ablocks-trigger-on-hover');
  const triggerElement = element.querySelector('.ablocks-modal-trigger-wrap');
  if (triggerElement) {
    if (isOnHover) {
      triggerElement.addEventListener('mouseenter', panelOpener);
    } else {
      triggerElement.addEventListener('click', e => {
        e.preventDefault();
        panelOpener();
      });
    }
  }

  // Show Modal on Mouse Out of Window
  const showOnMouseOutofWindow = element.getAttribute('data-show-on-mouse-out');
  if (showOnMouseOutofWindow === 'true') {
    // when the cursor leaves the window, open the modal
    const showAutoOnce = element?.dataset?.autoShowOnce === 'true';
    document.addEventListener('mouseout', e => {
      if (!element.classList.contains('ablocks-block-modal-panel-visibility--open')) {
        if (e.clientY < 0) {
          if (showAutoOnce && localStorage.getItem(`ablocks-modal-${element.classList[1].replace('ablocks-block-', '')}`)) {
            return;
          }
          panelOpener();
        }
      }
    });
  }

  // Open Modal automatically after specified time when 'auto trigger' is enabled - start
  const autoTriggerTime = element?.dataset?.autoTriggerTime;
  if (autoTriggerTime) {
    const showAutoOnce = element?.dataset?.autoShowOnce === 'true';
    // Check if the modal has already been shown once
    if (showAutoOnce && localStorage.getItem(`ablocks-modal-${element.classList[1].replace('ablocks-block-', '')}`)) {
      return;
    }
    setTimeout(panelOpener, parseInt(autoTriggerTime) * 1000);
  }
  // Open Modal automatically after specified time when 'auto trigger' is enabled - end

  // CLose Modal When Clicked 'close button' - start
  const closeBtn = element.querySelector('.ablocks-modal-popup-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', panelCloser);
  }
  // CLose Modal When Clicked 'close button' - end

  // Close Modal When It's Open & Clicked Outside of the content area - start
  const popupContentWrap = element.querySelector('.ablocks-modal-popup-content-wrap');
  document.addEventListener('click', e => {
    if (!popupContentWrap.contains(e.target) && !triggerElement.contains(e.target)) {
      closePanel(element);
    }
  });
  // Close Modal When It's Open & Clicked Outside of the content area - end
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

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
/*!**********************************!*\
  !*** ./src/blocks/modal/view.js ***!
  \**********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./src/blocks/modal/modal.js");

function initializeModal() {
  const modals = document.querySelectorAll(':not(.block-editor-block-list__block).ablocks-block--modal');
  modals.forEach(element => {
    (0,_modal__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeModal();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map