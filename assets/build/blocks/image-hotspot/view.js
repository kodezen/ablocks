/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/image-hotspot/image-hotspot.js":
/*!***************************************************!*\
  !*** ./src/blocks/image-hotspot/image-hotspot.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABImageHotspot {
  constructor(element) {
    if (!element) {
      return;
    }
    this.element = element;
    this.tooltipContent = this.element.querySelector('.ablocks-image-hotspot__tooltip-content');
    this.pins = this.element.querySelectorAll('.ablocks-image-hotspot__pin');
    this.activeTooltipIndex = null;
    if (!this.tooltipContent || !this.pins.length) {
      return;
    }
    this.tooltipContent.style.display = 'none';
    this.initPins();
  }

  // Initialize pins with event listeners
  initPins() {
    this.pins.forEach((pin, index) => {
      const xAxis = pin.dataset.xaxis;
      const yAxis = pin.dataset.yaxis;
      const trigger = pin.dataset.trigger;

      // Set left and top position of the pin
      pin.style.left = `${xAxis}%`;
      pin.style.top = `${yAxis}%`;

      // Event listener based on the trigger type
      if (trigger === 'onClick') {
        pin.addEventListener('click', () => this.handleTooltip(index, xAxis, yAxis));
      } else {
        pin.addEventListener('mouseover', () => this.handleTooltip(index, xAxis, yAxis));
      }
    });
  }

  // Handle the tooltip display logic
  handleTooltip(tooltipIndex, xAxis, yAxis) {
    const hotspotChildElement = this.element.querySelectorAll('.ablocks-block--image-hotspot-child');
    if (!hotspotChildElement) {
      return;
    }

    // add eventlistener to .ablocks-icon ablocks-icon--close.. onclick hide tooltip
    const closeIcon = this.tooltipContent.querySelector('.ablocks-icon.ablocks-icon--close');
    closeIcon.addEventListener('click', () => {
      this.tooltipContent.style.display = 'none';
    });

    // Hide previously active tooltip if it exists
    if (this.activeTooltipIndex !== null) {
      const activeChildContainer = hotspotChildElement[this.activeTooltipIndex]?.children[0];
      if (activeChildContainer) {
        activeChildContainer.classList.remove('ablocks-image-hotspot__tooltip--active');
        this.tooltipContent.style.display = 'none';
      }
    }

    // Toggle the tooltip visibility
    this.activeTooltipIndex = tooltipIndex;
    const childContainer = hotspotChildElement[tooltipIndex]?.children[0];
    if (childContainer) {
      childContainer.classList.add('ablocks-image-hotspot__tooltip--active');

      // Adjust positioning to prevent overflow on small screens
      const tooltipRect = this.tooltipContent.getBoundingClientRect();
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      let newLeft = parseFloat(xAxis);
      let newTop = parseFloat(yAxis);

      // Adjust horizontally if the tooltip is going out of the screen
      if (tooltipRect.left < 0) {
        newLeft = 5; // Keep a small margin from the left
      } else if (tooltipRect.right > screenWidth) {
        newLeft = 95; // Keep a small margin from the right
      }

      // Adjust vertically if the tooltip is going out of the screen
      if (tooltipRect.top < 0) {
        newTop = 5; // Keep a small margin from the top
      } else if (tooltipRect.bottom > screenHeight) {
        newTop = 95; // Keep a small margin from the bottom
      }
      this.tooltipContent.style.top = `${newTop}%`;
      this.tooltipContent.style.left = `${newLeft}%`;
      this.tooltipContent.style.display = 'block';
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABImageHotspot);

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
  !*** ./src/blocks/image-hotspot/view.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _image_hotspot__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./image-hotspot */ "./src/blocks/image-hotspot/image-hotspot.js");

function initialImageHotspot() {
  const imageHotspots = document.querySelectorAll('.ablocks-block--image-hotspot');
  imageHotspots.forEach(element => {
    new _image_hotspot__WEBPACK_IMPORTED_MODULE_0__["default"](element);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initialImageHotspot();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map