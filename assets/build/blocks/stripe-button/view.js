/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
/*!******************************************!*\
  !*** ./src/blocks/stripe-button/view.js ***!
  \******************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./../view-helper */ "./src/blocks/view-helper.js");

function initialStripeButton() {
  const stripeButtons = document.querySelectorAll('.ablocks-stripe-form');
  stripeButtons.forEach(form => {
    const blockId = form.getAttribute('data-ablocks__block-id');
    const currentPostId = form.getAttribute('data-ablocks__post-id');
    const openInNewTab = form.getAttribute('data-ablocks__open-new-tab');
    const errorMessage = form.getAttribute('data-ablocks__error-msg');
    form.querySelector('input[name="current_url"]').value = window.location.href;
    form.addEventListener('submit', event => {
      event.preventDefault();
      (0,_view_helper__WEBPACK_IMPORTED_MODULE_0__.makeRequest)({
        action: 'ablocks/stripe_payment_process',
        block_id: blockId,
        current_post_id: currentPostId
      }).then(res => {
        const response = res.data;
        if (response.success) {
          // eslint-disable-next-line
          if (openInNewTab == 'true') {
            window.open(response.data.redirect_url, '_blank');
          } else {
            window.open(response.data.redirect_url, '_self');
          }
        } else {
          displayErrorMessage(form, errorMessage);
        }
      });
    });
  });
}

// Display error message
function displayErrorMessage(form, errorMessage) {
  const errorElement = form.querySelector('.ablocks-stripe-button__error');
  errorElement.innerHTML = errorMessage;
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initialStripeButton();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map