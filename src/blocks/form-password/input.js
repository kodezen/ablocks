function ablocksInput( element ) {
	const input = element?.querySelector( '.ablocks-form-builder__input' );
	const toggleShowPassword = element?.querySelector(
		'.ablocks-form-builder__input-toggle--show-password'
	);
	const toggleHidePassword = element?.querySelector(
		'.ablocks-form-builder__input-toggle--hide-password'
	);
	const checkRequired = element?.getAttribute( 'data-required' );
	if ( input && checkRequired === 'true' ) {
		input?.addEventListener( 'focusout', () => {
			if ( input?.value.trim() === '' ) {
				element?.classList.add( 'error-msg' );
			}
		} );
	}
	input?.addEventListener( 'input', () => {
		if ( input.value.trim() !== '' ) {
			element?.classList.remove( 'error-msg' );
		}
	} );
	function toggle( passwordShow ) {
		if ( ! toggleHidePassword && ! toggleShowPassword ) {
			return;
		}
		if ( passwordShow ) {
			input.type = 'password';
			toggleShowPassword?.classList.add(
				'ablocks-form-builder__input-toggle--show-password--active'
			);
			toggleHidePassword?.classList.remove(
				'ablocks-form-builder__input-toggle--hide-password--active'
			);
		} else {
			input.type = 'text';
			toggleShowPassword?.classList.remove(
				'ablocks-form-builder__input-toggle--show-password--active'
			);
			toggleHidePassword?.classList.add(
				'ablocks-form-builder__input-toggle--hide-password--active'
			);
		}
	}

	if ( toggleShowPassword ) {
		toggleShowPassword.addEventListener( 'click', () => toggle( false ) );
	}

	if ( toggleHidePassword ) {
		toggleHidePassword.addEventListener( 'click', () => toggle( true ) );
	}

	toggle( true );
}

export default ablocksInput;
