class ABHeadingRotateSwirl {
	constructor( element, attributes ) {
		if ( ! element ) {
			return;
		}

		this.element = element;
		this.texts = element.querySelectorAll( '.ablocks-dynamic-text' );
		this.currentIndex = 0;
		this.isLoop =
			attributes.isloop === 'true' || attributes.isloop === true;
		this.highlightDuration = parseInt( attributes.duration ) || 2000;
		this.timeoutId = null;
		if ( this.texts.length === 0 ) {
			return;
		}

		this.texts.forEach( ( text ) =>
			text.classList.remove( 'ablocks-headline-text-active' )
		);

		this.showNextText();
		document.addEventListener(
			'visibilitychange',
			this.handleVisibilityChange.bind( this )
		);
	}

	showNextText() {
		this.stopRotation();
		this.texts.forEach( ( text ) => {
			text.classList.remove( 'ablocks-headline-text-active' );
			text.querySelectorAll( '.ablocks-dynamic-letter' ).forEach(
				( letter ) => {
					letter.classList.remove( 'ablocks-animation-in' );
					void letter.offsetWidth; // reflow
				}
			);
		} );

		const currentText = this.texts[ this.currentIndex ];
		const letters = currentText.querySelectorAll(
			'.ablocks-dynamic-letter'
		);

		if ( letters.length > 0 ) {
			this.typeSpeed = this.highlightDuration / letters.length;
		} else {
			this.typeSpeed = this.highlightDuration; // fallback
		}

		let i = 0;
		const typeInterval = setInterval( () => {
			if ( i < letters.length ) {
				letters[ i ].classList.add( 'ablocks-animation-in' );
				i++;
			} else {
				clearInterval( typeInterval );
			}
		}, this.typeSpeed );

		currentText.classList.add( 'ablocks-headline-text-active' );

		const isLastText = this.currentIndex === this.texts.length - 1;
		if ( isLastText && ! this.isLoop ) {
			return;
		}

		this.currentIndex = ( this.currentIndex + 1 ) % this.texts.length;
		this.timeoutId = setTimeout(
			() => this.showNextText(),
			this.highlightDuration
		);
	}

	stopRotation() {
		if ( this.timeoutId ) {
			clearTimeout( this.timeoutId );
			this.timeoutId = null;
		}
	}

	handleVisibilityChange() {
		if ( document.hidden ) {
			this.stopRotation();
		} else {
			this.showNextText();
		}
	}
}

export default ABHeadingRotateSwirl;
