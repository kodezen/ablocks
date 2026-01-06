import ablocksCarousel from './carousel';
// Function to initialize ABlocksCounter for each .ablocks-block--counter element
function ABlocksCarouselInit() {
	const counterElements = document.querySelectorAll(
		'.ablocks-block--carousel'
	);
	counterElements.forEach( ( element ) => {
		ablocksCarousel( element, true );
	} );
}

// Initialize counters when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	ABlocksCarouselInit();
} );
