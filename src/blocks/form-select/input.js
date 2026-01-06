function ablocksInput( element ) {
	const input = element?.querySelector( '.ablocks-form-builder__select' );
	const checkRequired = element?.getAttribute( 'data-required' );
	if ( input && checkRequired === 'true' ) {
		input?.addEventListener( 'focusout', () => {
			if ( input.value.trim() === '' ) {
				element.classList.add( 'error-msg' );
			}
		} );
	}
	input?.addEventListener( 'input', () => {
		if ( input.value.trim() !== '' ) {
			element.classList.remove( 'error-msg' );
		}
	} );
}

export default ablocksInput;
