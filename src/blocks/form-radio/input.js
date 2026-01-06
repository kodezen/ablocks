function ablocksInput( element ) {
	const inputAllOptions = element?.querySelectorAll(
		'.ablocks-form-builder__radio-all-options .ablocks-form-builder__radio-option'
	);
	if ( inputAllOptions ) {
		const inputArray = Array.from( inputAllOptions );
		inputArray.forEach( ( input ) => {
			input.addEventListener( 'click', ( event ) => {
				const clickInput = input.querySelector( 'input' );

				if ( clickInput.type === 'checkbox' ) {
					// Uncheck all other inputs and remove the checked class
					if ( event.target === clickInput ) {
						inputArray.forEach( ( inputItem ) => {
							if (
								inputItem.querySelector( 'input' ).checked !==
								true
							) {
								inputItem.classList.remove( 'checked' );
							}
						} );
						if ( clickInput.checked === true ) {
							input.classList.add( 'checked' );
						} else {
							input.classList.remove( 'checked' );
						}
					} else {
						inputArray.forEach( ( inputItem ) => {
							if (
								inputItem.querySelector( 'input' ).checked !==
								true
							) {
								inputItem.classList.remove( 'checked' );
							}
						} );
						// Check the clicked input and add the checked class
						clickInput.checked = ! clickInput.checked;
						if ( clickInput.checked === true ) {
							input.classList.add( 'checked' );
						} else {
							input.classList.remove( 'checked' );
						}
					}
				} else if ( clickInput.type === 'radio' ) {
					if ( event.target === clickInput ) {
						inputArray.forEach( ( inputItem ) => {
							inputItem.classList.remove( 'checked' );
						} );
						if ( clickInput.checked === true ) {
							input.classList.add( 'checked' );
						}
					} else {
						inputArray.forEach( ( inputItem ) => {
							inputItem.classList.remove( 'checked' );
						} );
						clickInput.checked = ! clickInput.checked;
						if ( clickInput.checked === true ) {
							input.classList.add( 'checked' );
						}
					}
				}
			} );
		} );
	}
}

export default ablocksInput;
