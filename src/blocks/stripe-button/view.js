import { makeRequest } from './../view-helper';

function initialStripeButton() {
	const stripeButtons = document.querySelectorAll( '.ablocks-stripe-form' );

	stripeButtons.forEach( ( form ) => {
		const blockId = form.getAttribute( 'data-ablocks__block-id' );
		const currentPostId = form.getAttribute( 'data-ablocks__post-id' );
		const openInNewTab = form.getAttribute( 'data-ablocks__open-new-tab' );
		const errorMessage = form.getAttribute( 'data-ablocks__error-msg' );
		form.querySelector( 'input[name="current_url"]' ).value =
			window.location.href;

		form.addEventListener( 'submit', ( event ) => {
			event.preventDefault();

			makeRequest( {
				action: 'ablocks/stripe_payment_process',
				block_id: blockId,
				current_post_id: currentPostId,
			} ).then( ( res ) => {
				const response = res.data;
				if ( response.success ) {
					// eslint-disable-next-line
					if (openInNewTab == 'true') {  
						window.open( response.data.redirect_url, '_blank' );
					} else {
						window.open( response.data.redirect_url, '_self' );
					}
				} else {
					displayErrorMessage( form, errorMessage );
				}
			} );
		} );
	} );
}

// Display error message
function displayErrorMessage( form, errorMessage ) {
	const errorElement = form.querySelector( '.ablocks-stripe-button__error' );
	errorElement.innerHTML = errorMessage;
}

// Initialize on DOMContentLoaded
document.addEventListener( 'DOMContentLoaded', () => {
	initialStripeButton();
} );
