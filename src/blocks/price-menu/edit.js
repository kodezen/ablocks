import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	get_all_menu_css,
	get_gap_around_css,
	get_details_brief_css,
	get_item_css,
	get_item_hover_css,
	get_inner_item_css,
	get_title_text_css,
	get_price_text_css,
	get_description_text_css,
	get_divider_css,
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
		// Save Version
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
			'{{WRAPPER}} .block-editor-block-list__layout',
			get_all_menu_css( attributes ),
			get_all_menu_css( attributes, 'Tablet' ),
			get_all_menu_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-price-menu-item, {{WRAPPER}} .ablocks-price-menu-item-details',
			get_gap_around_css( attributes ),
			get_gap_around_css( attributes, 'Tablet' ),
			get_gap_around_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-price-menu-item-details-brief',
			get_details_brief_css( attributes ),
			get_details_brief_css( attributes, 'Tablet' ),
			get_details_brief_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--price-menu-item',
			get_item_css( attributes ),
			get_item_css( attributes, 'Tablet' ),
			get_item_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--price-menu-item:hover',
			get_item_hover_css( attributes ),
			get_item_hover_css( attributes, 'Tablet' ),
			get_item_hover_css( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-price-menu-item',
			get_inner_item_css( attributes ),
			get_inner_item_css( attributes, 'Tablet' ),
			get_inner_item_css( attributes, 'Mobile' )
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
