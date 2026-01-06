import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';

import {
	getWrapperCSS,
	getPostTitleCSS,
	getPostTitleCountCSS,
	getTaxonomyTitleCSS,
	getPostHoverTitleCSS,
	getButtonCSS,
	getButtonHoverCSS,
	getCardCSS,
	getCardHoverCSS,
	getCardPaddingCSS,
	getPostActiveTitleCSS,
	getPostTitleHoverCountCSS,
	getTaxonomyHoverTitleCSS,
	getGridStyles,
	getIconCSS,
	getIconSvgCSS,
	getIconSvgPathCSS,
} from './styling';

import {
	getWrapperCSS as getIconWrapperCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
	getElementImageHoverCSS,
} from '@Controls/icon-upload/helper';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;

	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( { block_id: clientId } );
		}
	}, [ block_id, clientId ] );

	const generatedCSS = useMemo( () => {
		const css = new CSSGenerator( attributes, clientId );

		// Wrapper
		css.addClassStyles(
			'{{WRAPPER}}',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		// ICON CSS generate

		css.addClassStyles(
			'{{WRAPPER}}.ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);

		css.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap img.ablocks-image-icon',
			getIconElementImageCSS( attributes ),
			getIconElementImageCSS( attributes, 'Tablet' ),
			getIconElementImageCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap img.ablocks-image-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconElementCSS( attributes ),
			getIconElementCSS( attributes, 'Tablet' ),
			getIconElementCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);

		// Cart Cart Style
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-listing-item',
			getCardCSS( attributes ),
			getCardCSS( attributes, 'Tablet' ),
			getCardCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-listing-item:hover',
			getCardHoverCSS( attributes ),
			getCardHoverCSS( attributes, 'Tablet' ),
			getCardHoverCSS( attributes, 'Mobile' )
		);
		// // Taxonomy Cart Button Style
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-listing-item_content ',
			getCardPaddingCSS( attributes ),
			getCardPaddingCSS( attributes, 'Tablet' ),
			getCardPaddingCSS( attributes, 'Mobile' )
		);

		// Taxonomy title
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-title',
			getTaxonomyTitleCSS( attributes ),
			getTaxonomyTitleCSS( attributes, 'Tablet' ),
			getTaxonomyTitleCSS( attributes, 'Mobile' )
		);
		// Taxonomy title
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-title:hover',
			getTaxonomyHoverTitleCSS( attributes ),
			getTaxonomyHoverTitleCSS( attributes, 'Tablet' ),
			getTaxonomyHoverTitleCSS( attributes, 'Mobile' )
		);
		// Post title
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-posts a',
			getPostTitleCSS( attributes ),
			getPostTitleCSS( attributes, 'Tablet' ),
			getPostTitleCSS( attributes, 'Mobile' )
		);
		// Post title Hover
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-posts a:hover',
			getPostHoverTitleCSS( attributes ),
			getPostHoverTitleCSS( attributes, 'Tablet' ),
			getPostHoverTitleCSS( attributes, 'Mobile' )
		);
		// Post title Active
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-posts a.active-post-link',
			getPostActiveTitleCSS( attributes ),
			getPostActiveTitleCSS( attributes, 'Tablet' ),
			getPostActiveTitleCSS( attributes, 'Mobile' )
		);
		// Post Title Count
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-title__post-count',
			getPostTitleCountCSS( attributes ),
			getPostTitleCountCSS( attributes, 'Tablet' ),
			getPostTitleCountCSS( attributes, 'Mobile' )
		);
		// Post Title Hover Count
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-title__post-count:hover',
			getPostTitleHoverCountCSS( attributes ),
			getPostTitleHoverCountCSS( attributes, 'Tablet' ),
			getPostTitleHoverCountCSS( attributes, 'Mobile' )
		);
		// Button
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-reload-button',
			getButtonCSS( attributes ),
			getButtonCSS( attributes, 'Tablet' ),
			getButtonCSS( attributes, 'Mobile' )
		);
		// Button Hover
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-reload-button:hover',
			getButtonHoverCSS( attributes ),
			getButtonHoverCSS( attributes, 'Tablet' ),
			getButtonHoverCSS( attributes, 'Mobile' )
		);
		// Wrapper Grid CSS
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-listing-container.flex',
			getGridStyles( attributes ),
			getGridStyles( attributes, 'Tablet' ),
			getGridStyles( attributes, 'Mobile' )
		);
		// Icon CSS
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-icon',
			getIconCSS( attributes ),
			getIconCSS( attributes, 'Tablet' ),
			getIconCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-icon svg',
			getIconSvgCSS( attributes ),
			getIconSvgCSS( attributes, 'Tablet' ),
			getIconSvgCSS( attributes, 'Mobile' )
		);
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-taxonomy-icon svg path',
			getIconSvgPathCSS( attributes ),
			getIconSvgPathCSS( attributes, 'Tablet' ),
			getIconSvgPathCSS( attributes, 'Mobile' )
		);

		return applyFilters(
			'ablocks.taxonomyListing.inlineCSS',
			css.generateCSS(),
			attributes
		);
	}, [ attributes ] );

	return (
		<>
			{ isSelected && <Settings { ...props } /> }
			<style>{ generatedCSS }</style>
			<Render { ...props } />
		</>
	);
}
