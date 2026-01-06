import ABlocksContentTimeline from './content-timeline';

function initializeContentTimeline() {
	const accordionElements = document.querySelectorAll(
		'.ablocks-block--content-timeline'
	);
	accordionElements.forEach( ( element ) => {
		new ABlocksContentTimeline( element, false );
	} );
}
document.addEventListener( 'DOMContentLoaded', () => {
	initializeContentTimeline();
} );
