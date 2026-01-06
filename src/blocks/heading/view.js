import ABHeadingRotateSlideDown from './heading-animation/rotate-slide-down';
import ABHeadingRotateSwirl from './heading-animation/rotate-swirl';
import ABHeadingRotateTyping from './heading-animation/rotate-typing';

function initialHeadingAnimation() {
	// const headingBlock = document.querySelectorAll( '.ablocks-block--heading' );
	const animatedText = document.querySelectorAll( '.ablocks-animated-text' );
	const hasAnyClass = ( el, classList ) =>
		classList.some( ( cls ) => el.classList.contains( cls ) );

	animatedText.forEach( ( element ) => {
		const attributes = element.closest( '.ablocks-block--heading' ).dataset;

		if (
			hasAnyClass( element, [
				'ablocks-rotate-slide-down',
				'ablocks-rotate-clip',
				'ablocks-rotate-drop-in',
				'ablocks-rotate-flip',
				'ablocks-rotate-slide',
			] )
		) {
			new ABHeadingRotateSlideDown( element, attributes );
		}
		if ( hasAnyClass( element, [ 'ablocks-rotate-typing' ] ) ) {
			// "ablocks-rotate-blind", "ablocks-rotate-wave"
			new ABHeadingRotateTyping( element, attributes );
		}
		if ( hasAnyClass( element, [ 'ablocks-rotate-swirl' ] ) ) {
			new ABHeadingRotateSwirl( element, attributes );
		}
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initialHeadingAnimation();
} );
