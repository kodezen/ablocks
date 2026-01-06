class ABlocksNav {
	constructor( element, isFrontend = false ) {
		this.element = element;
		const menuDevice = element?.getAttribute( 'data-menu-device' );
		this.menuDevice = menuDevice;
		this.menu = element?.querySelector( `.ablocks-menu-${ menuDevice }` );
		this.newMenu = this.menu?.cloneNode( true );
		this.mainMenu = this.newMenu?.querySelector( '.ablocks-main-menu' );
		this.initMenuTriggers( isFrontend );
		this.initMenuItems( isFrontend );
		this.editorDiv = document?.querySelector(
			'.interface-navigable-region.interface-interface-skeleton__content'
		);
	}
	initMenuTriggers( isFrontend ) {
		const toggleButton = this.element?.querySelector(
			`.ablocks-menu-${ this.menuDevice }__trigger`
		);
		this.toggleButton = toggleButton;
		toggleButton?.addEventListener( 'click', () =>
			this.toggleMenu( isFrontend )
		);
	}

	initMenuItems( isFrontend ) {
		if ( ! isFrontend || ! this.mainMenu ) {
			return;
		}

		const menuItems =
			this.mainMenu?.querySelectorAll( '.ablocks-menu-item' );
		menuItems.forEach( ( menuItem ) => {
			menuItem?.addEventListener( 'click', ( event ) => {
				event.stopPropagation();
				this.toggleMenuItem( menuItem, event );
			} );
		} );
	}

	toggleMenuItem( menuItem, event ) {
		if ( ! event.target.closest( '.ablocks-menu-child-mega' ) ) {
			menuItem.classList.toggle( 'ablocks-sub-menu--active' );
		}
	}

	toggleMenu = ( isFrontend ) => {
		const newMenu = this.newMenu;
		const toggleButtonRect = this.toggleButton.getBoundingClientRect();
		if ( ! isFrontend ) {
			this.menu.classList.toggle(
				`ablocks-menu-${ this.menuDevice }--active`
			);
		}
		newMenu.style.position = 'absolute';
		newMenu.style.top = `${ toggleButtonRect.bottom + window.scrollY }px`;
		newMenu.style.right = `${
			window.innerWidth - toggleButtonRect.right
		}px`;
		newMenu.classList.add( 'ablocks-menu--outside' );
		newMenu?.classList.toggle(
			`ablocks-menu-${ this.menuDevice }--active`
		);
		if ( isFrontend ) {
			document.body.appendChild( newMenu );
		}
	};

	toggleSubMenu( subMenu ) {
		subMenu.classList.toggle( 'ablocks-menu-child-sub--active' );
	}

	toggleMegaMenu( megaMenu, event ) {
		if ( ! event.target.closest( '.ablocks-menu-child-mega--active' ) ) {
			megaMenu.classList.toggle( 'ablocks-menu-child-mega--active' );
		}
	}
}

export default ABlocksNav;
