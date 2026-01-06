import { __ } from '@wordpress/i18n';

function ablocksInput( element ) {
	const input = element?.querySelector( '.ablocks-form-builder__input' );
	const checkRequired = element?.getAttribute( 'data-required' );
	const inputType = input?.getAttribute( 'type' );

	// Email validation regex
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const urlRegex =
		/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

	// Function to validate email
	const validateEmail = ( value ) => {
		return emailRegex.test( value );
	};

	const validateUrl = ( value ) => {
		return urlRegex.test( value );
	};

	if ( input ) {
		// Handle required field validation
		if ( checkRequired === 'true' ) {
			input?.addEventListener( 'focusout', () => {
				if ( input.value.trim() === '' ) {
					element.classList.add( 'error-msg' );
					const errorDiv = element.querySelector(
						'.ablocks-block-error-msg'
					);
					if ( errorDiv ) {
						errorDiv.textContent = __(
							'This field is required',
							'ablocks'
						);
					}
				} else if (
					inputType === 'email' &&
					! validateEmail( input.value.trim() )
				) {
					// Handle invalid email
					element.classList.add( 'error-msg' );
					const errorDiv = element.querySelector(
						'.ablocks-block-error-msg'
					);
					if ( errorDiv ) {
						errorDiv.textContent = __(
							'Please enter a valid Email',
							'ablocks'
						);
					}
				} else if (
					inputType === 'url' &&
					! validateUrl( input.value.trim() )
				) {
					// Handle invalid URL
					element.classList.add( 'error-msg' );
					const errorDiv = element.querySelector(
						'.ablocks-block-error-msg'
					);
					if ( errorDiv ) {
						errorDiv.textContent = __(
							'Please enter a valid URL',
							'ablocks'
						);
					}
				}
			} );
		}

		input?.addEventListener( 'input', () => {
			if ( input.value.trim() !== '' ) {
				if (
					inputType === 'email' &&
					! validateEmail( input.value.trim() )
				) {
					// Keep error if email is invalid
					element.classList.add( 'error-msg' );
					const errorDiv = element.querySelector(
						'.ablocks-block-error-msg'
					);
					if ( errorDiv ) {
						errorDiv.textContent = __(
							'Please enter a valid Email',
							'ablocks'
						);
					}
				} else if (
					inputType === 'url' &&
					! validateUrl( input.value.trim() )
				) {
					// Keep error if URL is invalid
					element.classList.add( 'error-msg' );
					const errorDiv = element.querySelector(
						'.ablocks-block-error-msg'
					);
					if ( errorDiv ) {
						errorDiv.textContent = __(
							'Please enter a valid URL',
							'ablocks'
						);
					}
				} else {
					// Remove error if input is valid
					element.classList.remove( 'error-msg' );
					const errorDiv = element.querySelector(
						'.ablocks-block-error-msg'
					);
					if ( errorDiv ) {
						errorDiv.textContent =
							checkRequired === 'true'
								? __( 'This field is required', 'ablocks' )
								: '';
					}
				}
			} else if ( checkRequired === 'true' ) {
				element.classList.add( 'error-msg' );
				const errorDiv = element.querySelector(
					'.ablocks-block-error-msg'
				);
				if ( errorDiv ) {
					errorDiv.textContent = __(
						'This field is required',
						'ablocks'
					);
				}
			} else {
				element.classList.remove( 'error-msg' );
			}
		} );
	}
}

export default ablocksInput;
