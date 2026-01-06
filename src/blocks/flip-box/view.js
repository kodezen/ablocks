import ablocksFlipBox from './flip-box';

function initializeFlipBox() {
	const flipBox = document.querySelectorAll( '.ablocks-block--flip-box' );
	if ( flipBox.length ) {
		flipBox.forEach( ( element ) => {
			ablocksFlipBox( element );
		} );
	}
}

document.addEventListener( 'DOMContentLoaded', () => {
	initializeFlipBox();
} );
