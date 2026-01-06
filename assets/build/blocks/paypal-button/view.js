/******/ (() => { // webpackBootstrap
/*!******************************************!*\
  !*** ./src/blocks/paypal-button/view.js ***!
  \******************************************/
function initialPaypalButton() {
  const paypalButtons = document.querySelectorAll('.ablocks-paypal-button__form');
  paypalButtons.forEach(form => {
    const errorMessage = form.getAttribute('data-ablocks__error-msg'); // Get the error message from data attribute

    form.addEventListener('submit', event => {
      if (!validateForm(form)) {
        event.preventDefault(); // Prevent form submission
        displayErrorMessage(form, errorMessage);
      }
    });
  });
}

// Validation logic
function validateForm(form) {
  const paypalAccount = form.querySelector('input[name="business"]').value;
  const trxType = form.querySelector('input[name="cmd"]').value;
  const itemName = form.querySelector('input[name="item_name"]').value;

  // Example validation checks
  if (!paypalAccount || !trxType || !itemName) {
    return false;
  }
  return true;
}

// Display error message
function displayErrorMessage(form, errorMessage) {
  let errorElement = form.querySelector('.ablocks-paypal-button__error');
  if (!errorElement) {
    errorElement = document.createElement('p');
    errorElement.className = 'ablocks-paypal-button__error';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '14px';
    errorElement.style.textAlign = 'center';
    form.appendChild(errorElement);
  }
  errorElement.textContent = errorMessage || 'Please fill in all required fields.';
  errorElement.style.display = 'block';
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  initialPaypalButton();
});
/******/ })()
;
//# sourceMappingURL=view.js.map