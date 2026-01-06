import React, { useEffect } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import './style.css';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { getRenderDomElement } from '@Utils/helper';
import FilterableCards from './filterable';
import { select } from '@wordpress/data';
import FilterLists from './Components/filterLists';
import { useDynamicData } from '@Utils/hooks/use-dynamic-data';
const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes, clientId, setAttributes } = props;
	const {
		block_id,
		filterList,
		enableFilter,
		filterableCardsNumbers,
		itemShows,
		loadMoreButton,
		loadMoreButtonText,
		dataPerPageShow,
		noMoreItemsText,
		animation,
		layout,
		searchPlaceHolder,
		searchNotFoundText,
		animationDuration,
	} = attributes;
	const { isDynamicEnabled, data: dynamicLoadMoreButtonText } =
		useDynamicData( {
			attributeValue: loadMoreButtonText,
		} );
	const {
		isDynamicEnabled: isDynamicEnabledNoMoreItemsText,
		data: dynamicNoMoreItemsText,
	} = useDynamicData( {
		attributeValue: noMoreItemsText,
	} );
	const {
		isDynamicEnabled: isDynamicSearchNotFoundText,
		data: dynamicSearchNotFoundText,
	} = useDynamicData( {
		attributeValue: searchNotFoundText,
	} );

	const {
		isDynamicEnabled: isDynamicEnabledSearchPlaceHolder,
		data: dynamicSearchPlaceHolder,
	} = useDynamicData( {
		attributeValue: searchPlaceHolder,
	} );

	const innerBlocksTemplate = [
		[
			'ablocks/filterable-cards-item',
			{
				dataCategory: 'Item 01',
			},
			[
				[
					'ablocks/info-box',
					{
						stack: 'column',
						heading: 'Latest Gadgets',
						allowButton: false,
						des: 'Showcase the latest gadgets with style and precision! Customize visuals and text for an engaging, attention-grabbing display!',
					},
				],
			],
		],
		[
			'ablocks/filterable-cards-item',
			{},
			[
				[
					'ablocks/info-box',
					{
						stack: 'column',
						heading: 'Creative Designs',
						allowButton: false,
						des: 'Showcase creative designs with style and precision! Customize visuals and text for an engaging, attention-grabbing display!',
					},
				],
			],
		],
		[
			'ablocks/filterable-cards-item',
			{
				dataCategory: 'Item 01',
			},
			[
				[
					'ablocks/info-box',
					{
						stack: 'column',
						heading: 'Healthy Recipes',
						allowButton: false,
						des: 'Showcase top destinations with style and precision! Customize visuals and text for an engaging, attention-grabbing display!',
					},
				],
			],
		],
	];

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: innerBlocksTemplate,
			renderAppender: false,
		}
	);
	const handleAddItem = () => {
		const { insertBlock } = wp.data.dispatch( 'core/block-editor' );
		const newBlock = wp.blocks.createBlock(
			'ablocks/filterable-cards-item',
			{}
		);
		insertBlock( newBlock, undefined, clientId );
	};
	const totalInnerBlocks =
		select( 'core/block-editor' ).getBlock( clientId )?.innerBlocks
			.length || 0;
	setAttributes( { filterableCardsNumbers: totalInnerBlocks } );
	useEffect( () => {
		new FilterableCards(
			getRenderDomElement(
				`.ablocks-block-${ block_id }.ablocks-block--filterable-cards`
			)
		);
	}, [
		block_id,
		filterList,
		enableFilter,
		filterableCardsNumbers,
		itemShows,
		loadMoreButton,
		loadMoreButtonText,
		dataPerPageShow,
		noMoreItemsText,
		animation,
		layout,
		animationDuration,
	] );
	return (
		<React.Fragment>
			<RenderContainer
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
							placeHolder={
								isDynamicEnabledSearchPlaceHolder
									? dynamicSearchPlaceHolder
									: searchPlaceHolder
							}
						/>
						<span className="filterable-search-item-not-found-text">
							{ isDynamicSearchNotFoundText
								? dynamicSearchNotFoundText
								: searchNotFoundText }
						</span>
					</>
				) }

				<div
					{ ...innerBlocksProps }
					className="filterable-cards-wrap"
				/>

				{ loadMoreButton && (
					<div className="filterable-cards-load-more-wrapper">
						<span
							data-filterable-cards-numbers={
								filterableCardsNumbers
							}
							data-per-page={ dataPerPageShow }
							data-no-item-text={
								isDynamicEnabledNoMoreItemsText
									? dynamicNoMoreItemsText
									: noMoreItemsText
							}
							data-more-button-text={
								isDynamicEnabled
									? dynamicLoadMoreButtonText
									: loadMoreButtonText
							}
							className="filterable-cards-showMore-button"
						>
							{ isDynamicEnabled
								? dynamicLoadMoreButtonText
								: loadMoreButtonText }
						</span>
					</div>
				) }
				<button
					className="ablocks-filtrable-card-add-button"
					onClick={ handleAddItem }
				>
					<span className="ablocks-icon ablocks-icon--plus"></span>
					Add Item
				</button>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
