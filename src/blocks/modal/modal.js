const openPanel = ( element ) => {
	element.classList.add( 'ablocks-block-modal-panel-visibility--open' );
};
const closePanel = ( element ) => {
	const blockId = element.classList[ 1 ].replace( 'ablocks-block-', '' );
	element.classList.remove( 'ablocks-block-modal-panel-visibility--open' );

	if ( element.dataset.autoShowOnce === 'true' ) {
		localStorage.setItem( `ablocks-modal-${ blockId }`, 'true' );
	}
};
const modal = ( element ) => {
	const panelOpener = () => openPanel( element );
	const panelCloser = () => closePanel( element );

	const isOnHover = element.classList.contains( 'ablocks-trigger-on-hover' );
	const triggerElement = element.querySelector(
		'.ablocks-modal-trigger-wrap'
	);
	if ( triggerElement ) {
		if ( isOnHover ) {
			triggerElement.addEventListener( 'mouseenter', panelOpener );
		} else {
			triggerElement.addEventListener( 'click', ( e ) => {
				e.preventDefault();
				panelOpener();
			} );
		}
	}

	// Show Modal on Mouse Out of Window
	const showOnMouseOutofWindow = element.getAttribute(
		'data-show-on-mouse-out'
	);
	if ( showOnMouseOutofWindow === 'true' ) {
		// when the cursor leaves the window, open the modal
		const showAutoOnce = element?.dataset?.autoShowOnce === 'true';
		document.addEventListener( 'mouseout', ( e ) => {
			if (
				! element.classList.contains(
					'ablocks-block-modal-panel-visibility--open'
				)
			) {
				if ( e.clientY < 0 ) {
					if (
						showAutoOnce &&
						localStorage.getItem(
							`ablocks-modal-${ element.classList[ 1 ].replace(
								'ablocks-block-',
								''
							) }`
						)
					) {
						return;
					}
					panelOpener();
				}
			}
		} );
	}

	// Open Modal automatically after specified time when 'auto trigger' is enabled - start
	const autoTriggerTime = element?.dataset?.autoTriggerTime;
	if ( autoTriggerTime ) {
		const showAutoOnce = element?.dataset?.autoShowOnce === 'true';
		// Check if the modal has already been shown once
		if (
			showAutoOnce &&
			localStorage.getItem(
				`ablocks-modal-${ element.classList[ 1 ].replace(
					'ablocks-block-',
					''
				) }`
			)
		) {
			return;
		}
		setTimeout( panelOpener, parseInt( autoTriggerTime ) * 1000 );
	}
	// Open Modal automatically after specified time when 'auto trigger' is enabled - end

	// CLose Modal When Clicked 'close button' - start
	const closeBtn = element.querySelector( '.ablocks-modal-popup-close' );
	if ( closeBtn ) {
		closeBtn.addEventListener( 'click', panelCloser );
	}
	// CLose Modal When Clicked 'close button' - end

	// Close Modal When It's Open & Clicked Outside of the content area - start
	const popupContentWrap = element.querySelector(
		'.ablocks-modal-popup-content-wrap'
	);
	document.addEventListener( 'click', ( e ) => {
		if (
			! popupContentWrap.contains( e.target ) &&
			! triggerElement.contains( e.target )
		) {
			closePanel( element );
		}
	} );
	// Close Modal When It's Open & Clicked Outside of the content area - end
};

export default modal;
