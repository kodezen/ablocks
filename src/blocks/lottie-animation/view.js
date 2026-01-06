import ABlocksLottie from './lottie';

function initializeLottieAnimation() {
	const lottieAnimation = document.querySelectorAll(
		'.ablocks-lottie-container'
	);
	lottieAnimation.forEach( ( element ) => {
		new ABlocksLottie( element, true );
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initializeLottieAnimation();
} );
