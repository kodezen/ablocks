import progressTracker from './progress';

function initializeCounters() {
	const progressElements = document.querySelectorAll(
		'.ablocks-block--progress-tracker'
	);
	progressElements.forEach( ( element ) => {
		progressTracker( element, true );
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initializeCounters();
} );
