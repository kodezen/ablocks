import ablocksToggle from './toggle';

function initializeCounters() {
	const toggleElements = document.querySelectorAll(
		'.ablocks-block--toggle'
	);
	toggleElements.forEach( ( element ) => {
		ablocksToggle( element );
	} );
}

// Initialize counters when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	initializeCounters();
} );
