export default function progressTracker( element, isFrontend = false ) {
	const progressBars = element?.querySelector(
		'.ablocks-block-progress-bar'
	);
	const progressCircles = element?.querySelector(
		'.ablocks-block-progress-circle'
	);
	const layout = element?.getAttribute( 'data-layout' );
	const direction = element?.getAttribute( 'data-direction' );
	const progressRelative = element?.getAttribute( 'data-progress-relative' );
	const progressRelativeSelector = element?.getAttribute(
		'data-progress-relative-selector'
	);
	const percentageText = element?.querySelector(
		'.ablocks-block-progress__text'
	);
	const circleBar = progressCircles?.querySelector(
		'.ablocks-block-progress-circle__svg-bar'
	);

	const scrollTarget = isFrontend
		? window
		: document.querySelector( '[name="editor-canvas"]' )?.contentWindow;

	if ( ! scrollTarget ) {
		return;
	}

	const updateBarProgress = ( scrollPercentage ) => {
		if ( progressBars ) {
			progressBars.style.width = `${ scrollPercentage }%`;
		}
		if ( percentageText ) {
			percentageText.textContent = `${ Math.round( scrollPercentage ) }%`;
		}
	};

	const updateCircleProgress = ( scrollPercentage ) => {
		if ( percentageText ) {
			percentageText.textContent = `${ Math.round( scrollPercentage ) }%`;
		}
		if ( circleBar ) {
			const radius = parseFloat( circleBar.getAttribute( 'r' ) || 0 );
			if ( ! radius ) {
				return;
			}

			const circumference = 2 * Math.PI * radius;
			const offset =
				circumference - ( scrollPercentage / 100 ) * circumference;

			if ( direction === 'left' ) {
				circleBar.style.strokeDashoffset = `-${ offset }`;
			} else if ( direction === 'right' ) {
				circleBar.style.strokeDashoffset = offset;
			} else {
				circleBar.style.strokeDashoffset = offset;
			}
		}
	};

	const updateProgress = ( scrollPercentage ) => {
		const clampedPercentage = Math.min(
			Math.max( Math.floor( scrollPercentage ), 0 ),
			100
		);
		if ( layout === 'bar' ) {
			updateBarProgress( clampedPercentage );
		} else if ( layout === 'circle' ) {
			updateCircleProgress( clampedPercentage );
		}
	};

	const handleWindowScroll = () => {
		const scrollTop = scrollTarget.scrollY || 0;
		const windowHeight = scrollTarget.innerHeight || 0;
		const documentHeight =
			scrollTarget.document.documentElement.scrollHeight || 0;

		const denominator = documentHeight - windowHeight;
		const scrollPercentage =
			denominator > 0 ? ( scrollTop / denominator ) * 100 : 20;

		updateProgress( scrollPercentage );
	};

	const handleSelectorScroll = () => {
		if ( ! progressRelativeSelector ) {
			return;
		}
		const relativeElement = element?.ownerDocument?.querySelector(
			progressRelativeSelector
		);
		if ( ! relativeElement ) {
			return;
		}
		const divTop = relativeElement.getBoundingClientRect().top;
		const divHeight = relativeElement.offsetHeight;
		const windowHeight = scrollTarget.innerHeight;
		if ( divHeight === 0 ) {
			updateProgress( 0 );
			return;
		}
		if ( divTop < windowHeight && divTop + divHeight > 0 ) {
			const scrolled = Math.min( windowHeight - divTop, divHeight );
			const scrollPercentage = Math.max(
				0,
				Math.min( 100, ( scrolled / divHeight ) * 100 )
			);
			if ( scrolled >= divHeight ) {
				updateProgress( 100 );
			} else {
				updateProgress( scrollPercentage );
			}
		} else {
			updateProgress( 0 );
		}
	};

	if ( progressRelative === 'entire_page' ) {
		scrollTarget.addEventListener( 'scroll', handleWindowScroll );
	} else if ( progressRelative === 'selector' && progressRelativeSelector ) {
		scrollTarget.addEventListener( 'scroll', handleSelectorScroll );
	}
	handleWindowScroll();
	if ( progressRelativeSelector ) {
		handleSelectorScroll();
	}
}
