import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	get_price_text_css,
	get_title_text_css,
	get_description_text_css,
	get_divider_css,
} from './styling';
import {
	getWrapperCSS as getIconWrapperCSS,
	getWrapperHoverCSS as getIconWrapperHoverCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
	getElementImageHoverCSS,
} from '@Controls/icon-upload/helper';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
	}, [ block_id, clientId ] );
	// Generate CSS
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );

		// Icon Style
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap:hover',
			getIconWrapperHoverCSS( attributes ),
			getIconWrapperHoverCSS( attributes, 'Tablet' ),
			getIconWrapperHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap img.ablocks-image-icon',
			getIconElementImageCSS( attributes ),
			getIconElementImageCSS( attributes, 'Tablet' ),
			getIconElementImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap img.ablocks-image-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconElementCSS( attributes ),
			getIconElementCSS( attributes, 'Tablet' ),
			getIconElementCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-price-menu-item-details-title',
			get_title_text_css( attributes ),
			get_title_text_css( attributes, 'Tablet' ),
			get_title_text_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-price-menu-item-details-des',
			get_description_text_css( attributes ),
			get_description_text_css( attributes, 'Tablet' ),
			get_description_text_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .ablocks-price-menu-divider__pattern-${
				attributes.dividerType === 'mask-style' ? 'mask' : 'css'
			}`,
			get_divider_css( attributes ),
			get_divider_css( attributes, 'Tablet' ),
			get_divider_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-price-menu-item-price',
			get_price_text_css( attributes ),
			get_price_text_css( attributes, 'Tablet' ),
			get_price_text_css( attributes, 'Mobile' )
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
