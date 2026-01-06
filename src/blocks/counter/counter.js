class ABlocksCounter {
	constructor( element ) {
		this.ablocksCounter = element;

		if ( ! this.ablocksCounter ) {
			return;
		}
		const countElement = element;

		this.startValue =
			Number( countElement?.getAttribute( 'data-start' ) ) || 0;
		this.endValue = Number( countElement?.getAttribute( 'data-end' ) ) || 0;
		this.totalNumber =
			Number( countElement?.getAttribute( 'data-total' ) ) || 0;
		this.duration = Number( countElement?.getAttribute( 'data-duration' ) ); // Default duration 1000ms
		this.separator = countElement?.getAttribute( 'data-separator' );
		this.decimalPlaces =
			Number( countElement?.getAttribute( 'data-decimalPlaces' ) ) || 0;
		this.circleSize =
			Number( countElement?.getAttribute( 'data-circleSize' ) ) || 220;

		const layout = countElement?.getAttribute( 'data-layout' );
		this.animationRepeat = countElement?.getAttribute(
			'data-animationRepeat'
		);

		this.layout = layout;
		if ( ! layout ) {
			// eslint-disable-next-line
			console.error(
				`Missing 'data-layout' attribute for '${ countElement }'.`
			);
			return;
		}

		if ( layout !== 'number' && this.endValue >= this.totalNumber ) {
			this.endValue = this.totalNumber;
		}

		const observerOptions = {
			root: null,
			rootMargin: '0px',
			threshold: 0.5, // When 50% of the section is in view
		};

		const IO = new window.IntersectionObserver(
			this.IOCallback.bind( this ),
			observerOptions
		);
		IO.observe( this.ablocksCounter );
	}
	init = () => {
		if ( this.layout === 'number' ) {
			this.numberCounter();
		} else if ( this.layout === 'circle' ) {
			this.circleCounter();
		} else if ( this.layout === 'bar' ) {
			this.bar();
		} else {
			// eslint-disable-next-line
			console.error(
				`Unsupported layout '${ this.layout }' for '${ this.countElement }'.`
			);
		}
	};
	playOnce = false;
	IOCallback( entries ) {
		entries.forEach( ( entry ) => {
			if ( entry.isIntersecting ) {
				if ( this.animationRepeat === 'false' && ! this.playOnce ) {
					this.playOnce = true;
					this.init();
				}
				if ( this.animationRepeat === 'true' ) {
					this.init();
				}
			}
		} );
	}
	numberCounter() {
		const numberCounter = this.ablocksCounter?.querySelector(
			'.ablocks-counter__content-number'
		);
		if ( ! numberCounter ) {
			// eslint-disable-next-line
			console.error(
				`'.ablocks-counter__content-number' element not found.`
			);
			return;
		}

		const { startValue, endValue, duration, separator, decimalPlaces } =
			this;
		let start = null;
		const range = endValue - startValue;
		const animate = ( timestamp ) => {
			if ( ! start ) {
				start = timestamp;
			}
			const progress = timestamp - start;
			const percentage =
				duration === 0 ? 1 : Math.min( progress / duration, 1 );
			const newCount = startValue + percentage * range;

			numberCounter.innerHTML = this.formatNumberWithSeparator(
				newCount,
				separator,
				decimalPlaces
			);

			if ( progress < duration ) {
				window.requestAnimationFrame( animate );
			}
		};

		window.requestAnimationFrame( animate );
	}

	circleCounter() {
		this.numberCounter();
		const circleCounter = this.ablocksCounter?.querySelector(
			'.ablocks-circle-counter__progress'
		);
		if ( ! circleCounter ) {
			// eslint-disable-next-line
			console.error(
				`'.ablocks-circle-counter__progress' element not found.`
			);
			return;
		}

		const { startValue, endValue, totalNumber, duration, circleSize } =
			this;
		const radius = circleSize / 2;
		const circumference = 2 * Math.PI * radius;

		const startPercentage = ( startValue / totalNumber ) * 100;
		const endPercentage = ( endValue / totalNumber ) * 100;
		const startOffset =
			circumference - ( startPercentage / 100 ) * circumference;
		const endOffset =
			circumference - ( endPercentage / 100 ) * circumference;

		const animationKeyframes = [
			{ strokeDashoffset: startOffset },
			{ strokeDashoffset: endOffset },
		];

		const animationProperties = {
			duration,
			fill: 'forwards',
		};

		circleCounter.animate( animationKeyframes, animationProperties );
	}

	bar() {
		this.numberCounter();
		const barCounter = this.ablocksCounter?.querySelector(
			'.ablocks-bar-counter__progress'
		);
		if ( ! barCounter ) {
			// eslint-disable-next-line
			console.error(
				`'.ablocks-bar-counter__progress' element not found.`
			);
			return;
		}

		const { startValue, endValue, totalNumber, duration } = this;

		const startWidth = ( startValue / totalNumber ) * 100;
		const endWidth = ( endValue / totalNumber ) * 100;

		const animationKeyframes = [
			{ width: startWidth + '%' },
			{ width: endWidth + '%' },
		];

		const animationProperties = {
			duration,
			fill: 'forwards',
		};

		barCounter.animate( animationKeyframes, animationProperties );
	}

	formatNumberWithSeparator( number, separator, decimalPlaces ) {
		const options = {
			minimumFractionDigits: decimalPlaces,
			maximumFractionDigits: decimalPlaces,
		};
		const formattedNumber = number.toLocaleString( 'en-US', options );
		return formattedNumber.replace( /,/g, separator );
	}
}

export default ABlocksCounter;
