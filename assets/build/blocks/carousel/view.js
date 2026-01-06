/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/carousel/carousel.js":
/*!*****************************************!*\
  !*** ./src/blocks/carousel/carousel.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function ablocksCarousel(element, isFrontend) {
  if (!element) {
    return null;
  }
  const swiperContainer = element?.querySelector('.ablocks-carousel-swiper');
  const prevButton = element?.querySelector('.ablocks-carousel-navigation__button--prev');
  const nextButton = element?.querySelector('.ablocks-carousel-navigation__button--next');
  const swiperPagination = element?.querySelector('.ablocks-carousel-pagination');
  const swiperOptions = swiperContainer?.getAttribute('data-swiper-options');
  const swiperFrontendOptions = swiperContainer?.getAttribute('data-swiper-frontend-options');
  const swiperSlidesPerView = JSON.parse(swiperContainer?.getAttribute('data-swiper-slides-per-view'));
  const swiperGap = JSON.parse(swiperContainer?.getAttribute('data-swiper-gap'));
  const progressCircle = element?.querySelector('.ablocks-carousel-autoplay-progress svg');
  const progressContent = element?.querySelector('.ablocks-carousel-autoplay-progress span');
  const parsedSwiperOptions = JSON.parse(swiperOptions);
  const parsedSwiperFrontendOptions = JSON.parse(swiperFrontendOptions);
  const newParsedSwiperOptions = {
    navigation: {
      nextEl: nextButton,
      prevEl: prevButton,
      disabledClass: 'ablocks-carousel-navigation__button--disabled'
    },
    pagination: {
      el: swiperPagination,
      clickable: !!parsedSwiperOptions.paginationClickable
    }
  };
  if (swiperContainer) {
    // eslint-disable-next-line
    const swiperInstance = new Swiper(swiperContainer, {
      observer: true,
      observeParents: true,
      ...newParsedSwiperOptions,
      ...parsedSwiperFrontendOptions,
      breakpoints: isFrontend && parsedSwiperFrontendOptions?.effect === 'slide' ? {
        0: {
          slidesPerView: swiperSlidesPerView.valueMobile,
          spaceBetween: swiperGap.valueMobile
        },
        480: {
          slidesPerView: swiperSlidesPerView.valueTablet,
          spaceBetween: swiperGap.valueTablet
        },
        840: {
          slidesPerView: swiperSlidesPerView.value,
          spaceBetween: swiperGap.value
        }
      } : {},
      on: {
        autoplayTimeLeft(s, time, progress) {
          if (progressCircle) {
            progressCircle.style.setProperty('--progress', 1 - progress);
          }
          if (progressContent) {
            progressContent.textContent = `${Math.ceil(time / 1000)}s`;
          }
        }
      }
    });
    return swiperInstance;
  }
  return null;
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ablocksCarousel);

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
/*!*************************************!*\
  !*** ./src/blocks/carousel/view.js ***!
  \*************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _carousel__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./carousel */ "./src/blocks/carousel/carousel.js");

// Function to initialize ABlocksCounter for each .ablocks-block--counter element
function ABlocksCarouselInit() {
  const counterElements = document.querySelectorAll('.ablocks-block--carousel');
  counterElements.forEach(element => {
    (0,_carousel__WEBPACK_IMPORTED_MODULE_0__["default"])(element, true);
  });
}

// Initialize counters when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  ABlocksCarouselInit();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map