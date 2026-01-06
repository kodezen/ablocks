const ablocksToggle = ( element ) => {
	const childElements = element.querySelectorAll(
		'.ablocks-block--toggle-child'
	);
	const toggleBtn = element.querySelector( '.ablocks-toggle__checkbox' );
	const leftLabel = element?.querySelector( '.ablocks-toggle__label--left' );
	const rightLabel = element?.querySelector(
		'.ablocks-toggle__label--right'
	);

	toggleBtn.onchange = ( event ) => handleToggle( event.target.checked );

	const handleToggle = ( currentSwitch ) => {
		if ( ! currentSwitch ) {
			childElements[ 0 ].classList.add(
				'ablocks-block--toggle-child--active'
			);
			childElements[ 1 ].classList.remove(
				'ablocks-block--toggle-child--active'
			);
			leftLabel.classList.add( 'ablocks-toggle__label--active' );
			rightLabel.classList.remove( 'ablocks-toggle__label--active' );
		} else {
			childElements[ 1 ].classList.add(
				'ablocks-block--toggle-child--active'
			);
			childElements[ 0 ].classList.remove(
				'ablocks-block--toggle-child--active'
			);
			leftLabel.classList.remove( 'ablocks-toggle__label--active' );
			rightLabel.classList.add( 'ablocks-toggle__label--active' );
		}
	};
	handleToggle( toggleBtn.checked );
};

export default ablocksToggle;
