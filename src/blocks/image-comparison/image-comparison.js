class ABlocksImageComparison {
	constructor( element ) {
		this.slider = element;

		if ( ! this.slider ) {
			return;
		}

		this.sliderInput = this.slider.querySelector(
			'[data-ablocks-slider-input]'
		);
		this.moveOnHover =
			this.slider.getAttribute( 'data-ablocks-move-on-hover' ) === 'true';
		this.sliderOrientation = this.slider.getAttribute(
			'data-ablocks-slider-orientation'
		);

		if ( this.sliderInput ) {
			this.sliderInput.addEventListener( 'input', ( e ) => {
				this.updateSliderPosition( e.target.value );
			} );
		}

		if ( this.moveOnHover ) {
			this.slider.addEventListener( 'mousemove', ( e ) => {
				this.handleMouseMove( e );
			} );
		}
	}

	updateSliderPosition( position ) {
		const beforeImage = this.slider.querySelector(
			'.ablocks-image-comparison__before-image'
		);
		const sliderLine = this.slider.querySelector(
			'.ablocks-image-comparison__slider-line'
		);
		const sliderIcon = this.slider.querySelector(
			'.ablocks-image-comparison__slider-icon'
		);

		if ( this.sliderOrientation === 'horizontal' ) {
			beforeImage.style.width = position + '%';
			sliderLine.style.left = position + '%';
			sliderIcon.style.left = position + '%';
		} else {
			beforeImage.style.height = position + '%';
			sliderLine.style.top = position + '%';
			sliderIcon.style.top = position + '%';
		}
	}

	handleMouseMove( e ) {
		const rect = this.slider.getBoundingClientRect();
		let newValue;

		if ( this.sliderOrientation === 'horizontal' ) {
			const offsetX = e.clientX - rect.left;
			newValue = Math.round( ( offsetX / rect.width ) * 100 );
		} else {
			const offsetY = e.clientY - rect.top;
			newValue = Math.round( ( offsetY / rect.height ) * 100 );
		}

		newValue = Math.max( 0, Math.min( 100, newValue ) );

		if ( this.sliderInput ) {
			this.sliderInput.value = newValue;
			this.updateSliderPosition( newValue );
		}
	}
}

export default ABlocksImageComparison;
