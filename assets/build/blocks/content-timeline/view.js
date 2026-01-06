/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/content-timeline/content-timeline.js":
/*!*********************************************************!*\
  !*** ./src/blocks/content-timeline/content-timeline.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ABlocksContentTimeline)
/* harmony export */ });
/* harmony import */ var _Controls_color_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @Controls/color/helper */ "./src/controls/color/helper.js");
const raf = callback => {
  if (typeof window !== 'undefined' && window.requestAnimationFrame) {
    return window.requestAnimationFrame(callback);
  }
  return setTimeout(callback, 16); // Approximate 60 FPS
};

class ABlocksContentTimeline {
  constructor(element, editor = false) {
    this.contentTimeline = element;
    this.timelineElement = element.querySelector('.ablocks-block-content-timeline');
    this.blockTopHeight = this.contentTimeline.getBoundingClientRect().top + window.scrollY;
    this.editor = editor;
    this.arrowAlignment = this.timelineElement.getAttribute('data-arrow-alignment');
    this.animationColor = this.timelineElement.getAttribute('data-animation-color');
    this.showAnimation = this.timelineElement.getAttribute('data-show-animation');
    this.lineElement = this.contentTimeline.querySelector('.ablocks-block-content-timeline__line');
    this.lineInnerElement = this.contentTimeline.querySelector('.ablocks-block-content-timeline__line__inner');
    this.childBlocks = Array.from(this.contentTimeline.querySelectorAll('.ablocks-block-content-timeline-child'));
    this.handleScroll = this.handleScroll.bind(this);
    this.updateTimeline = this.updateTimeline.bind(this);
    const editorDiv = document.querySelector('.interface-navigable-region.interface-interface-skeleton__content');
    this.editorDiv = editorDiv;
    this.init();
  }
  init() {
    this.updateTimeline();
    this.handleScroll(); // Initial call to set up the state

    // if (this.editor) {
    //   return this.editorDiv.addEventListener('scroll', this.handleScroll);
    // }
    window.addEventListener('scroll', this.handleScroll);
  }
  updateTimeline() {
    if (this.childBlocks.length === 0 || !this.lineElement) {
      return;
    }
    const [firstChild, lastChild] = [this.childBlocks[0], this.childBlocks[this.childBlocks.length - 1]];
    const [firstChildHeight, lastChildHeight] = [firstChild.getBoundingClientRect().height, lastChild.getBoundingClientRect().height];
    switch (this.arrowAlignment) {
      case 'center':
        this.lineElement.style.top = `${firstChildHeight / 2}px`;
        this.lineElement.style.bottom = `${lastChildHeight / 2}px`;
        break;
      case 'bottom':
        this.lineElement.style.top = `${firstChildHeight}px`;
        this.lineElement.style.bottom = `${lastChildHeight / lastChildHeight}px`;
        break;
      case 'top':
        this.lineElement.style.top = `${firstChildHeight / firstChildHeight}px`;
        this.lineElement.style.bottom = `${lastChildHeight}px`;
        break;
      default:
        break;
    }
    this.lineInnerElement.style.height = '0px'; // Initialize lineInnerElement
  }
  handleScroll() {
    raf(() => {
      let totalHeight = 0;
      // const scrollY = this.editor ? this.editorDiv.scrollTop : window.scrollY
      const scrollY = window.scrollY;
      this.childBlocks.forEach(child => {
        totalHeight += child.getBoundingClientRect().height;
        const inViewIcon = child.querySelector('.ablocks-icon-wrap');
        if (scrollY - this.blockTopHeight > totalHeight - child.getBoundingClientRect().height) {
          if (this.showAnimation === 'true' && this.editor === false) {
            inViewIcon.style.backgroundColor = (0,_Controls_color_helper__WEBPACK_IMPORTED_MODULE_0__.getCSS)(this.animationColor);
          }
        } else {
          inViewIcon.style.backgroundColor = '';
        }
      });
      if (this.lineInnerElement) {
        if (this.showAnimation === 'true') {
          this.lineInnerElement.style.backgroundColor = (0,_Controls_color_helper__WEBPACK_IMPORTED_MODULE_0__.getCSS)(this.animationColor);
        }
        if (!this.editor) {
          this.lineInnerElement.style.height = `${scrollY - this.blockTopHeight}px`;
        }
      }
    });
  }
  destroy() {
    window.removeEventListener('scroll', this.handleScroll);
  }
}

/***/ }),

/***/ "./src/controls/color/helper.js":
/*!**************************************!*\
  !*** ./src/controls/color/helper.js ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getCSS: () => (/* binding */ getCSS),
/* harmony export */   getGlobalColorValue: () => (/* binding */ getGlobalColorValue),
/* harmony export */   parseGlobalColorToObject: () => (/* binding */ parseGlobalColorToObject),
/* harmony export */   parsePresetColorToObject: () => (/* binding */ parsePresetColorToObject)
/* harmony export */ });
const parseColorVariableToObject = (value, type) => {
  if (typeof value === 'string' && value.startsWith(`var:${type}`)) {
    const parts = value.split('|');
    if (parts.length === 3) {
      return {
        source: parts[0],
        color: parts[1] || '',
        ...(type === 'preset' ? {
          slug: parts[2]
        } : {
          id: parts[2]
        })
      };
    }
  }
  return false;
};
const parsePresetColorToObject = value => parseColorVariableToObject(value, 'preset');
const parseGlobalColorToObject = value => parseColorVariableToObject(value, 'global');
const getCSS = attributeValue => {
  if (attributeValue) {
    const presetColorObject = parsePresetColorToObject(attributeValue);
    const globalColorObject = parseGlobalColorToObject(attributeValue);
    if (presetColorObject) {
      return `var(--wp--preset--color--${presetColorObject?.slug})`;
    }
    if (globalColorObject) {
      return `var(--ablocks-${globalColorObject?.id})`;
    }
    return attributeValue;
  }
  return '';
};
const getGlobalColorValue = (globalColorId, globalColors) => {
  const globalColor = globalColors?.find(color => color.id === globalColorId);
  return globalColor?.value || '';
};

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
  !*** ./src/blocks/content-timeline/view.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _content_timeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content-timeline */ "./src/blocks/content-timeline/content-timeline.js");

function initializeContentTimeline() {
  const accordionElements = document.querySelectorAll('.ablocks-block--content-timeline');
  accordionElements.forEach(element => {
    new _content_timeline__WEBPACK_IMPORTED_MODULE_0__["default"](element, false);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeContentTimeline();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map