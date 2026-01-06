document.addEventListener( 'DOMContentLoaded', function () {
	const tocLinks = document.querySelectorAll( '.ablocks-toc-item-link' );

	tocLinks.forEach( ( link ) => {
		link.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			const targetId = this.getAttribute( 'href' ).substring( 1 );
			const targetElement = document.getElementById( targetId );

			if ( targetElement ) {
				targetElement.scrollIntoView( {
					behavior: 'smooth',
					block: 'start',
				} );

				tocLinks.forEach( ( lnk ) => lnk.classList.remove( 'active' ) );
				this.classList.add( 'active' );
			}
		} );
	} );

	if ( tocLinks.length ) {
		const headings = Array.from( tocLinks )
			.map( ( link ) => {
				const id = link.getAttribute( 'href' )?.substring( 1 );
				return document.getElementById( id );
			} )
			.filter( Boolean );

		const observer = new IntersectionObserver(
			( entries ) => {
				entries.forEach( ( entry ) => {
					if ( entry.isIntersecting ) {
						const id = entry.target.id;
						tocLinks.forEach( ( link ) => {
							link.classList.toggle(
								'active',
								link.getAttribute( 'href' ) === `#${ id }`
							);
						} );
					}
				} );
			},
			{
				rootMargin: '0px 0px -70% 0px',
				threshold: 0.1,
			}
		);

		headings.forEach( ( h ) => observer.observe( h ) );
	}

	const ablocksToggleIcons = document.querySelectorAll(
		'.ablocks-toc__header-toggle-icon'
	);

	ablocksToggleIcons.forEach( ( icon ) => {
		icon.addEventListener( 'click', function ( e ) {
			e.preventDefault();
			e.stopPropagation();

			const parentContainer = icon.closest( '.ablocks-block' );
			const ablocksList =
				parentContainer.querySelector( '.ablocks-toc-body' );

			if ( ablocksList ) {
				if (
					ablocksList.classList.contains( 'ablocks-toc__collapse' )
				) {
					ablocksList.classList.remove( 'ablocks-toc__collapse' );
					icon.querySelector( '.ablocks-toc__show' ).style.display =
						'flex';
					icon.querySelector( '.ablocks-toc__hide' ).style.display =
						'none';
				} else {
					ablocksList.classList.add( 'ablocks-toc__collapse' );
					icon.querySelector( '.ablocks-toc__show' ).style.display =
						'none';
					icon.querySelector( '.ablocks-toc__hide' ).style.display =
						'flex';
				}
			}
		} );
	} );
} );
