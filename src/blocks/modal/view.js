import modal from './modal';

function initializeModal() {
	const modals = document.querySelectorAll(
		':not(.block-editor-block-list__block).ablocks-block--modal'
	);

	modals.forEach( ( element ) => {
		modal( element );
	} );
}

document.addEventListener( 'DOMContentLoaded', () => {
	initializeModal();
} );
