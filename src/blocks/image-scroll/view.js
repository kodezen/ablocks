import ABlocksImageScroll from './image-scroll';

function initializeContentTimeline() {
	const accordionElements = document.querySelectorAll(
		'.ablocks-block--image-scroll'
	);
	accordionElements.forEach( ( element ) => {
		new ABlocksImageScroll( element, false );
	} );
}
document.addEventListener( 'DOMContentLoaded', () => {
	initializeContentTimeline();
} );
