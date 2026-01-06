import ABlocksCounter from './counter';
// Function to initialize ABlocksCounter for each .ablocks-block--counter element
function initializeCounters() {
	const counterElements = document.querySelectorAll(
		'.ablocks-block--counter'
	);
	counterElements.forEach( ( element ) => {
		new ABlocksCounter( element );
	} );
}

// Initialize counters when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	initializeCounters();
} );
