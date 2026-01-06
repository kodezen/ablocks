import ablocksInput from './input';
// Function to initialize ablocksInput for each .ablocks-block--input element
function initializeInput() {
	const inputElements = document.querySelectorAll(
		'.ablocks-form-builder__field'
	);
	inputElements.forEach( ( element ) => {
		ablocksInput( element );
	} );
}

// Initialize Input when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	initializeInput();
} );
