const copyCouponCode = (
	couponCode,
	onCopyCallback,
	onResetCallback,
	resetDelay = 3000
) => {
	const textArea = document.createElement( 'textarea' );
	textArea.value = couponCode;
	document.body.appendChild( textArea );
	textArea.select();
	document.execCommand( 'copy' );
	document.body.removeChild( textArea );

	if ( onCopyCallback ) {
		onCopyCallback();
	}

	if ( onResetCallback ) {
		setTimeout( () => {
			onResetCallback();
		}, resetDelay );
	}
};

const handleCopyAction = (
	clipboardText,
	couponCode,
	newText,
	couponStyle,
	clippedText
) => {
	copyCouponCode(
		couponCode,
		() => {
			if ( couponStyle === 'style4' ) {
				clipboardText.style.opacity = 0;
			} else {
				clipboardText.textContent = newText;
			}
		},
		() => (
			couponStyle !== 'style4'
				? ( clipboardText.textContent = clippedText )
				: '',
			( clipboardText.style.opacity = 1 )
		),
		3000
	);
};

const ablocksCoupon = ( element ) => {
	let clipboard = element.querySelector( '.ablocks-coupon-clipboard' );
	let clipboardText = clipboard;

	const couponCode = element.getAttribute( 'data-coupon-code' );
	const couponBtnText = element.getAttribute( 'data-clipboard-text' );
	const couponBtnAfterCopyText = element.getAttribute( 'data-clipped-text' );
	const couponStyle = element.getAttribute( 'data-coupon-style' );

	let clippedText = couponBtnText;

	if ( couponStyle === 'default' || couponStyle === 'style2' ) {
		clipboard = element.querySelector( '.ablocks-coupon-clipboard' );
		clipboardText = element.querySelector(
			'.ablocks-coupon-clipboard-text'
		);
		clippedText = couponBtnText;
	} else if ( couponStyle === 'style4' ) {
		clipboard = element.querySelector( '.ablocks-coupon-clipboard' );
		clipboardText = clipboard;
		clippedText = couponBtnText;
	} else {
		clipboard = element.querySelector( '.ablocks-coupon-code' );
		clipboardText = element.querySelector( '.ablocks-coupon-code-text' );
		clippedText = couponCode;
	}

	clipboard?.addEventListener( 'click', () => {
		handleCopyAction(
			clipboardText,
			couponCode,
			couponBtnAfterCopyText,
			couponStyle,
			clippedText
		);
	} );
};

export default ablocksCoupon;
