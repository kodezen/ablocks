document.addEventListener( 'DOMContentLoaded', function () {
	const iconButtons = document.querySelectorAll(
		'.ablocks-block--notice .ablocks-icon-wrap'
	);
	iconButtons.forEach( function ( iconButton, index ) {
		const noticeDiv = iconButton.closest( '.ablocks-block--notice' );
		const noticeContainer = iconButton.closest( '.ablocks-notice-header' );
		const noticeClose = noticeContainer.getAttribute( 'data-notice-close' );
		const noticeKey = `ablocks_notice_${ index }`;
		const storedState = localStorage.getItem( noticeKey );
		if (
			noticeClose === 'permanent' &&
			storedState === 'hidden' &&
			noticeDiv
		) {
			noticeDiv.style.display = 'none';
		}
		if ( noticeClose === 'oneTime' ) {
			noticeDiv.style.display = 'block';
		}
		iconButton.addEventListener( 'click', function () {
			if ( noticeDiv ) {
				if ( noticeDiv.style.display === 'none' ) {
					noticeDiv.style.display = 'block';
					if ( noticeClose === 'oneTime' ) {
						localStorage.removeItem( noticeKey );
					}
				} else {
					noticeDiv.style.display = 'none';
					if ( noticeClose === 'permanent' ) {
						// Store 'hidden' permanently for 'parament'
						localStorage.setItem( noticeKey, 'hidden' );
					} else if ( noticeClose === 'oneTime' ) {
						localStorage.removeItem( noticeKey );
					}
				}
			}
		} );
	} );
} );
