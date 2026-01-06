class ABHeadingRotateSlideDown {
	constructor( element, attributes ) {
		if ( ! element ) {
			return;
		}

		this.element = element;
		this.texts = this.element.querySelectorAll( '.ablocks-dynamic-text' );
		this.index = 0;
		this.intervalId = null;
		this.isLoop =
			attributes.isloop === 'true' || attributes.isloop === true;
		this.highlightDuration = parseInt( attributes.duration ) || 2000;

		this.txtWrapper = this.element.querySelector(
			'.ablocks-animated-text-wrapper'
		);
		if ( this.txtWrapper ) {
			const maxWidth = Array.from( this.texts ).reduce( ( max, text ) => {
				return Math.max( max, text.offsetWidth );
			}, 0 );
			this.txtWrapper.style.minWidth = `${ maxWidth }px`;
		}

		if ( this.texts.length === 0 ) {
			return;
		}
		this.texts[ 0 ].classList.add( 'ablocks-dynamic-text-active' );

		setTimeout( () => {
			this.texts.forEach( ( text, index ) => {
				if ( index === 0 ) {
					text.classList.add( 'ablocks-dynamic-text-active' );
				} else {
					text.classList.remove( 'ablocks-dynamic-text-active' );
				}
			} );
		}, 100 );
		this.startRotation();
		document.addEventListener(
			'visibilitychange',
			this.handleVisibilityChange.bind( this )
		);
	}

	startRotation() {
		this.stopRotation();
		this.intervalId = setInterval( () => {
			if ( this.index === this.texts.length - 1 && ! this.isLoop ) {
				this.stopRotation();
				return;
			}
			this.texts[ this.index ].classList.remove(
				'ablocks-dynamic-text-active'
			);
			this.index++;

			if ( this.index >= this.texts.length && this.isLoop ) {
				this.index = 0;
			}

			this.texts[ this.index ].classList.add(
				'ablocks-dynamic-text-active'
			);
		}, this.highlightDuration );
	}

	stopRotation() {
		if ( this.intervalId ) {
			clearInterval( this.intervalId );
			this.intervalId = null;
		}
	}
	handleVisibilityChange() {
		if ( document.hidden ) {
			this.stopRotation();
		} else {
			this.startRotation();
		}
	}
}

export default ABHeadingRotateSlideDown;
