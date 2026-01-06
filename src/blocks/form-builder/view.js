import FormBuilder from './form-builder';
function initializeCounters() {
	const formBlocks = document.querySelectorAll(
		'.ablocks-block--form-builder'
	);
	formBlocks?.forEach( ( formBlock ) => {
		new FormBuilder( formBlock );
	} );
}

// Initialize counters when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	initializeCounters();
} );
