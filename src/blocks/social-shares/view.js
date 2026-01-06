document.addEventListener( 'DOMContentLoaded', function () {
	const socialShareBlocks = document.querySelectorAll(
		'.ablocks-social-share-item'
	);

	// Iterate through each block instance
	socialShareBlocks.forEach( ( block ) => {
		// Access `data-windowspopup` from the block itself
		const windowsPopUp =
			block.getAttribute( 'data-windowspopup' ) === 'true';

		function handleSocialClick( event, url ) {
			event.preventDefault();
			if ( windowsPopUp ) {
				const width = 600;
				const height = 400;
				const left = ( window.innerWidth - width ) / 2;
				const top = ( window.innerHeight - height ) / 2;
				window.open(
					url,
					'_blank',
					`width=${ width },height=${ height },top=${ top },left=${ left }`
				);
			} else {
				window.open( url, '_blank' );
			}
		}

		// Attach click events to each button
		block.addEventListener( 'click', ( e ) => {
			const currentUrl = window.location.href;
			const link = block.getAttribute( 'href' );
			const fullLink = `${ link }${ currentUrl }`;
			handleSocialClick( e, fullLink );
		} );
	} );
} );
