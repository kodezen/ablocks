// ABlocksLottie.js
import lottie from 'lottie-web';

class ABlocksLottie {
	constructor( element ) {
		this.element = element;
		this.animationSource =
			element.getAttribute( 'data-animation-source' ) || 'default';
		this.assetUrl = this.getAnimationUrl();
		this.trigger = element.getAttribute( 'data-trigger' ) || 'viewport';
		this.loop = element.getAttribute( 'data-loop' ) === 'true';
		this.reverse = element.getAttribute( 'data-reverse' ) === 'true';
		this.animationSpeed =
			parseFloat( element.getAttribute( 'data-animation-speed' ) ) || 1;
		this.initAnimation();
	}

	getAnimationUrl() {
		switch ( this.animationSource ) {
			case 'custom':
				return this.element.getAttribute( 'data-asset-url' ) || '';
			case 'upload':
				// Handle uploaded JSON data
				return this.element.getAttribute( 'data-asset-url' );
			case 'default':
			default:
				return (
					this.element.getAttribute( 'data-asset-url' )
				);
		}
	}

	initAnimation() {
		const animationUrl = this.getAnimationUrl();
		if ( ! animationUrl ) {
			return;
		}

		this.animationInstance = lottie.loadAnimation( {
			container: this.element,
			renderer: 'svg',
			loop: this.loop,
			autoplay: this.trigger === 'viewport',
			path: animationUrl,
		} );

		this.animationInstance.setSpeed( this.animationSpeed );

		if ( this.reverse ) {
			this.animationInstance.setDirection( -1 );
		}

		this.handleTriggers();
	}

	handleTriggers() {
		if ( this.trigger === 'hover' ) {
			this.element.addEventListener( 'mouseenter', () =>
				this.animationInstance.play()
			);
			this.element.addEventListener( 'mouseleave', () =>
				this.animationInstance.stop()
			);
		} else if ( this.trigger === 'click' ) {
			this.element.addEventListener( 'click', () => {
				if ( this.animationInstance.isPaused ) {
					this.animationInstance.play();
				} else {
					this.animationInstance.pause();
				}
			} );
		}
	}
}

export default ABlocksLottie;
