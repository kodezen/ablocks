import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getFilterCSS,
	getFilterHoverCSS,
	getFilterWrapCSS,
	filterableCardsWrapCSS,
	filterableItemCards,
	getFilterActiveClassCSS,
	filterableLoadMoreButton,
	filterableLoadMoreButtonHover,
	filterableCardMoreWrapper,
	searchMenuCSS,
	searchMenuHoverCSS,
	searchInputPlaceholderCSS,
	getFilterActiveClassHoverCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );
	// Generate CSS
	const generatedCSS = useMemo( () => {
		let cssGenerator = null;
		if ( cssGenerator ) {
			if (
				attributes?.blockVersion === 2 &&
				! ( cssGenerator instanceof CSSGenerator2 )
			) {
				cssGenerator = new CSSGenerator2( attributes, clientId ); // Create new instance of v2 if needed
			} else if (
				attributes?.blockVersion !== 2 &&
				! ( cssGenerator instanceof CSSGenerator )
			) {
				cssGenerator = new CSSGenerator( attributes, clientId ); // Create new instance of v1 if needed
			}
		} else {
			// No instance, so create the correct one based on version
			if ( attributes?.blockVersion === 2 ) {
				cssGenerator = new CSSGenerator2( attributes, clientId );
			} else {
				cssGenerator = new CSSGenerator( attributes, clientId );
			}
		}

		if ( cssGenerator === null ) {
			return '';
		}
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards_filter , {{WRAPPER}} .filterable-cards-filter-wrap',
			getFilterWrapCSS( attributes ),
			getFilterWrapCSS( attributes, 'Tablet' ),
			getFilterWrapCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards_filter .filterable-filter-button',
			getFilterCSS( attributes ),
			getFilterCSS( attributes, 'Tablet' ),
			getFilterCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards_filter .filterable-filter-button:hover',
			getFilterHoverCSS( attributes ),
			getFilterHoverCSS( attributes, 'Tablet' ),
			getFilterHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards_filter .filterable-search-toggle-btn ,{{WRAPPER}} .filterable-cards-filter-wrap .filterable-searchInput',
			searchMenuCSS( attributes ),
			searchMenuCSS( attributes, 'Tablet' ),
			searchMenuCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards_filter .filterable-search-toggle-btn:hover , {{WRAPPER}} .filterable-cards-filter-wrap .filterable-searchInput',
			searchMenuHoverCSS( attributes ),
			searchMenuHoverCSS( attributes, 'Tablet' ),
			searchMenuHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards-filter-wrap .filterable-searchInput::placeholder ',
			searchInputPlaceholderCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards_filter .filterable-filter-button.filterable-filter-button-active',
			getFilterActiveClassCSS( attributes ),
			getFilterActiveClassCSS( attributes, 'Tablet' ),
			getFilterActiveClassCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards_filter .filterable-filter-button.filterable-filter-button-active:hover',
			getFilterActiveClassHoverCSS( attributes ),
			getFilterActiveClassHoverCSS( attributes, 'Tablet' ),
			getFilterActiveClassHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards-wrap',
			filterableCardsWrapCSS( attributes ),
			filterableCardsWrapCSS( attributes, 'Tablet' ),
			filterableCardsWrapCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards-wrap > .ablocks-block--filterable-cards-item',
			filterableItemCards( attributes ),
			filterableItemCards( attributes, 'Tablet' ),
			filterableItemCards( attributes, 'Mobile' )
		);
		//button style
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards-load-more-wrapper',
			filterableCardMoreWrapper( attributes ),
			filterableCardMoreWrapper( attributes, 'Tablet' ),
			filterableCardMoreWrapper( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards-showMore-button',
			filterableLoadMoreButton( attributes ),
			filterableLoadMoreButton( attributes, 'Tablet' ),
			filterableLoadMoreButton( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .filterable-cards-showMore-button:hover',
			filterableLoadMoreButtonHover( attributes ),
			filterableLoadMoreButtonHover( attributes, 'Tablet' ),
			filterableLoadMoreButtonHover( attributes, 'Mobile' )
		);

		return cssGenerator.generateCSS();
	}, [ attributes ] );

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
