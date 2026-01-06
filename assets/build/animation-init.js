/******/ (() => { // webpackBootstrap
/*!*******************************!*\
  !*** ./src/animation-init.js ***!
  \*******************************/
document.addEventListener("DOMContentLoaded", () => {
  if (!window.ABlocksAnimationSettings) return;
  const blocks = document.querySelectorAll(".ablocks-block");
  const device = getDevice();
  gsap.registerPlugin(ScrollTrigger);
  blocks.forEach(block => {
    const classes = Array.from(block.classList);
    const blockIdClass = classes.find(cls => cls.startsWith("ablocks-block-") && !cls.startsWith("ablocks-block--"));
    if (!blockIdClass) return;
    const blockId = blockIdClass.replace("ablocks-block-", "");
    const settingGroups = ABlocksAnimationSettings[blockId];
    if (!settingGroups) return;
    const triggerConfigs = settingGroups.flat();
    const triggerEl = block;
    const targetEl = block;
    triggerConfigs.forEach(config => {
      const triggerType = config.trigger;
      const actions = config.actions || [];
      if (!isDeviceAllowed(config?.settings || {}, device)) return;
      if (triggerType === "click") {
        let clickCount = 0;
        triggerEl.addEventListener("click", () => {
          clickCount++;
          const actionIndex = clickCount % 2 === 1 ? 0 : 1;
          const selectedAction = actions[actionIndex];
          if (selectedAction) {
            ABlocksRunActions(config, targetEl, [selectedAction]);
          }
        });
      }
      if (triggerType === "whileScroll") {
        ScrollTrigger.getAll().forEach(t => t.kill());
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: targetEl,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
        actions.forEach(action => {
          // Ensure from and to exist
          if (action.from && action.to) {
            tl.fromTo(targetEl, action.from, action.to, 0);
          }
        });
      }
      if (triggerType === "scroll") {
        if (config?.settings?.isSplit) {
          var _config$settings$stag;
          const splitElements = ABlocksSplitTextElement(triggerEl, config?.settings?.splitType);
          gsap.fromTo(splitElements, config.actions[0].from, {
            ...config.actions[0].to,
            stagger: (_config$settings$stag = config.settings.stagger) !== null && _config$settings$stag !== void 0 ? _config$settings$stag : 0.1,
            scrollTrigger: {
              trigger: triggerEl,
              start: "top 80%",
              end: "bottom 20%",
              scrub: true
            }
          });
        } else {
          ScrollTrigger.create({
            trigger: triggerEl,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              const action = actions[0];
              if (action) ABlocksRunSingleAction(config, triggerEl, action);
            },
            onLeaveBack: () => {
              const action = actions[1] || actions[0];
              if (action) ABlocksRunSingleAction(config, triggerEl, action);
            }
          });
        }
      }
      if (triggerType === "mousemove") {
        triggerEl.addEventListener("mousemove", e => {
          const rect = triggerEl.getBoundingClientRect();
          const x = (e.clientX - rect.left) / rect.width;
          const y = (e.clientY - rect.top) / rect.height;
          actions.forEach(action => {
            const newFrom = {
              ...action.from
            };
            const newTo = {
              ...action.to
            };
            if (newTo.x !== undefined) newTo.x = newFrom.x + x * 100;
            if (newTo.y !== undefined) newTo.y = newFrom.y + y * 100;
            ABlocksRunSingleAction(config, targetEl, {
              from: newFrom,
              to: newTo
            });
          });
        });
      }
      if (triggerType === "hover") {
        triggerEl.addEventListener("mouseenter", () => {
          const enterAction = actions[0];
          if (enterAction) ABlocksRunActions(config, targetEl, [enterAction], false);
        });
        triggerEl.addEventListener("mouseleave", () => {
          const leaveAction = actions[1] || actions[0];
          if (leaveAction) ABlocksRunActions(config, targetEl, [leaveAction], false);
        });
      }
    });
  });
});
function ABlocksSplitTextElement(wrapper, type = "chars") {
  const target = wrapper.querySelector("h1, h2, h3, h4, h5, h6, p, span");
  if (!target) return [];
  const originalText = target.textContent;
  const originalHTML = target.innerHTML;
  target.innerHTML = "";
  let items = [];
  if (type === "chars") {
    items = originalText.split("").map(char => {
      const span = document.createElement("span");
      span.style.display = 'inline-block';
      span.style.whiteSpace = 'pre';
      span.textContent = char === " " ? " " : char;
      target.appendChild(span);
      return span;
    });
  } else if (type === "words") {
    const words = originalText.split(" ");
    items = words.map((word, i) => {
      const span = document.createElement("span");
      span.style.display = 'inline-block';
      span.style.whiteSpace = 'pre';
      span.textContent = word + (i < words.length - 1 ? " " : "");
      target.appendChild(span);
      return span;
    });
  } else if (type === "lines") {
    const lines = originalHTML.split(/<br\s*\/?>/i).map(l => l.trim()).filter(Boolean);
    items = lines.map((line, i) => {
      const span = document.createElement("div");
      span.style.display = 'block';
      span.style.whiteSpace = 'pre';
      span.innerHTML = line;
      target.appendChild(span);
      return span;
    });
  }
  return items;
}
const getDevice = () => {
  const width = window.innerWidth;
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
};
function isDeviceAllowed(settings, device) {
  if (device == 'desktop' && settings.allowDesktop) return true;
  if (settings.allowTablet && device == 'tablet') return true;
  if (settings.allowMobile && device == 'mobile') return true;
  return false;
}
function ABlocksRunActions(config, target, actions, reverse = false) {
  actions.forEach(action => {
    ABlocksRunSingleAction(config, target, action, reverse);
  });
}
function ABlocksRunSingleAction(config, targetEl, action, reverse = false) {
  if (!action.from || !action.to) {
    console.warn("Missing action", action.type, action);
    return;
  }
  const from = reverse ? action.to : action.from;
  const to = reverse ? action.from : action.to;
  if (config?.settings?.isSplit) {
    var _config$settings$stag2;
    const splitType = config?.settings.splitType;
    const cacheKey = `__abSplit_${splitType}`;
    if (!targetEl[cacheKey]) {
      targetEl[cacheKey] = ABlocksSplitTextElement(targetEl, splitType);
    }
    const splitElements = targetEl[cacheKey];
    gsap.set(splitElements, config.actions[0].from);
    gsap.to(splitElements, {
      ...config.actions[0].to,
      stagger: (_config$settings$stag2 = config.settings.stagger) !== null && _config$settings$stag2 !== void 0 ? _config$settings$stag2 : 0.1
    });
  } else {
    gsap.set(targetEl, from);
    requestAnimationFrame(() => {
      gsap.to(targetEl, {
        ...to,
        clearProps: "transform, opacity"
      });
    });
  }
}
/******/ })()
;
//# sourceMappingURL=animation-init.js.map