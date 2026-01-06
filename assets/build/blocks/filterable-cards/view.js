/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/filterable-cards/filterable.js":
/*!***************************************************!*\
  !*** ./src/blocks/filterable-cards/filterable.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class FilterableCards {
  constructor(element) {
    this.element = element;
    if (this.element) {
      this.filterButtons = this.element.querySelectorAll('.filterable-filter-button');
      this.cardsItems = [...this.element.querySelectorAll('.ablocks-block--filterable-cards-item')];
      this.showMoreButton = this.element.querySelector('.filterable-cards-showMore-button');
      this.searchInput = this.element.querySelector('.filterable-searchInput');
      this.searchToggleBtn = this.element.querySelector('.filterable-search-toggle-btn');
      this.filterListDropdown = this.element.querySelector('.filterable-cards_filter-list-dropdown');
      this.filterSearchNoItemText = this.element.querySelector('.filterable-search-item-not-found-text');
      this.searchFilterS = this.element.querySelector('.filterable-search-select');
      this.firstCategory = this.filterButtons[0]?.dataset.category?.toLowerCase() || 'all';
      this.showItemNumber = parseInt(this.element?.getAttribute('itemShows') || '0', 10);
      this.animation = this.element?.dataset.animation || 'fade-in';
      this.layout = this.element?.dataset.layout || 'filter';
      this.animationDuration = this.element?.dataset.animationDuration;
      this.perPageShowCardNumber = parseInt(this.showMoreButton?.dataset.perPage || '0', 10);
      this.noMoreText = this.showMoreButton?.dataset.noItemText || 'No more items.';
      this.loadMoreText = this.showMoreButton?.dataset.moreButtonText || 'Show More';
      this.currentlyShown = this.showItemNumber;
      this.animationDuration = parseInt(this.element?.getAttribute('data-duration') || '500', 10);
      this.enableFilter = this.element?.getAttribute('data-enableFilter') === 'true';
      this.init();
    }
  }
  filterCards(searchTerm, category) {
    let itemsShown = 0;
    const shouldSearch = this.layout === 'filter&search';
    this.cardsItems.forEach(item => {
      const itemCategory = item.dataset.category?.toLowerCase() || '';
      const headingText = item.querySelector('h1, h2, h3, h4, h5, h6')?.textContent.trim().toLowerCase() || '';
      const isMatch = searchTerm ? headingText.includes(searchTerm.toLowerCase()) : true;
      const isMatchingCategory = category === this.firstCategory || itemCategory === category;
      this.toggleItem(item, (shouldSearch ? isMatch : true) && isMatchingCategory && itemsShown < this.currentlyShown);
      if ((shouldSearch ? isMatch : true) && isMatchingCategory) {
        itemsShown++;
      }
    });
    if (this.enableFilter) {
      this.filterSearchNoItemText.style.display = itemsShown ? 'none' : 'block';
      this.toggleShowMoreButton(category, searchTerm);
    } else {
      this.toggleShowMoreButton('all', searchTerm);
    }
  }
  applyFilter(category, resetCount = true) {
    const searchTerm = this.searchInput?.value.trim().toLowerCase() || '';
    if (resetCount) {
      this.currentlyShown = this.showItemNumber;
    }
    this.filterCards(searchTerm, category);
  }
  toggleItem(item, show) {
    item.classList.toggle(this.animation, show);
    item.style.display = show ? 'block' : 'none';
    item.style.visibility = show ? 'visible' : 'hidden';
  }
  toggleShowMoreButton(category, searchTerm = '') {
    const searchLower = searchTerm.toLowerCase();
    const shouldSearch = this.layout === 'filter&search';
    const visibleItems = this.cardsItems.filter(item => {
      const itemCategory = item.dataset.category?.toLowerCase() || '';
      const headings = item.querySelectorAll('h1, h2, h3, h4, h5, h6');
      const isHeadingMatch = shouldSearch ? [...headings].some(heading => heading.textContent.trim().toLowerCase().includes(searchLower)) : true;
      return (category === this.firstCategory || itemCategory === category) && isHeadingMatch;
    });
    // eslint-disable-next-line
    const remainingItems = visibleItems.slice(this.currentlyShown);
    if (this.showMoreButton) {
      if (visibleItems.length <= this.showItemNumber) {
        this.showMoreButton.style.visibility = 'hidden';
        return;
      }
      if (remainingItems.length > 0) {
        this.showMoreButton.style.visibility = 'visible';
        this.showMoreButton.innerText = this.loadMoreText || 'Show More';
      } else {
        setTimeout(() => {
          this.showMoreButton.innerText = this.noMoreText || 'No more items.';
          setTimeout(() => {
            this.showMoreButton.style.visibility = 'hidden';
          }, 2000);
        }, 1000);
      }
    }
  }
  handleButtonClick(event) {
    const button = event.target.closest('.filterable-filter-button');
    if (!button) {
      return;
    }
    const category = button.dataset.category?.toLowerCase() || 'all';
    this.applyFilter(category);
    this.filterButtons.forEach(el => el.classList.remove('filterable-filter-button-active'));
    button.classList.add('filterable-filter-button-active');
    if (this.searchFilterS) {
      this.searchFilterS.innerText = button.textContent;
      this.filterListDropdown.style.display = 'none';
    }
  }
  handleShowMoreClick() {
    this.currentlyShown += this.perPageShowCardNumber;
    const activeButton = [...this.filterButtons].find(button => button.classList.contains('filterable-filter-button-active')) || this.filterButtons[0];
    if (activeButton) {
      const category = activeButton.dataset.category?.toLowerCase() || 'all';
      this.applyFilter(category, false);
    } else {
      this.applyFilter('all', false);
    }
  }
  handleSearchInput(event) {
    const searchTerm = event.target.value.trim().toLowerCase();
    const activeButton = [...this.filterButtons].find(button => button.classList.contains('filterable-filter-button-active')) || this.filterButtons[0];
    const category = activeButton.dataset.category?.toLowerCase() || 'all';
    this.filterCards(searchTerm, category);
  }
  initializeActiveButton() {
    const activeButton = [...this.filterButtons].find(button => button.classList.contains('filterable-filter-button-active')) || this.filterButtons[0];
    if (activeButton) {
      this.applyFilter(activeButton.dataset.category?.toLowerCase() || 'all');
      activeButton.classList.add('filterable-filter-button-active');
    } else {
      this.applyFilter('all');
    }
  }
  toggleSearchDropdown() {
    this.searchToggleBtn?.addEventListener('click', () => {
      const isHidden = this.filterListDropdown.style.display === 'none' || !this.filterListDropdown.style.display;
      this.filterListDropdown.style.display = isHidden ? 'block' : 'none';
    });
  }
  setAnimationDuration() {
    if (this.cardsItems) {
      this.cardsItems.forEach(item => {
        item.style.setProperty('--animation-duration', `${this.animationDuration}ms`);
      });
    }
  }
  init() {
    this.setAnimationDuration();
    this.filterButtons.forEach(button => button.addEventListener('click', e => this.handleButtonClick(e)));
    this.showMoreButton?.addEventListener('click', () => this.handleShowMoreClick());
    this.searchInput?.addEventListener('input', e => this.handleSearchInput(e));
    this.initializeActiveButton();
    this.toggleSearchDropdown();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FilterableCards);

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
  !*** ./src/blocks/filterable-cards/view.js ***!
  \*********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _filterable__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./filterable */ "./src/blocks/filterable-cards/filterable.js");

document.addEventListener('DOMContentLoaded', () => {
  const filterableContainers = document.querySelectorAll('.ablocks-block--filterable-cards');
  filterableContainers.forEach(element => {
    new _filterable__WEBPACK_IMPORTED_MODULE_0__["default"](element);
  });
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map