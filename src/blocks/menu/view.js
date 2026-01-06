import ABlocksNav from './nav';
function initializeMenu() {
	const menuElements = document.querySelectorAll( '.ablocks-block--menu' );
	menuElements.forEach( ( element ) => {
		new ABlocksNav( element, true );
	} );
}

// Initialize counters when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	initializeMenu();
} );
