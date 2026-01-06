/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/form-builder/form-builder.js":
/*!*************************************************!*\
  !*** ./src/blocks/form-builder/form-builder.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _view_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../view-helper */ "./src/blocks/view-helper.js");

class FormBuilder {
  constructor(element) {
    this.form = element?.querySelector('form.ablocks-form-builder');
    this.formParent = this.form?.parentNode;
    this.submitButtonDiv = element?.querySelector('.ablocks-form-builder__submit-button');
    this.submitButton = this.form.querySelector('button[type="submit"]');
    this.submitButtonText = this.submitButton?.innerText;
    this.init();
  }
  init() {
    this.form.querySelector('input[name="security"]').setAttribute('value', _view_helper__WEBPACK_IMPORTED_MODULE_0__.ablocks_nonce);
    this.feedbackContainer = this.formParent.querySelector('.ablocks-block--form-builder__feedback-message');
    this.feedbackContainer.style.display = 'none';
    this.form.addEventListener('submit', this.handleSubmit.bind(this));
  }
  async handleSubmit(event) {
    event.preventDefault();
    const hasError = this.validateFields();
    if (!hasError) {
      const multistepForm = this.form?.querySelector('.ablocks-block--form-multi-step');
      if (!multistepForm) {
        this.setLoadingState(true);
      }
      const formData = new FormData(this.form);
      const data = Object.fromEntries(formData);
      this.collectCheckedOptionsText(formData);
      try {
        const response = await (0,_view_helper__WEBPACK_IMPORTED_MODULE_0__.makeRequest)(formData);
        if (response) {
          this.handleResponse(response);
        }
      } catch (error) {
        this.showFeedbackMessage('An error occurred. Please try again.', 'error');
      } finally {
        this.setLoadingState(false);
      }
    }
  }
  collectFieldLabels(formData) {
    const fields = this.form.querySelectorAll('.ablocks-form-builder__field');
    fields.forEach(field => {
      const inputs = field.querySelectorAll('input, textarea, select');
      const label = field.querySelector('.ablocks-form-builder__label');
      inputs.forEach(input => {
        if (input && input.name) {
          let labelText = '';
          const inputType = input.tagName.toLowerCase();
          if (label && label.textContent.trim()) {
            labelText = label.textContent.trim();
          } else if (input.placeholder) {
            labelText = input.placeholder;
          } else {
            labelText = input.name;
          }
          formData.append(`${input.name}_label`, labelText);
          formData.append(`${input.name}_inputType`, inputType);
        }
      });
    });
  }
  validateFields() {
    let hasError = false;
    const fields = this.form.querySelectorAll('.ablocks-form-builder__field');
    fields.forEach(field => {
      const isRequired = field.getAttribute('data-required') === 'true';
      const input = field.querySelector('input, textarea');
      const select = field.querySelector('select');
      const checkbox = field.querySelector('input[type="checkbox"]');
      const radio = field.querySelector('input[type="radio"]');
      const isCheckboxGroup = field.querySelectorAll('.ablocks-form-builder__radio-option');
      const radioButtonChecked = field.querySelector('input[type="radio"]:checked');
      let isValid = true;
      if (isCheckboxGroup?.length >= 1) {
        const minimumValue = parseInt(field?.getAttribute('data-minimum-value'));
        const maximumValue = parseInt(field?.getAttribute('data-maximum-value'));
        const checkedCount = Array.from(isCheckboxGroup).filter(option => option.classList.contains('checked')).length;
        if (minimumValue > checkedCount && isRequired) {
          this.showFeedbackMessage(`At Least Select ${minimumValue} Value`, 'error');
          isValid = false;
        } else if (maximumValue < checkedCount && isRequired) {
          isValid = false;
          this.showFeedbackMessage(`Never Select More Than ${maximumValue} Value`, 'error');
        } else if (isRequired && checkedCount < 1) {
          this.showFeedbackMessage(`Checkbox Field Are Required`, 'error');
          isValid = false;
        }
      }

      // Field validation
      if (isRequired) {
        if (checkbox && isCheckboxGroup.length === 0 && !checkbox.checked) {
          // Only validate single checkbox, not checkbox groups
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
      if (!isValid) {
        hasError = true;
      }
    });
    return hasError;
  }

  // Collect text of checked options for checkboxes and radio buttons
  collectCheckedOptionsText(data) {
    const fields = this.form.querySelectorAll('.ablocks-form-builder__field');
    fields.forEach(field => {
      const checkboxGroup = field.querySelectorAll('.ablocks-form-builder__radio-option');
      const radioGroup = field.querySelectorAll('input[type="radio"]');

      // Collect text for checked checkbox options
      if (checkboxGroup.length > 0) {
        const checkedOptionsText = [];
        checkboxGroup.forEach(option => {
          if (option.classList.contains('checked')) {
            checkedOptionsText.push(option.innerText.trim());
          }
        });
        if (checkedOptionsText.length > 0) {
          const checkboxName = field.querySelector('input[type="checkbox"]')?.name;
          if (checkboxName) {
            data[checkboxName] = checkedOptionsText.join(', ');
          }
        }
      }

      // Collect text for checked radio options
      if (radioGroup.length > 0) {
        const selectedRadio = Array.from(radioGroup).find(radio => radio.checked);
        if (selectedRadio) {
          const radioName = selectedRadio.name;
          const radioText = selectedRadio.parentElement.innerText.trim(); // Assuming text is in the parent element
          data[radioName] = radioText;
        }
      }
    });
  }
  setLoadingState(isLoading) {
    // Store the button height before making changes
    if (!this.originalButtonHeight && this.submitButton) {
      this.originalButtonHeight = this.submitButton.offsetHeight;
    }
    if (isLoading) {
      this.submitButton.innerText = ''; // Clear the text
      this.submitButton.classList.add('loading');
      this.submitButton.style.height = `${this.originalButtonHeight}px`; // Set the height explicitly
    } else {
      this.submitButton.innerText = this.submitButtonText; // Restore original text
      this.submitButton.classList.remove('loading');
      this.submitButton.style.height = ''; // Remove the height style to allow auto height adjustment
    }
  }
  handleResponse(response) {
    const success = response?.data?.success;
    const message = success ? response?.data?.data?.confirmationNotice : response?.data?.data?.message;
    const afterFormSubmission = response?.data?.data?.afterFormSubmission;
    const confirmationType = response?.data?.data?.confirmationType;
    const feedbackType = success ? 'success' : 'error';
    const feedbackMessage = message;
    const redirect_url = response?.data?.data?.redirect_url;
    const newTab = response?.data?.data?.link_target;
    const formType = response?.data?.data?.formType;
    if (confirmationType === 'success' || newTab) {
      this.showFeedbackMessage(feedbackMessage, feedbackType);
    }
    if (success && redirect_url && confirmationType === 'redirect') {
      if (newTab) {
        // Open the URL in a new tab if newTab is true
        this.form.reset();
        window.open(redirect_url, '_blank');
        if (afterFormSubmission === 'hide') {
          this.form.style.display = 'none';
        }
        if (formType === 'login' || formType === 'registration') {
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } else if (formType === 'login' || formType === 'registration') {
        this.showFeedbackMessage(feedbackMessage, feedbackType);
        setTimeout(() => {
          window.location.href = redirect_url;
        }, 2000);
      } else {
        window.location.href = redirect_url;
      }
    } else if (success === true && afterFormSubmission === 'reset') {
      this.form.reset();
      // Reload page for login/registration forms
      if (formType === 'login' || formType === 'registration') {
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        setTimeout(() => {
          this.feedbackContainer.style.display = 'none';
        }, 20000);
      }
    } else if (success === true && afterFormSubmission === 'hide') {
      this.form.reset();
      this.form.style.display = 'none';
      setTimeout(() => {
        this.form.style.display = 'flex';
        this.feedbackContainer.style.display = 'none';
      }, 20000);
    }
  }
  showFeedbackMessage(message, type) {
    this.feedbackContainer.style.display = 'block';
    this.feedbackContainer.innerHTML = `<p class="${type}-msg">${message}</p>`;
    this.feedbackContainer.className = 'ablocks-block--form-builder__feedback-message'; // Reset classes
    this.feedbackContainer.classList.add('ablocks-block--form-builder__' + type);
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (FormBuilder);

/***/ }),

/***/ "./src/blocks/view-helper.js":
/*!***********************************!*\
  !*** ./src/blocks/view-helper.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ablocks_nonce: () => (/* binding */ ablocks_nonce),
/* harmony export */   addons: () => (/* binding */ addons),
/* harmony export */   admin_url: () => (/* binding */ admin_url),
/* harmony export */   ajax_url: () => (/* binding */ ajax_url),
/* harmony export */   blocks_status: () => (/* binding */ blocks_status),
/* harmony export */   is_fse_theme: () => (/* binding */ is_fse_theme),
/* harmony export */   is_pro: () => (/* binding */ is_pro),
/* harmony export */   makeRequest: () => (/* binding */ makeRequest),
/* harmony export */   menu: () => (/* binding */ menu),
/* harmony export */   namespace: () => (/* binding */ namespace),
/* harmony export */   nonce: () => (/* binding */ nonce),
/* harmony export */   plugin_root_path: () => (/* binding */ plugin_root_path),
/* harmony export */   plugin_root_url: () => (/* binding */ plugin_root_url),
/* harmony export */   post_types: () => (/* binding */ post_types),
/* harmony export */   rest_url: () => (/* binding */ rest_url),
/* harmony export */   route_path: () => (/* binding */ route_path),
/* harmony export */   settings: () => (/* binding */ settings),
/* harmony export */   site_url: () => (/* binding */ site_url),
/* harmony export */   theme_builder: () => (/* binding */ theme_builder),
/* harmony export */   third_party_plugin_status: () => (/* binding */ third_party_plugin_status),
/* harmony export */   toplevel_menu_icon_url: () => (/* binding */ toplevel_menu_icon_url)
/* harmony export */ });
var _window$ABlocksGlobal;
const {
  ajax_url,
  namespace,
  plugin_root_path,
  plugin_root_url,
  is_pro,
  route_path,
  menu,
  nonce,
  addons,
  ablocks_nonce,
  rest_url,
  toplevel_menu_icon_url,
  third_party_plugin_status,
  settings,
  site_url,
  blocks_status,
  theme_builder,
  admin_url,
  is_fse_theme,
  post_types
} = (_window$ABlocksGlobal = window.ABlocksGlobal) !== null && _window$ABlocksGlobal !== void 0 ? _window$ABlocksGlobal : {};
async function makeRequest(payload = {}, isRaw = false) {
  const isFormData = payload instanceof FormData;
  const form_data = isFormData ? payload : new FormData();
  form_data.append('security', ablocks_nonce);
  if (!isFormData) {
    Object.entries(payload).forEach(([key, value]) => {
      if (value instanceof File || value instanceof Blob) {
        form_data.append(key, value);
      } else if (!isRaw && typeof value === 'object' && value !== null) {
        form_data.append(key, JSON.stringify(value));
      } else {
        form_data.append(key, value);
      }
    });
  }
  try {
    const response = await fetch(ajax_url, {
      method: 'POST',
      body: form_data
    });
    const contentType = response.headers.get('Content-Type') || '';
    if (contentType.includes('application/json')) {
      const data = await response.json();
      return {
        status: response.status,
        data
      };
    }
    const text = await response.text();
    return {
      status: response.status,
      data: text
    };
  } catch (error) {
    return {
      status: 0,
      error: error.message
    };
  }
}

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
/*!*****************************************!*\
  !*** ./src/blocks/form-builder/view.js ***!
  \*****************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _form_builder__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./form-builder */ "./src/blocks/form-builder/form-builder.js");

function initializeCounters() {
  const formBlocks = document.querySelectorAll('.ablocks-block--form-builder');
  formBlocks?.forEach(formBlock => {
    new _form_builder__WEBPACK_IMPORTED_MODULE_0__["default"](formBlock);
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