class ABlocksAccordion {
	constructor( element, editor = true, settings = {} ) {
		this.accordion = element;
		this.editor = editor;
		const dataSettings = this.getDataSettings();
		this.settings = {
			...this.getDefaultSettings(),
			...dataSettings,
			...settings,
		};
		this.elements = this.getElements();
		this.eventListeners = [];
		this.isAnimating = false;
		this.bindEvents();
		this.defaultActiveTab();
	}

	getDefaultSettings() {
		return {
			selectors: {
				tabTitle: '.ablocks-block--single-accordion',
				tabContent: '.ablocks-block--single-accordion__body',
			},
			classes: {
				activeItem: 'ablocks-block--single-accordion-is-selected',
			},
			toggleSelf: true,
			hidePrevious: true,
			autoExpand: true,
			allowMultiple: false,
			initialOpen: 0,
		};
	}

	getDataSettings() {
		return {
			allowMultiple:
				this.accordion.getAttribute( 'data-multiple' ) === 'true',
			initialOpen:
				parseInt(
					this.accordion.getAttribute( 'data-initial-open' )
				) || 0,
		};
	}

	getElements() {
		const { tabTitle, tabContent } = this.settings.selectors;
		return {
			tabTitles: this.queryElements( tabTitle ),
			tabContents: this.queryElements( tabContent ),
		};
	}

	queryElements( selector ) {
		return Array.from( this.accordion.querySelectorAll( selector ) );
	}

	bindEvents() {
		this.elements.tabTitles.forEach( ( tabTitle ) => {
			const heading = tabTitle.querySelector(
				'.ablocks-block--single-accordion__heading'
			);
			const clickHandler = ( event ) => {
				event.preventDefault();
				if ( ! this.isAnimating ) {
					// Check if animation is running
					this.changeActiveTab(
						tabTitle.getAttribute( 'data-id-acc' )
					);
				}
			};
			heading.addEventListener( 'click', clickHandler );
			this.eventListeners.push( {
				element: heading,
				handler: clickHandler,
			} );
		} );
	}

	isActiveTab( tabIndex ) {
		const { activeItem } = this.settings.classes;
		const tabTitle = this.elements.tabTitles.find(
			( tab ) => tab.getAttribute( 'data-id-acc' ) === tabIndex
		);
		return tabTitle && tabTitle.classList.contains( activeItem );
	}

	changeActiveTab( tabIndex ) {
		const isActive = this.isActiveTab( tabIndex );
		const { toggleSelf, allowMultiple } = this.settings;

		if ( ! allowMultiple ) {
			if (
				( this.editor === false && toggleSelf === true ) ||
				! isActive
			) {
				this.deactivateAllTabs();
			}
			if ( ! isActive ) {
				this.activateTab( tabIndex );
			}
		} else if ( isActive ) {
			this.deactivateTab( tabIndex );
		} else {
			this.activateTab( tabIndex );
		}
	}

	deactivateAllTabs() {
		const { activeItem } = this.settings.classes;
		this.elements.tabTitles.forEach( ( tabTitle ) => {
			if ( tabTitle.classList.contains( activeItem ) ) {
				const tabIndex = tabTitle.getAttribute( 'data-id-acc' );
				this.deactivateTab( tabIndex );
			}
		} );
	}

	deactivateTab( tabIndex ) {
		const { activeItem } = this.settings.classes;
		const tabTitle = this.elements.tabTitles.find(
			( tab ) => tab.getAttribute( 'data-id-acc' ) === tabIndex
		);
		if ( tabTitle ) {
			tabTitle.classList.remove( activeItem );
			this.slideUp( tabIndex );
		}
	}

	activateTab( tabIndex ) {
		const { activeItem } = this.settings.classes;
		const tabTitle = this.elements.tabTitles.find(
			( tab ) => tab.getAttribute( 'data-id-acc' ) === tabIndex
		);
		if ( tabTitle ) {
			tabTitle.classList.add( activeItem );
			this.slideDown( tabIndex );
		}
	}

	removeListeners() {
		this.eventListeners.forEach( ( { element, handler } ) => {
			element.removeEventListener( 'click', handler );
		} );
		this.eventListeners = [];
	}

	defaultActiveTab() {
		const { initialOpen } = this.settings;
		if ( initialOpen > 0 ) {
			this.activateTab( ( initialOpen - 1 ).toString() );
		}
	}

	slideDown( tabIndex ) {
		const tabContent = this.elements.tabContents.find(
			( tab ) =>
				tab.parentElement.getAttribute( 'data-id-acc' ) === tabIndex
		);
		const contentHeight = tabContent.scrollHeight;

		this.isAnimating = true;

		// Set initial height and transition
		tabContent.style.height = '0px';
		tabContent.style.display = 'block';
		tabContent.style.transition = 'height 0.4s ease, visibility 0.4s ease';

		// Trigger reflow and expand height
		setTimeout( () => {
			tabContent.style.height = `${ contentHeight }px`;
		}, 10 );

		// Clear height after transition completes
		setTimeout( () => {
			tabContent.style.height = 'auto';
			tabContent.style.transition = '';
			this.isAnimating = false;
		}, 400 );
	}

	slideUp( tabIndex ) {
		const tabContent = this.elements.tabContents.find(
			( tab ) =>
				tab.parentElement.getAttribute( 'data-id-acc' ) === tabIndex
		);

		this.isAnimating = true;
		// Set initial height and transition
		tabContent.style.height = `${ tabContent.scrollHeight }px`;
		tabContent.style.transition = 'height 0.4s ease, visibility 0.4s ease';

		// Trigger reflow and collapse height
		setTimeout( () => {
			tabContent.style.height = '0px';
		}, 10 );

		// Hide content after transition completes
		setTimeout( () => {
			tabContent.style.display = 'none';
			tabContent.style.transition = '';
			this.isAnimating = false;
		}, 400 );
	}
}

export default ABlocksAccordion;
