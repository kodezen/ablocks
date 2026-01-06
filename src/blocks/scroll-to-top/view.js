import ScrollToTop from './scroll';
document.addEventListener( 'DOMContentLoaded', () => {
	const scrollToTopContainers = document.querySelectorAll(
		'.ablocks-block--scroll-to-top'
	);

	scrollToTopContainers.forEach( ( element ) => {
		new ScrollToTop( element, true );
	} );
} );
