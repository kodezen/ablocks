class ABImageHotspot {
	constructor( element ) {
		if ( ! element ) {
			return;
		}

		this.element = element;
		this.tooltipContent = this.element.querySelector(
			'.ablocks-image-hotspot__tooltip-content'
		);
		this.pins = this.element.querySelectorAll(
			'.ablocks-image-hotspot__pin'
		);
		this.activeTooltipIndex = null;

		if ( ! this.tooltipContent || ! this.pins.length ) {
			return;
		}

		this.tooltipContent.style.display = 'none';

		this.initPins();
	}

	// Initialize pins with event listeners
	initPins() {
		this.pins.forEach( ( pin, index ) => {
			const xAxis = pin.dataset.xaxis;
			const yAxis = pin.dataset.yaxis;
			const trigger = pin.dataset.trigger;

			// Set left and top position of the pin
			pin.style.left = `${ xAxis }%`;
			pin.style.top = `${ yAxis }%`;

			// Event listener based on the trigger type
			if ( trigger === 'onClick' ) {
				pin.addEventListener( 'click', () =>
					this.handleTooltip( index, xAxis, yAxis )
				);
			} else {
				pin.addEventListener( 'mouseover', () =>
					this.handleTooltip( index, xAxis, yAxis )
				);
			}
		} );
	}

	// Handle the tooltip display logic
	handleTooltip( tooltipIndex, xAxis, yAxis ) {
		const hotspotChildElement = this.element.querySelectorAll(
			'.ablocks-block--image-hotspot-child'
		);

		if ( ! hotspotChildElement ) {
			return;
		}

		// add eventlistener to .ablocks-icon ablocks-icon--close.. onclick hide tooltip
		const closeIcon = this.tooltipContent.querySelector(
			'.ablocks-icon.ablocks-icon--close'
		);
		closeIcon.addEventListener( 'click', () => {
			this.tooltipContent.style.display = 'none';
		} );

		// Hide previously active tooltip if it exists
		if ( this.activeTooltipIndex !== null ) {
			const activeChildContainer =
				hotspotChildElement[ this.activeTooltipIndex ]?.children[ 0 ];
			if ( activeChildContainer ) {
				activeChildContainer.classList.remove(
					'ablocks-image-hotspot__tooltip--active'
				);
				this.tooltipContent.style.display = 'none';
			}
		}

		// Toggle the tooltip visibility
		this.activeTooltipIndex = tooltipIndex;
		const childContainer =
			hotspotChildElement[ tooltipIndex ]?.children[ 0 ];

		if ( childContainer ) {
			childContainer.classList.add(
				'ablocks-image-hotspot__tooltip--active'
			);

			// Adjust positioning to prevent overflow on small screens
			const tooltipRect = this.tooltipContent.getBoundingClientRect();
			const screenWidth = window.innerWidth;
			const screenHeight = window.innerHeight;

			let newLeft = parseFloat( xAxis );
			let newTop = parseFloat( yAxis );

			// Adjust horizontally if the tooltip is going out of the screen
			if ( tooltipRect.left < 0 ) {
				newLeft = 5; // Keep a small margin from the left
			} else if ( tooltipRect.right > screenWidth ) {
				newLeft = 95; // Keep a small margin from the right
			}

			// Adjust vertically if the tooltip is going out of the screen
			if ( tooltipRect.top < 0 ) {
				newTop = 5; // Keep a small margin from the top
			} else if ( tooltipRect.bottom > screenHeight ) {
				newTop = 95; // Keep a small margin from the bottom
			}

			this.tooltipContent.style.top = `${ newTop }%`;
			this.tooltipContent.style.left = `${ newLeft }%`;
			this.tooltipContent.style.display = 'block';
		}
	}
}

export default ABImageHotspot;
