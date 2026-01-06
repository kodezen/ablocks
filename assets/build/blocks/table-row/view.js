/******/ (() => { // webpackBootstrap
/*!**************************************!*\
  !*** ./src/blocks/table-row/view.js ***!
  \**************************************/
document.addEventListener('DOMContentLoaded', function () {
  const tbodies = document.querySelectorAll('.ablocks-block--table-body');
  tbodies.forEach(tbody => {
    const rows = tbody.querySelectorAll('.ablocks-block--table-row');
    rows.forEach((row, index) => {
      if (index % 2 === 0) {
        row.classList.add('ablocks-table-row--even');
      } else {
        row.classList.add('ablocks-table-row--odd');
      }
    });
  });
});
/******/ })()
;
//# sourceMappingURL=view.js.map