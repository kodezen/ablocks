export default class ABlocksImageScroll {
	constructor( element ) {
		this.imageScroll = element;
		this.imageContainer = this.imageScroll.querySelector(
			'.ablocks-block-container'
		);
		this.imageContainerWidth =
			this.imageContainer.getBoundingClientRect().width;
		this.imageFigure = this.imageScroll.querySelector(
			'.ablocks-image-scroll__figure'
		);
		this.scrollOption =
			this.imageFigure.getAttribute( 'data-scroll-option' );

		// Handle both number and JSON string formats for scrollHeight
		const scrollHeightAttr =
			this.imageFigure.getAttribute( 'data-scroll-height' );
		try {
			const parsed = JSON.parse( scrollHeightAttr );
			this.scrollHeight =
				typeof parsed === 'object' ? parsed.value : parsed;
		} catch ( e ) {
			this.scrollHeight = parseInt( scrollHeightAttr ) || 0;
		}

		this.transitionTime = parseInt(
			this.imageFigure.getAttribute( 'data-transition-time' )
		);

		// Check if image element exists
		this.image = this.imageScroll.querySelector(
			'.ablocks-image-scroll__figure img'
		);
		if ( ! this.image ) {
			return; // Exit early if the image is not found
		}

		this.imageSize = null;
		this.imageWidth = null;

		// Handle image load event
		this.image.onload = () => this.onImageLoad();
		if ( this.image.complete ) {
			this.onImageLoad();
		}

		// Apply initial transition time
		this.imageFigure.style.transitionDuration = `${ this.transitionTime }s`;

		// Handle mouse enter/leave events
		this.imageScroll.addEventListener( 'mouseenter', () =>
			this.handleMouseEnter()
		);
		this.imageScroll.addEventListener( 'mouseleave', () =>
			this.handleMouseLeave()
		);
	}

	onImageLoad() {
		this.imageSize = this.image.offsetHeight;
		this.imageWidth = this.image.offsetWidth;

		// Apply transformations based on scroll option
		this.applyTransformations();
	}

	applyTransformations() {
		switch ( this.scrollOption ) {
			case 'mouse-scroll':
			case 'horizontal-scroll':
				this.imageFigure.style.transform =
					'translateX(0) translateY(0)';
				break;
			case 'bottom-to-top':
				const bottomHeight = this.imageSize - this.scrollHeight;
				this.imageFigure.style.transform = `translateY(${ -Math.max(
					bottomHeight,
					0
				) }px)`;
				break;
			case 'right-to-left':
				const width = this.imageContainerWidth - this.imageWidth;
				this.imageFigure.style.transform = `translateX(${ width }px)`;
				break;
			default:
				break;
		}
	}

	handleMouseEnter() {
		switch ( this.scrollOption ) {
			case 'mouse-scroll':
			case 'horizontal-scroll':
				this.imageFigure.style.transform =
					'translateX(0) translateY(0)';
				break;
			case 'top-to-bottom':
				const topHeight = Math.max(
					this.imageSize - this.scrollHeight,
					0
				);
				this.imageFigure.style.transform = `translateY(${ -topHeight }px)`;
				break;
			case 'bottom-to-top':
				this.imageFigure.style.transform = 'translateY(0)';
				break;
			case 'left-to-right':
				const width = this.imageContainerWidth - this.imageWidth;
				this.imageFigure.style.transform = `translateX(${ width }px)`;
				break;
			case 'right-to-left':
				this.imageFigure.style.transform = 'translateX(0)';
				break;
			default:
				break;
		}
	}

	handleMouseLeave() {
		switch ( this.scrollOption ) {
			case 'mouse-scroll':
			case 'horizontal-scroll':
				this.imageFigure.style.transform =
					'translateX(0) translateY(0)';
				break;
			case 'top-to-bottom':
				this.imageFigure.style.transform = 'translateY(0)';
				break;
			case 'bottom-to-top':
				const bottomHeight = this.imageSize - this.scrollHeight;
				this.imageFigure.style.transform = `translateY(${ -Math.max(
					bottomHeight,
					0
				) }px)`;
				break;
			case 'left-to-right':
				this.imageFigure.style.transform = 'translateX(0)';
				break;
			case 'right-to-left':
				const width = this.imageContainerWidth - this.imageWidth;
				this.imageFigure.style.transform = `translateX(${ width }px)`;
				break;
			default:
				break;
		}
	}

	// Optionally, you could use a method to notify when the image has loaded
	imageLoaded() {
		return new Promise( ( resolve ) => {
			if ( this.imageSize ) {
				resolve( this.imageSize ); // If the size is already set, resolve immediately
			} else {
				this.image.onload = () => {
					resolve( this.image.offsetHeight );
				};
			}
		} );
	}
}
