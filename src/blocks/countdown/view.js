import ABlocksCountDown from './countDown';

function initializeCounters() {
	const countDownElements = document.querySelectorAll(
		'.ablocks-block--countdown'
	);
	countDownElements.forEach( ( element ) => {
		ABlocksCountDown( element, true );
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initializeCounters();
} );
