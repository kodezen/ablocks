/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/tabs/tabs.js":
/*!*********************************!*\
  !*** ./src/blocks/tabs/tabs.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksTabs {
  constructor(element, editor = true, settings = {}) {
    this.tabs = element;
    this.tabsHeight = this.tabs.getBoundingClientRect().height;
    this.tabsTopHeight = this.tabs.getBoundingClientRect().top + window.scrollY;
    const dataSettings = this.getDataSettings();
    this.autoChangeInterval = null;
    this.editor = editor;
    this.progressInterval = null;
    this.settings = {
      ...this.getDefaultSettings(),
      ...dataSettings,
      ...settings
    };
    this.elements = this.getElements();
    this.eventListeners = [];
    this.bindEvents();
    this.defaultActiveTab();
    // Check if we are in the frontend, and only then start the auto change
    if (this.editor === false && this.settings.autoChange) {
      this.startAutoChange();
    }
    if (this.editor === false && this.settings.scrollChange && this.settings.tabMenuPosition !== 'top' && this.settings.tabMenuPosition !== 'bottom') {
      this.startScrollChange();
    }
    window.addEventListener('beforeunload', () => {
      this.stopAutoChange();
    });
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }
  getDefaultSettings() {
    return {
      selectors: {
        tabTitle: '.ablocks-block-tabs__tab',
        tabContent: '.ablocks-block--tabs-child',
        progressBar: '.ablocks-block-tabs__progressbar'
      },
      classes: {
        activeTitle: 'ablocks-block-tabs__tab--active',
        activeContent: 'has-child-selected'
      },
      toggleSelf: true,
      hidePrevious: true,
      autoExpand: true,
      initialOpen: 0,
      autoChange: false,
      activeDuration: 10000,
      enableHoverSwitch: false
    };
  }
  getDataSettings() {
    return {
      initialOpen: parseInt(this.tabs.getAttribute('data-initial-open')) || 0,
      autoChange: this.tabs.getAttribute('data-enable-auto-change') === 'true',
      scrollChange: this.tabs.getAttribute('data-enable-scroll-change') === 'true',
      enableHoverSwitch: this.tabs.getAttribute('data-enable-hover-switch') === 'true',
      tabMenuPosition: this.tabs.getAttribute('data-tab-menu-position'),
      activeDuration: parseInt(this.tabs.getAttribute('data-tab-active-duration')) || 10000
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
    return Array.from(this.tabs.querySelectorAll(selector));
  }
  bindEvents() {
    this.elements.tabTitles.forEach(tabTitle => {
      const tabIndex = tabTitle.getAttribute('data-tab');
      if (this.settings.enableHoverSwitch) {
        const hoverHandler = () => {
          this.changeActiveTab(tabIndex);
        };
        tabTitle.addEventListener('mouseenter', hoverHandler);
        this.eventListeners.push({
          element: tabTitle,
          handler: hoverHandler
        });
      } else {
        const clickHandler = event => {
          event.preventDefault();
          this.changeActiveTab(tabIndex);
        };
        tabTitle.addEventListener('click', clickHandler);
        this.eventListeners.push({
          element: tabTitle,
          handler: clickHandler
        });
      }
    });
  }
  changeActiveTab(tabIndex) {
    const isActive = this.isActiveTab(tabIndex);
    if (!isActive) {
      this.deactivateAllTabs();
      this.activateTab(tabIndex);
      if (this.editor === false && this.settings.autoChange) {
        clearInterval(this.autoChangeInterval);
        this.startAutoChange();
      }
    }
  }
  isActiveTab(tabIndex) {
    const {
      activeTitle
    } = this.settings.classes;
    const tabTitle = this.elements.tabTitles.find(tab => tab.getAttribute('data-tab') === tabIndex);
    return tabTitle && tabTitle.classList.contains(activeTitle);
  }
  deactivateAllTabs() {
    this.elements.tabTitles.forEach(tabTitle => {
      const tabIndex = tabTitle.getAttribute('data-tab');
      this.deactivateTab(tabIndex);
    });
  }
  deactivateTab(tabIndex) {
    const {
      activeTitle,
      activeContent
    } = this.settings.classes;
    const tabTitle = this.elements.tabTitles.find(tab => tab.getAttribute('data-tab') === tabIndex);
    const tabContent = this.elements.tabContents.find(tab => tab.getAttribute('data-tab-id') === tabIndex);
    if (tabTitle) {
      tabTitle.classList.remove(activeTitle);
    }
    if (tabContent) {
      tabContent.classList.remove(activeContent);
      tabContent.style.display = 'none';
    }
  }
  activateTab(tabIndex) {
    if (tabIndex === null) {
      return;
    }
    const {
      activeTitle,
      activeContent
    } = this.settings.classes;
    const tabTitle = this.elements.tabTitles.find(tab => tab.getAttribute('data-tab') === tabIndex);
    this.deactivateAllTabs();
    const tabContent = this.elements.tabContents[tabIndex];
    const progressBar = this.elements.tabTitles[tabIndex].querySelector(this.settings.selectors.progressBar);
    if (tabTitle) {
      tabTitle.classList.add(activeTitle);
    }
    if (tabTitle) {
      tabContent.classList.add(activeContent);
      tabContent.style.display = 'block';
    }
    this.startProgressBar(progressBar);
  }
  removeListeners() {
    this.eventListeners.forEach(({
      element,
      handler
    }) => {
      element.removeEventListener('click', handler);
      element.removeEventListener('mouseenter', handler);
    });
    this.eventListeners = [];
  }
  defaultActiveTab() {
    const {
      initialOpen
    } = this.settings;
    const {
      activeTitle,
      activeContent
    } = this.settings.classes;
    const checkActiveTitle = this.elements.tabTitles.findIndex(tab => tab.classList.contains(activeTitle));
    const checkActiveContent = this.elements.tabContents.findIndex(tab => tab.classList.contains(activeContent));
    if (initialOpen > 0 && checkActiveTitle === -1 || initialOpen > 0 && checkActiveContent === -1) {
      this.activateTab((initialOpen - 1).toString());
    }
  }
  // Add this method to handle progress bar animation
  startProgressBar(progressBar) {
    if (!progressBar) {
      return;
    }
    clearInterval(this.progressInterval);
    progressBar.style.width = `0%`;
    let progress = 0;
    this.progressInterval = setInterval(() => {
      progress += 1;
      progressBar.style.width = `${progress}%`;
      if (progress >= 100) {
        clearInterval(this.progressInterval);
      }
    }, this.settings.activeDuration / 100);
  }
  startAutoChange() {
    this.autoChangeInterval = setInterval(() => {
      const activeTabIndex = this.getActiveTabIndex();
      const nextTabIndex = (activeTabIndex + 1) % this.elements.tabTitles.length;
      this.changeActiveTab(nextTabIndex.toString());
    }, this.settings.activeDuration);
  }
  startScrollChange() {
    const onScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      let activatedTabIndex = null;
      this.elements.tabTitles.forEach((tabTitle, index) => {
        const tabTop = tabTitle.getBoundingClientRect().top + window.scrollY;
        if (scrollPosition > tabTop) {
          activatedTabIndex = index;
        }
      });
      if (activatedTabIndex !== null) {
        this.changeActiveTab(activatedTabIndex.toString());
      }
    };
    window.addEventListener('scroll', onScroll);
    this.eventListeners.push({
      element: window,
      handler: onScroll
    });
  }
  getActiveTabIndex() {
    const {
      activeTitle
    } = this.settings.classes;
    const activeTab = this.elements.tabTitles.findIndex(tab => tab.classList.contains(activeTitle));
    return activeTab !== -1 ? activeTab : 0;
  }
  stopAutoChange() {
    if (this.autoChangeInterval) {
      clearInterval(this.autoChangeInterval);
      this.autoChangeInterval = null;
    }
  }
  handleVisibilityChange() {
    if (document.hidden) {
      this.stopAutoChange();
    } else if (this.editor === false && this.settings.autoChange) {
      this.startAutoChange();
    }
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksTabs);

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
/*!*********************************!*\
  !*** ./src/blocks/tabs/view.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tabs */ "./src/blocks/tabs/tabs.js");

function initializeTabs() {
  const tabsElements = document.querySelectorAll('.ablocks-block-tabs');
  tabsElements.forEach(element => {
    new _tabs__WEBPACK_IMPORTED_MODULE_0__["default"](element, false);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializeTabs();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map