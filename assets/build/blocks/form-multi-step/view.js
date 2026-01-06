/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/form-multi-step/multiForm.js":
/*!*************************************************!*\
  !*** ./src/blocks/form-multi-step/multiForm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlockFormMultiStep {
  constructor(element, editor = false) {
    const multiStepWrapper = element.querySelector('.ablocks-form-multi-step');
    const totalSteps = multiStepWrapper.getAttribute('data-step');
    this.totalSteps = totalSteps;
    this.editor = editor;
    this.childElements = element.querySelectorAll('.ablocks-form-multi-step-child');
    this.formStepsBtn = element?.querySelectorAll('.ablocks-form-multi-step__step-wrapper');
    const currentActive = 0;
    this.currentActive = currentActive;
    const prevButton = element?.querySelector('.ablocks-form-multi-step__prev-btn');
    this.prevButton = prevButton;
    const nextButton = element?.querySelector('.ablocks-form-multi-step__next-btn');
    this.nextButton = nextButton;
    this.handleCurrentActive(currentActive);
    prevButton?.addEventListener('click', () => this.handlePrevClick(currentActive));
    nextButton?.addEventListener('click', () => this.handleNextClick(currentActive));
  }
  handleCurrentActive = function (currentActive) {
    if (Number(this.totalSteps) === 1 || this.currentActive + 1 === Number(this.totalSteps)) {
      this.nextButton.innerText = 'Submit';
    } else {
      this.nextButton.innerText = 'Next 🡢';
      this.nextButton.type = 'button'; // Ensure it remains a regular button
    }
    if (currentActive === 0 && this.prevButton) {
      this.prevButton.style.display = 'none';
    } else if (currentActive > 0 && this.prevButton) {
      this.prevButton.style.display = 'block';
    }
    this.formStepsBtn?.forEach(step => step.classList.remove('ablocks-form-multi-step__step--active'));
    this.formStepsBtn[currentActive]?.classList.add('ablocks-form-multi-step__step--active');
    this.childElements?.forEach(element => element.classList.remove('ablocks-form-multi-step-child--active'));
    this.childElements[currentActive]?.classList.add('ablocks-form-multi-step-child--active');
  };
  handlePrevClick = function () {
    this.currentActive -= 1;
    this.handleCurrentActive(this.currentActive);
  };
  handleNextClick = function () {
    if (this.currentActive + 1 >= Number(this.totalSteps)) {
      if (this.editor === false) {
        this.nextButton.type = 'submit';
        this.nextButton.classList.add('ablocks-form-builder__submit-button');
      }
      return;
    }
    this.nextButton.classList.remove('ablocks-form-builder__submit-button');
    const currentChild = this.childElements[this.currentActive];
    const fields = currentChild.querySelectorAll('.ablocks-form-builder__field');
    let isValid = true;
    fields.forEach(field => {
      const isRequired = field.getAttribute('data-required') === 'true';
      const input = field.querySelector('input, textarea');
      const select = field.querySelector('select');
      const checkbox = field.querySelector('input[type="checkbox"]');
      const radio = field.querySelector('input[type="radio"]');
      const isCheckboxGroup = field.querySelectorAll('.ablocks-form-builder__radio-option');
      const radioButtonChecked = field.querySelector('input[type="radio"]:checked');

      // Validation for checkbox group
      if (isCheckboxGroup?.length >= 1) {
        const minimumValue = parseInt(field?.getAttribute('data-minimum-value'));
        const maximumValue = parseInt(field?.getAttribute('data-maximum-value'));
        const checkedCount = Array.from(isCheckboxGroup).filter(option => option.classList.contains('checked')).length;
        if (minimumValue > checkedCount && isRequired) {
          // this.showFeedbackMessage(`At Least Select ${minimumValue} Value`,'error')
          isValid = false;
        } else if (maximumValue < checkedCount && isRequired) {
          isValid = false;
          // this.showFeedbackMessage(`Never Select More Than ${maximumValue} Value`,'error')
        } else if (isRequired && checkedCount < 1) {
          // this.showFeedbackMessage(`Checkbox Field Are Required`,'error')
          isValid = false;
        }
      }

      // Field validation
      if (isRequired) {
        if (checkbox && !checkbox.checked) {
          isValid = false;
        } else if (radio && !radioButtonChecked) {
          isValid = false;
        } else if (input && input.value.trim() === '') {
          isValid = false;
        } else if (select && select.value === '') {
          isValid = false;
        }
      }
      field.classList.toggle('error-msg', !isValid);
    });
    if (!isValid) {
      // Prevent advancing if the inputs are invalid
      return;
    }
    this.currentActive += 1;
    this.handleCurrentActive(this.currentActive);
  };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlockFormMultiStep);

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
/*!********************************************!*\
  !*** ./src/blocks/form-multi-step/view.js ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _multiForm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./multiForm */ "./src/blocks/form-multi-step/multiForm.js");

function initializeCounters() {
  const formStepsElement = document.querySelectorAll('.ablocks-block--form-multi-step');
  formStepsElement.forEach(element => {
    new _multiForm__WEBPACK_IMPORTED_MODULE_0__["default"](element, false);
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