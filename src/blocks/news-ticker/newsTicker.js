class ABlocksMarquee {
	constructor( element, options = {} ) {
		this.marqueeElement = element;
		if ( ! this.marqueeElement ) {
			return;
		}

		this.marqueeContent = this.marqueeElement.querySelector(
			'.ablocks-block-news-ticker_marquee--content'
		);
		this.slideSpeed =
			options.slideSpeed ||
			Number( this.marqueeElement.getAttribute( 'data-slide-speed' ) ) ||
			1;
		this.slideDirection =
			options.slideDirection ||
			this.marqueeElement.getAttribute( 'data-slide-direction' ) ||
			'ltr';
		this.isPauseOnOver = options.isPauseOnOver || false;

		this.currentPosition =
			this.slideDirection === 'rtl'
				? -this.marqueeContent.offsetWidth
				: 0;
		this.isPaused = false;

		this.updateDimensions();
		this.animationFrameId = null;

		this.handlePause = this.pauseAnimation.bind( this );
		this.handleResume = this.resumeAnimation.bind( this );
		this.handleTogglePause = this.togglePause.bind( this );
		this.handleNext = this.moveNext.bind( this );
		this.handlePrev = this.movePrev.bind( this );
		this.handleResize = this.updateDimensions.bind( this );

		this.bindEvents();
		this.startAnimation();

		window.addEventListener( 'resize', this.handleResize );
	}

	bindEvents() {
		if ( this.isPauseOnOver ) {
			this.marqueeContent.addEventListener(
				'mouseenter',
				this.handlePause
			);
			this.marqueeContent.addEventListener(
				'mouseleave',
				this.handleResume
			);
		}

		const pauseButton = this.marqueeElement.querySelector(
			'.ablocks-block-news-ticker--icons__pause'
		);
		if ( pauseButton ) {
			pauseButton.addEventListener( 'click', this.handleTogglePause );
		}

		const nextButton = this.marqueeElement.querySelector(
			'.ablocks-block-news-ticker--icons__next'
		);
		if ( nextButton ) {
			nextButton.addEventListener( 'click', this.handleNext );
		}

		const prevButton = this.marqueeElement.querySelector(
			'.ablocks-block-news-ticker--icons__prev'
		);
		if ( prevButton ) {
			prevButton.addEventListener( 'click', this.handlePrev );
		}
	}

	removeHoverEvents() {
		this.marqueeContent.removeEventListener(
			'mouseenter',
			this.handlePause
		);
		this.marqueeContent.removeEventListener(
			'mouseleave',
			this.handleResume
		);
	}

	updateDimensions() {
		this.contentWidth = this.marqueeContent.offsetWidth;
		this.parentWidth = this.marqueeContent.parentElement.offsetWidth;
	}

	startAnimation() {
		const animate = () => {
			if ( this.isPaused ) {
				this.animationFrameId = window.requestAnimationFrame( animate );
				return;
			}

			if ( this.slideDirection === 'rtl' ) {
				this.currentPosition += this.slideSpeed;
				if ( this.currentPosition > this.parentWidth ) {
					this.currentPosition = -this.contentWidth;
				}
			} else {
				this.currentPosition -= this.slideSpeed;
				if ( this.currentPosition < -this.contentWidth ) {
					this.currentPosition = this.parentWidth;
				}
			}

			this.marqueeContent.style.transform = `translateX(${ this.currentPosition }px)`;
			this.animationFrameId = window.requestAnimationFrame( animate );
		};

		this.animationFrameId = window.requestAnimationFrame( animate );
	}

	pauseAnimation() {
		this.isPaused = true;
		window.cancelAnimationFrame( this.animationFrameId );
	}

	resumeAnimation() {
		if ( this.isPaused ) {
			this.isPaused = false;
			this.startAnimation();
		}
	}

	togglePause() {
		if ( this.isPaused ) {
			this.resumeAnimation();
		} else {
			this.pauseAnimation();
		}
	}

	moveNext() {
		const step = 50;
		if ( this.slideDirection === 'rtl' ) {
			this.currentPosition += step;
			if ( this.currentPosition > this.parentWidth ) {
				this.currentPosition = -this.contentWidth;
			}
		} else {
			this.currentPosition -= step;
			if ( this.currentPosition < -this.contentWidth ) {
				this.currentPosition = this.parentWidth;
			}
		}
		this.marqueeContent.style.transform = `translateX(${ this.currentPosition }px)`;
	}

	movePrev() {
		const step = 50;
		if ( this.slideDirection === 'rtl' ) {
			this.currentPosition -= step;
			if ( this.currentPosition < -this.contentWidth ) {
				this.currentPosition = this.parentWidth;
			}
		} else {
			this.currentPosition += step;
			if ( this.currentPosition > this.parentWidth ) {
				this.currentPosition = -this.contentWidth;
			}
		}
		this.marqueeContent.style.transform = `translateX(${ this.currentPosition }px)`;
	}

	destroy() {
		this.removeHoverEvents();
		const pauseButton = this.marqueeElement.querySelector(
			'.ablocks-block-news-ticker--icons__pause'
		);
		if ( pauseButton ) {
			pauseButton.removeEventListener( 'click', this.handleTogglePause );
		}

		const nextButton = this.marqueeElement.querySelector(
			'.ablocks-block-news-ticker--icons__next'
		);
		if ( nextButton ) {
			nextButton.removeEventListener( 'click', this.handleNext );
		}

		const prevButton = this.marqueeElement.querySelector(
			'.ablocks-block-news-ticker--icons__prev'
		);
		if ( prevButton ) {
			prevButton.removeEventListener( 'click', this.handlePrev );
		}

		window.cancelAnimationFrame( this.animationFrameId );
		window.removeEventListener( 'resize', this.handleResize );
	}
}

export default ABlocksMarquee;
