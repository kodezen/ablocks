import { makeRequest } from '@Utils/helper';

class LoopBuilder {
	constructor( element, options = {} ) {
		if ( element.dataset.initialized === 'true' ) {
			return;
		}

		this.element = element;
		this.filterButtons = element.querySelectorAll(
			'.ablocks-loop-term-filter'
		);
		this.loadMoreButton = element.querySelector(
			'.ablocks-loop-load-more__text'
		);

		this.noMoreText =
			this.loadMoreButton?.dataset?.noItemText || 'No more items.';
		this.loadMoreText =
			this.loadMoreButton?.dataset?.moreButtonText || 'Show More';

		const activeFilter = element.querySelector(
			'.ablocks-loop-term-filter--active'
		);
		this.loadMorePostId =
			parseInt( this.loadMoreButton?.dataset?.postId ) ||
			parseInt( activeFilter?.dataset?.postId ) ||
			window.ablocks_current_post_id ||
			0;

		this.termId = options.termId || null;
		this.taxonomy = options.taxonomy || null;
		this.currentPage = options.currentPage || 1;
		this.isLoading = false;
		this.lastTermId = null;
		// added archive
		this.is_archive =
			this.loadMoreButton?.dataset?.isArchive === 'true' || false;
		this.archive_post_type =
			this.loadMoreButton?.dataset?.archivePostType || null;

		this.blockId = this.getBlockId( element );
		this.attachEvents();
		element.dataset.initialized = 'true';
	}

	getBlockId( element ) {
		return (
			[ ...element.classList ]
				.find(
					( c ) => c.startsWith( 'ablocks-block-' ) && c.length > 20
				)
				?.replace( 'ablocks-block-', '' ) || null
		);
	}

	attachEvents() {
		this.filterButtons.forEach( ( btn ) => {
			btn.removeEventListener( 'click', this.handleFilterClick );
			btn.addEventListener( 'click', this.handleFilterClick );
		} );

		if ( this.loadMoreButton ) {
			this.loadMoreButton.removeEventListener(
				'click',
				this.handleLoadMoreClick
			);
			this.loadMoreButton.addEventListener(
				'click',
				this.handleLoadMoreClick
			);
		}
	}

	handleFilterClick = async ( e ) => {
		if ( this.isLoading ) {
			return;
		}

		const clicked = e.currentTarget;
		const originalText = clicked.innerText;
		const s = getComputedStyle( clicked );
		clicked.style.width =
			clicked.offsetWidth -
			parseFloat( s.paddingLeft ) -
			parseFloat( s.paddingRight ) -
			parseFloat( s.borderLeftWidth ) -
			parseFloat( s.borderRightWidth ) +
			'px';

		clicked.style.height =
			clicked.offsetHeight -
			parseFloat( s.paddingTop ) -
			parseFloat( s.paddingBottom ) +
			'px';
		clicked.innerHTML =
			'<span class="ablocks-loop-loading-spinner"></span>';
		this.filterButtons.forEach( ( btn ) =>
			btn.classList.remove( 'ablocks-loop-term-filter--active' )
		);
		clicked.classList.add( 'ablocks-loop-term-filter--active' );

		this.taxonomy = clicked.dataset.taxonomy || null;
		this.termId = parseInt( clicked.dataset.termId );
		this.loadMorePostId =
			parseInt( clicked.dataset.postId ) ||
			window.ablocks_current_post_id;
		window.ablocks_current_post_id = this.loadMorePostId;
		this.currentPage = 1;
		// added archive
		window.ablocks_is_archive =
			clicked.dataset.isArchive === 'true' || window.ablocks_is_archive;
		window.ablocks_archive_post_type =
			clicked.dataset.archivePostType || window.ablocks_archive_post_type;

		const beforeItemsCount =
			this.lastTermId === this.termId
				? document.querySelectorAll(
						`.ablocks-block-${ this.blockId } .ablocks-loop-template-item`
				  ).length
				: 0;

		this.lastTermId = this.termId;

		try {
			await this.fetchContent( beforeItemsCount );
		} finally {
			clicked.innerText = originalText;
		}
	};

	loadingState() {
		if ( this.loadMoreButton ) {
			this.loadMoreButton.innerText = 'Loading...';
			this.loadMoreButton.style.pointerEvents = 'none';
			this.loadMoreButton.style.opacity = '0.6';
		}
	}

	resetLoadingState() {
		if ( this.loadMoreButton ) {
			this.loadMoreButton.innerText = this.loadMoreText;
			this.loadMoreButton.style.pointerEvents = 'auto';
			this.loadMoreButton.style.opacity = '1';
		}
		this.isLoading = false;
	}

	handleLoadMoreClick = () => {
		if ( this.isLoading ) {
			return;
		}

		this.isLoading = true;
		this.loadingState();

		const active = this.element.querySelector(
			'.ablocks-loop-term-filter--active'
		);
		if ( active ) {
			this.termId = parseInt( active.dataset.termId ) || null;
			this.taxonomy = active.dataset.taxonomy || null;
			const postId = parseInt( active.dataset.postId );
			if ( postId ) {
				this.loadMorePostId = postId;
				window.ablocks_current_post_id = postId;
			}
		}
		// Load More term id
		if ( ! this.termId ) {
			if (
				window.ablocks_current_term_id !==
				this.loadMoreButton?.dataset?.termId
			) {
				window.ablocks_current_term_id =
					this.loadMoreButton?.dataset?.termId;
			}
			this.termId =
				this.loadMoreButton?.dataset?.termId ||
				window.ablocks_current_term_id;
		}

		window.ablocks_current_post_id =
			this.loadMorePostId || window.ablocks_current_post_id;
		this.currentPage++;
		// added archive
		window.ablocks_is_archive =
			this.loadMoreButton?.dataset?.isArchive === 'true' ||
			window.ablocks_is_archive;
		window.ablocks_archive_post_type =
			this.loadMoreButton?.dataset?.archivePostType ||
			window.ablocks_archive_post_type;
		const beforeItems = document.querySelectorAll(
			`.ablocks-block-${ this.blockId } .ablocks-loop-template-item`
		).length;
		this.fetchContent( beforeItems );
	};

	async fetchContent( beforeItems = 0 ) {
		const payload = {
			action: 'ablocks/loop_builder',
			loop_builder_block_id: this.blockId,
			loop_template_block_id: this.getBlockId(
				this.element.parentElement?.querySelector(
					'.ablocks-block--loop-template'
				)
			),
			taxonomy: this.taxonomy,
			term_id: this.termId,
			post_id: window.ablocks_current_post_id,
			page: this.currentPage,
			// added archive
			is_archive: window.ablocks_is_archive,
			archive_post_type: window.ablocks_archive_post_type,
		};

		try {
			const res = await makeRequest( payload );
			const html = res?.data?.data?.html;

			if ( html ) {
				const tempDiv = document.createElement( 'div' );
				tempDiv.innerHTML = html;

				this.element.replaceWith( ...tempDiv.childNodes );

				const newLoopBuilder = document.querySelector(
					`.ablocks-block-${ this.blockId }.ablocks-block--loop-builder`
				);
				if ( newLoopBuilder ) {
					const afterItems = document.querySelectorAll(
						`.ablocks-block-${ this.blockId } .ablocks-loop-template-item`
					).length;
					const newLoadMoreText = newLoopBuilder.querySelector(
						'.ablocks-loop-load-more__text'
					);

					if ( newLoadMoreText && window.ablocks_current_post_id ) {
						newLoadMoreText.dataset.postId =
							window.ablocks_current_post_id;
						newLoadMoreText.innerText =
							afterItems <= beforeItems
								? this.noMoreText
								: this.loadMoreText;
					}

					new LoopBuilder( newLoopBuilder, {
						currentPage: this.currentPage,
						termId: this.termId,
						taxonomy: this.taxonomy,
						// added archive
						is_archive: this.is_archive,
						archive_post_type: this.archive_post_type,
					} );
				}
			}
		} catch ( err ) {
			console.error( 'LoopBuilder error:', err );
		} finally {
			this.resetLoadingState();
		}
	}
}

export default LoopBuilder;
