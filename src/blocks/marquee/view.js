import { MarqueeHandler } from './marquee';

function initializeMarquee() {
	const marqueeElements = document.querySelectorAll(
		'.ablocks-block-marquee'
	);

	if ( ! window.matchMedia( '(prefers-reduced-motion: reduce)' ).matches ) {
		const marqueeHandler = new MarqueeHandler( marqueeElements );
		marqueeHandler.addMarqueeAnimation();
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	initializeMarquee();
} );
