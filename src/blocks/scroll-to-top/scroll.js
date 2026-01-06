class ScrollToTop {
	constructor( element, isFrontend ) {
		this.element = element;
		this.isFrontend = isFrontend;
		this.scrollTarget = isFrontend
			? window
			: document.querySelector( '[name="editor-canvas"]' )?.contentWindow;

		this.circle = this.element?.querySelector(
			'.ablocks-scroll-progress-ring__circle'
		);
		this.scrollButton = this.element?.querySelector(
			'.ablocks-scroll-progress-wrapper, .ablocks-scroll-to-top-button-text, .ablocks-icon-wrap'
		);

		this.setupCircle();
		this.init();
	}

	setupCircle() {
		if ( ! this.circle ) {
			return;
		}
		this.radius = this.circle.r.baseVal.value;
		this.circumference = 2 * Math.PI * this.radius;
		Object.assign( this.circle.style, {
			strokeDasharray: `${ this.circumference } ${ this.circumference }`,
			strokeDashoffset: this.circumference,
			transform: 'rotate(-90deg)',
			transformOrigin: '50% 50%',
		} );
	}

	init() {
		if ( ! this.element || ! this.scrollTarget ) {
			return;
		}

		this.scrollTarget.addEventListener( 'scroll', () =>
			this.updateProgress()
		);
		this.scrollButton?.addEventListener( 'click', () => {
			this.scrollTarget.scrollTo( { top: 0, behavior: 'smooth' } );
		} );

		this.updateProgress(); // initial state
	}

	updateProgress() {
		if ( ! this.scrollTarget?.document ) {
			return;
		}
		const { document, innerHeight, scrollY } = this.scrollTarget;
		const docHeight = document.documentElement.scrollHeight - innerHeight;
		const scrollTop = scrollY ?? document.documentElement.scrollTop;
		if ( this.isFrontend ) {
			if ( scrollTop === 0 ) {
				this.element.style.visibility = 'hidden';
				this.element.style.opacity = '0';
				this.element.style.transition = 'opacity 0.3s ease';
			} else {
				this.element.style.visibility = 'visible';
				this.element.style.opacity = '1';
				this.element.style.transition = 'opacity 0.3s ease';
			}
		}

		if ( this.circle ) {
			const progress = docHeight > 0 ? scrollTop / docHeight : 0;
			this.circle.style.strokeDashoffset =
				this.circumference * ( 1 - progress );
		}
	}
}

export default ScrollToTop;
