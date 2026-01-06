import { makeRequest, ablocks_nonce } from './../view-helper';

class FormBuilder {
	constructor( element ) {
		this.form = element?.querySelector( 'form.ablocks-form-builder' );
		this.formParent = this.form?.parentNode;

		this.submitButtonDiv = element?.querySelector(
			'.ablocks-form-builder__submit-button'
		);
		this.submitButton = this.form.querySelector( 'button[type="submit"]' );
		this.submitButtonText = this.submitButton?.innerText;

		this.init();
	}

	init() {
		this.form
			.querySelector( 'input[name="security"]' )
			.setAttribute( 'value', ablocks_nonce );
		this.feedbackContainer = this.formParent.querySelector(
			'.ablocks-block--form-builder__feedback-message'
		);
		this.feedbackContainer.style.display = 'none';

		this.form.addEventListener( 'submit', this.handleSubmit.bind( this ) );
	}
	async handleSubmit( event ) {
		event.preventDefault();
		const hasError = this.validateFields();

		if ( ! hasError ) {
			const multistepForm = this.form?.querySelector(
				'.ablocks-block--form-multi-step'
			);
			if ( ! multistepForm ) {
				this.setLoadingState( true );
			}
			const formData = new FormData( this.form );
			const data = Object.fromEntries( formData );
			this.collectCheckedOptionsText( formData );

			try {
				const response = await makeRequest( formData );
				if ( response ) {
					this.handleResponse( response );
				}
			} catch ( error ) {
				this.showFeedbackMessage(
					'An error occurred. Please try again.',
					'error'
				);
			} finally {
				this.setLoadingState( false );
			}
		}
	}

	collectFieldLabels( formData ) {
		const fields = this.form.querySelectorAll(
			'.ablocks-form-builder__field'
		);

		fields.forEach( ( field ) => {
			const inputs = field.querySelectorAll( 'input, textarea, select' );
			const label = field.querySelector( '.ablocks-form-builder__label' );

			inputs.forEach( ( input ) => {
				if ( input && input.name ) {
					let labelText = '';
					const inputType = input.tagName.toLowerCase();

					if ( label && label.textContent.trim() ) {
						labelText = label.textContent.trim();
					} else if ( input.placeholder ) {
						labelText = input.placeholder;
					} else {
						labelText = input.name;
					}

					formData.append( `${ input.name }_label`, labelText );
					formData.append( `${ input.name }_inputType`, inputType );
				}
			} );
		} );
	}

	validateFields() {
		let hasError = false;
		const fields = this.form.querySelectorAll(
			'.ablocks-form-builder__field'
		);

		fields.forEach( ( field ) => {
			const isRequired = field.getAttribute( 'data-required' ) === 'true';
			const input = field.querySelector( 'input, textarea' );
			const select = field.querySelector( 'select' );
			const checkbox = field.querySelector( 'input[type="checkbox"]' );
			const radio = field.querySelector( 'input[type="radio"]' );
			const isCheckboxGroup = field.querySelectorAll(
				'.ablocks-form-builder__radio-option'
			);
			const radioButtonChecked = field.querySelector(
				'input[type="radio"]:checked'
			);
			let isValid = true;
			if ( isCheckboxGroup?.length >= 1 ) {
				const minimumValue = parseInt(
					field?.getAttribute( 'data-minimum-value' )
				);
				const maximumValue = parseInt(
					field?.getAttribute( 'data-maximum-value' )
				);
				const checkedCount = Array.from( isCheckboxGroup ).filter(
					( option ) => option.classList.contains( 'checked' )
				).length;

				if ( minimumValue > checkedCount && isRequired ) {
					this.showFeedbackMessage(
						`At Least Select ${ minimumValue } Value`,
						'error'
					);
					isValid = false;
				} else if ( maximumValue < checkedCount && isRequired ) {
					isValid = false;
					this.showFeedbackMessage(
						`Never Select More Than ${ maximumValue } Value`,
						'error'
					);
				} else if ( isRequired && checkedCount < 1 ) {
					this.showFeedbackMessage(
						`Checkbox Field Are Required`,
						'error'
					);
					isValid = false;
				}
			}

			// Field validation
			if ( isRequired ) {
				if (
					checkbox &&
					isCheckboxGroup.length === 0 &&
					! checkbox.checked
				) {
					// Only validate single checkbox, not checkbox groups
					isValid = false;
				} else if ( radio && ! radioButtonChecked ) {
					isValid = false;
				} else if ( input && input.value.trim() === '' ) {
					isValid = false;
				} else if ( select && select.value === '' ) {
					isValid = false;
				}
			}

			field.classList.toggle( 'error-msg', ! isValid );
			if ( ! isValid ) {
				hasError = true;
			}
		} );

		return hasError;
	}

	// Collect text of checked options for checkboxes and radio buttons
	collectCheckedOptionsText( data ) {
		const fields = this.form.querySelectorAll(
			'.ablocks-form-builder__field'
		);
		fields.forEach( ( field ) => {
			const checkboxGroup = field.querySelectorAll(
				'.ablocks-form-builder__radio-option'
			);
			const radioGroup = field.querySelectorAll( 'input[type="radio"]' );

			// Collect text for checked checkbox options
			if ( checkboxGroup.length > 0 ) {
				const checkedOptionsText = [];
				checkboxGroup.forEach( ( option ) => {
					if ( option.classList.contains( 'checked' ) ) {
						checkedOptionsText.push( option.innerText.trim() );
					}
				} );

				if ( checkedOptionsText.length > 0 ) {
					const checkboxName = field.querySelector(
						'input[type="checkbox"]'
					)?.name;
					if ( checkboxName ) {
						data[ checkboxName ] = checkedOptionsText.join( ', ' );
					}
				}
			}

			// Collect text for checked radio options
			if ( radioGroup.length > 0 ) {
				const selectedRadio = Array.from( radioGroup ).find(
					( radio ) => radio.checked
				);
				if ( selectedRadio ) {
					const radioName = selectedRadio.name;
					const radioText =
						selectedRadio.parentElement.innerText.trim(); // Assuming text is in the parent element
					data[ radioName ] = radioText;
				}
			}
		} );
	}
	setLoadingState( isLoading ) {
		// Store the button height before making changes
		if ( ! this.originalButtonHeight && this.submitButton ) {
			this.originalButtonHeight = this.submitButton.offsetHeight;
		}

		if ( isLoading ) {
			this.submitButton.innerText = ''; // Clear the text
			this.submitButton.classList.add( 'loading' );
			this.submitButton.style.height = `${ this.originalButtonHeight }px`; // Set the height explicitly
		} else {
			this.submitButton.innerText = this.submitButtonText; // Restore original text
			this.submitButton.classList.remove( 'loading' );
			this.submitButton.style.height = ''; // Remove the height style to allow auto height adjustment
		}
	}

	handleResponse( response ) {
		const success = response?.data?.success;
		const message = success
			? response?.data?.data?.confirmationNotice
			: response?.data?.data?.message;
		const afterFormSubmission = response?.data?.data?.afterFormSubmission;
		const confirmationType = response?.data?.data?.confirmationType;
		const feedbackType = success ? 'success' : 'error';
		const feedbackMessage = message;
		const redirect_url = response?.data?.data?.redirect_url;
		const newTab = response?.data?.data?.link_target;
		const formType = response?.data?.data?.formType;
		if ( confirmationType === 'success' || newTab ) {
			this.showFeedbackMessage( feedbackMessage, feedbackType );
		}
		if ( success && redirect_url && confirmationType === 'redirect' ) {
			if ( newTab ) {
				// Open the URL in a new tab if newTab is true
				this.form.reset();
				window.open( redirect_url, '_blank' );
				if ( afterFormSubmission === 'hide' ) {
					this.form.style.display = 'none';
				}
				if ( formType === 'login' || formType === 'registration' ) {
					setTimeout( () => {
						window.location.reload();
					}, 2000 );
				}
			} else if ( formType === 'login' || formType === 'registration' ) {
				this.showFeedbackMessage( feedbackMessage, feedbackType );
				setTimeout( () => {
					window.location.href = redirect_url;
				}, 2000 );
			} else {
				window.location.href = redirect_url;
			}
		} else if ( success === true && afterFormSubmission === 'reset' ) {
			this.form.reset();
			// Reload page for login/registration forms
			if ( formType === 'login' || formType === 'registration' ) {
				setTimeout( () => {
					window.location.reload();
				}, 2000 );
			} else {
				setTimeout( () => {
					this.feedbackContainer.style.display = 'none';
				}, 20000 );
			}
		} else if ( success === true && afterFormSubmission === 'hide' ) {
			this.form.reset();
			this.form.style.display = 'none';
			setTimeout( () => {
				this.form.style.display = 'flex';
				this.feedbackContainer.style.display = 'none';
			}, 20000 );
		}
	}

	showFeedbackMessage( message, type ) {
		this.feedbackContainer.style.display = 'block';

		this.feedbackContainer.innerHTML = `<p class="${ type }-msg">${ message }</p>`;
		this.feedbackContainer.className =
			'ablocks-block--form-builder__feedback-message'; // Reset classes
		this.feedbackContainer.classList.add(
			'ablocks-block--form-builder__' + type
		);
	}
}

export default FormBuilder;
