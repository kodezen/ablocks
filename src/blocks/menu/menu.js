function ABlocksMenu( element ) {
	const hamburger = element?.querySelector( '.ablocks-simple-menu-burger' );
	const close = element?.querySelector( '.ablocks-simple-menu-close' );
	const ParentMenu = element?.querySelector( '.ablocks-simple-menu-parent' );

	hamburger?.addEventListener( 'click', () => {
		ParentMenu.style.display = 'flex';
	} );

	close?.addEventListener( 'click', () => {
		ParentMenu.style.display = 'none';
	} );
}

export default ABlocksMenu;
