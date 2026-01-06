/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/blocks/player/player.js":
/*!*************************************!*\
  !*** ./src/blocks/player/player.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class ABlocksPlayer {
  constructor(element) {
    this.element = element;
    this.youtube = element.querySelector('#youtube');
    this.selfHostedVideo = element.querySelector('#selfHostedVideo');
    this.audio = element.querySelector('#audio');
    this.vimeo = element.querySelector('#vimeo');
    if (this.youtube) {
      const autoplay = this.youtube.getAttribute('data-autoplay') === 'true';
      const muted = this.youtube.getAttribute('data-mute') === 'true';
      const loop = this.youtube.getAttribute('data-loop') === 'true';
      const shouldMute = autoplay ? true : muted;
      this.originalMuteState = muted;
      this.mainPlayer = new Plyr(this.youtube, {
        autoplay,
        muted: shouldMute,
        loop: {
          active: loop
        }
      });
      this.configureYouTube();
    } else if (this.selfHostedVideo) {
      this.mainPlayer = new Plyr(this.selfHostedVideo);
    } else if (this.vimeo) {
      const autoplay = this.vimeo.getAttribute('data-autoplay') === 'true';
      const muted = this.vimeo.getAttribute('data-mute') === 'true';
      const loop = this.vimeo.getAttribute('data-loop') === 'true';
      const shouldMute = autoplay ? true : muted;
      this.originalMuteState = muted;
      this.mainPlayer = new Plyr(this.vimeo, {
        autoplay,
        muted: shouldMute,
        loop: {
          active: loop
        }
      });
    } else if (this.audio) {
      this.mainPlayer = new Plyr(this.audio);
    }
    if (this.mainPlayer) {
      const wrapper = element.querySelector('.plyr');
      if (wrapper) {
        this.insertPlayButton(wrapper);
      }
      this.mainPlayer.on('playing', () => {
        this.hidePlayButton();
        if (!this.originalMuteState && this.mainPlayer.muted) {
          this.mainPlayer.muted = false;
        }
      });
      this.mainPlayer.on('pause', () => this.showPlayButton());
      this.mainPlayer.on('ended', () => this.showPlayButton());
      this.mainPlayer.on('ready', () => {
        const controls = this.element.querySelectorAll('.plyr__control');
        controls.forEach(control => {
          control.addEventListener('click', () => {
            if (!this.originalMuteState && this.mainPlayer.muted) {
              this.mainPlayer.muted = false;
            }
          });
        });
      });
    }
  }
  configureYouTube() {
    this.videoStartTime = this.parseTime(this.youtube.getAttribute('data-video-start-time'));
    this.videoEndTime = this.parseTime(this.youtube.getAttribute('data-video-end-time'));
    this.mainPlayer.on('ready', () => {
      if (!isNaN(this.videoStartTime)) {
        this.mainPlayer.currentTime = this.videoStartTime;
      }
    });
    this.mainPlayer.on('timeupdate', () => {
      if (!isNaN(this.videoEndTime) && this.mainPlayer.currentTime >= this.videoEndTime) {
        this.mainPlayer.pause();
      }
    });
  }
  insertPlayButton(wrapper) {
    const btn = document.createElement('div');
    btn.className = 'ablocks-play-pause-button';
    wrapper.appendChild(btn);
    this.playButton = btn;
    btn.addEventListener('click', () => {
      if (!this.originalMuteState && this.mainPlayer.muted) {
        this.mainPlayer.muted = false;
      }
      this.mainPlayer.togglePlay();
    });
  }
  hidePlayButton() {
    this.playButton?.classList.add('is-hidden');
  }
  showPlayButton() {
    this.playButton?.classList.remove('is-hidden');
  }
  parseTime(str) {
    if (!str) {
      return NaN;
    }
    return str.split(':').reverse().reduce((s, p, i) => s + parseFloat(p) * 60 ** i, 0);
  }
  destroy() {
    this.mainPlayer?.destroy();
  }
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ABlocksPlayer);

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
/*!***********************************!*\
  !*** ./src/blocks/player/view.js ***!
  \***********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/blocks/player/player.js");

function initializePlayer() {
  const accordionElements = document.querySelectorAll('.ablocks-block--player');
  accordionElements.forEach(element => {
    new _player__WEBPACK_IMPORTED_MODULE_0__["default"](element, false);
  });
}
document.addEventListener('DOMContentLoaded', () => {
  initializePlayer();
});
})();

/******/ })()
;
//# sourceMappingURL=view.js.map