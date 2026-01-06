import ABlockFormMultiStep from './multiForm';

function initializeCounters() {
	const formStepsElement = document.querySelectorAll(
		'.ablocks-block--form-multi-step'
	);
	formStepsElement.forEach( ( element ) => {
		new ABlockFormMultiStep( element, false );
	} );
}

// Initialize counters when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	initializeCounters();
} );
