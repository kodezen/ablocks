import ABlocksTabs from './tabs';

function initializeTabs() {
	const tabsElements = document.querySelectorAll( '.ablocks-block-tabs' );
	tabsElements.forEach( ( element ) => {
		new ABlocksTabs( element, false );
	} );
}
document.addEventListener( 'DOMContentLoaded', () => {
	initializeTabs();
} );
