import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save';
import { InnerBlocks } from '@wordpress/block-editor';
import FilterLists from '../Components/filterLists';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		filterList,
		enableFilter,
		itemShows,
		filterableCardsNumbers,
		loadMoreButtonText,
		loadMoreButton,
		dataPerPageShow,
		noMoreItemsText,
		animation,
		layout,
		searchPlaceHolder,
		searchNotFoundText,
		animationDuration,
	} = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					itemShows,
					'data-animation': animation,
					'data-layout': layout,
					'data-duration': animationDuration,
					'data-enableFilter': enableFilter,
				} }
			>
				{ enableFilter && (
					<>
						<FilterLists
							filterLists={ filterList }
							layout={ layout }
							placeHolder={ searchPlaceHolder }
						/>
						<span className="filterable-search-item-not-found-text">
							{ searchNotFoundText }
						</span>
					</>
				) }
				<div className="filterable-cards-wrap">
					<InnerBlocks.Content />
				</div>
				{ loadMoreButton && itemShows < filterableCardsNumbers && (
					<div className="filterable-cards-load-more-wrapper">
						<span
							data-filterable-cards-numbers={
								filterableCardsNumbers
							}
							data-per-page={ dataPerPageShow }
							data-no-item-text={ noMoreItemsText }
							data-more-button-text={ loadMoreButtonText }
							className="filterable-cards-showMore-button"
						>
							{ loadMoreButtonText }
						</span>
					</div>
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
