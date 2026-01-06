import ablocksCoupon from './coupon';

function initializeCounters() {
	const couponElements = document.querySelectorAll(
		'.ablocks-block--coupon'
	);

	couponElements.forEach( ( element ) => {
		ablocksCoupon( element );
	} );
}

// Initialize counters when the DOM is fully loaded
document.addEventListener( 'DOMContentLoaded', () => {
	initializeCounters();
} );
