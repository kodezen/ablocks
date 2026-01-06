import ABlocksAccordion from './accordion';

function initializeAccordion() {
	const accordionElements = document.querySelectorAll(
		'.ablocks-block--accordion'
	);
	accordionElements.forEach( ( element ) => {
		new ABlocksAccordion( element, false );
	} );
}
document.addEventListener( 'DOMContentLoaded', () => {
	initializeAccordion();
} );
