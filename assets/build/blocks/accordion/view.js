/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/accordion/accordion.js":
/*!*******************************************!*\
  !*** ./src/blocks/accordion/accordion.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksAccordion {
  constructor(element, editor = true, settings = {}) {
    this.accordion = element;
    this.editor = editor;
    const dataSettings = this.getDataSettings();
    this.settings = {
      ...this.getDefaultSettings(),
      ...dataSettings,
      ...settings
    };
    this.elements = this.getElements();
    this.eventListeners = [];
    this.isAnimating = false;
    this.bindEvents();
    this.defaultActiveTab();
  }
  getDefaultSettings() {
    return {
      selectors: {
        tabTitle: '.ablocks-block--single-accordion',
        tabContent: '.ablocks-block--single-accordion__body'
      },
      classes: {
        activeItem: 'ablocks-block--single-accordion-is-selected'
      },
      toggleSelf: true,
      hidePrevious: true,
      autoExpand: true,
      allowMultiple: false,
      initialOpen: 0
    };
  }
  getDataSettings() {
    return {
      allowMultiple: this.accordion.getAttribute('data-multiple') === 'true',
      initialOpen: parseInt(this.accordion.getAttribute('data-initial-open')) || 0
    };
  }
  getElements() {
    const {
      tabTitle,
      tabContent
    } = this.settings.selectors;
    return {
      tabTitles: this.queryElements(tabTitle),
      tabContents: this.queryElements(tabContent)
    };
  }
  queryElements(selector) {
    return Array.from(this.accordion.querySelectorAll(selector));
  }
  bindEvents() {
    this.elements.tabTitles.forEach(tabTitle => {
      const heading = tabTitle.querySelector('.ablocks-block--single-accordion__heading');
      const clickHandler = event => {
        event.preventDefault();
        if (!this.isAnimating) {
          // Check if animation is running
          this.changeActiveTab(tabTitle.getAttribute('data-id-acc'));
        }
      };
      heading.addEventListener('click', clickHandler);
      this.eventListeners.push({
        element: heading,
        handler: clickHandler
      });
    });
  }
  isActiveTab(tabIndex) {
    const {
      activeItem
    } = this.settings.classes;
    const tabTitle = this.elements.tabTitles.find(tab => tab.getAttribute('data-id-acc') === tabIndex);
    return tabTitle && tabTitle.classList.contains(activeItem);
  }
  changeActiveTab(tabIndex) {
    const isActive = this.isActiveTab(tabIndex);
    const {
      toggleSelf,
      allowMultiple
    } = this.settings;
    if (!allowMultiple) {
      if (this.editor === false && toggleSelf === true || !isActive) {
        this.deactivateAllTabs();
      }
      if (!isActive) {
        this.activateTab(tabIndex);
      }
    } else if (isActive) {
      this.deactivateTab(tabIndex);
    } else {
      this.activateTab(tabIndex);
    }
  }
  deactivateAllTabs() {
    const {
      activeItem
    } = this.settings.classes;
    this.elements.tabTitles.forEach(tabTitle => {
      if (tabTitle.classList.contains(activeItem)) {
        const tabIndex = tabTitle.getAttribute('data-id-acc');
        this.deactivateTab(tabIndex);
      }
    });
  }
  deactivateTab(tabIndex) {
    const {
      activeItem
    } = this.settings.classes;
    const tabTitle = this.elements.tabTitles.find(tab => tab.getAttribute('data-id-acc') === tabIndex);
    if (tabTitle) {
      tabTitle.classList.remove(activeItem);
      this.slideUp(tabIndex);
    }
  }
  activateTab(tabIndex) {
    const {
      activeItem
    } = this.settings.classes;
    const tabTitle = this.elements.tabTitles.find(tab => tab.getAttribute('data-id-acc') === tabIndex);
    if (tabTitle) {
      tabTitle.classList.add(activeItem);
      this.slideDown(tabIndex);
    }
  }
  removeListeners() {
    this.eventListeners.forEach(({
      element,
      handler
    }) => {
      element.removeEventListener('click', handler);
    });
    this.eventListeners = [];
  }
  defaultActiveTab() {
    const {
      initialOpen
    } = this.settings;
    if (initialOpen > 0) {
      this.activateTab((initialOpen - 1).toString());
    }
  }
  slideDown(tabIndex) {
    const tabContent = this.elements.tabContents.find(tab => tab.parentElement.getAttribute('data-id-acc') === tabIndex);
    const contentHeight = tabContent.scrollHeight;
    this.isAnimating = true;

    // Set initial height and transition
    tabContent.style.height = '0px';
    tabContent.style.display = 'block';
    tabContent.style.transition = 'height 0.4s ease, visibility 0.4s ease';

    // Trigger reflow and expand height
    setTimeout(() => {
      tabContent.style.height = `${contentHeight}px`;
    }, 10);

    // Clear height after transition completes
    setTimeout(() => {
      tabContent.style.height = 'auto';
      tabContent.style.transition = '';
      this.isAnimating = false;
    }, 400);
  }
  slideUp(tabIndex) {
    const tabContent = this.elements.tabContents.find(tab => tab.parentElement.getAttribute('data-id-acc') === tabIndex);
    this.isAnimating = true;
    // Set initial height and transition
    tabContent.style.height = `${tabContent.scrollHeight}px`;
    tabContent.style.transition = 'height 0.4s ease, visibility 0.4s ease';

    // Trigger reflow and collapse height
    setTimeout(() => {
      tabContent.style.height = '0px';
    }, 10);

    // Hide content after transition completes
    setTimeout(() => {
      tabContent.style.display = 'none';
      tabContent.style.transition = '';
      this.isAnimating = false;
    }, 400);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksAccordion);

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
  !*** ./src/blocks/accordion/view.js ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _accordion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./accordion */ "./src/blocks/accordion/accordion.js");

function initializeAccordion() {
  const accordionElements = document.querySelectorAll('.ablocks-block--accordion');
  accordionElements.forEach(element => {
    new _accordion__WEBPACK_IMPORTED_MODULE_0__["default"](element, false);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeAccordion();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map