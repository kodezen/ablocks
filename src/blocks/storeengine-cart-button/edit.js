import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import {
	getButtonCSS,
	getButtonHoverCSS,
	getButtonAlignmentCSS,
	getPriceStyleCSS,
	getPriceNameCSS,
	getBoxCSS,
	getRadioCSS,
	getAlignmentCSS,
	getGapCSS,
	getPriceBoxCSS,
} from './styling';
import './editor.scss';

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
			`{{WRAPPER}} .storeengine-btn--add-to-cart, 
			{{WRAPPER}} .storeengine-btn--add-to-cart-replacement, 
			{{WRAPPER}} .storeengine-btn--direct-checkout, 
			{{WRAPPER}} .storeengine-btn--view-options`,
			getButtonCSS( attributes ),
			getButtonCSS( attributes, 'Tablet' ),
			getButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-btn--add-to-cart:hover,
			{{WRAPPER}} .storeengine-btn--add-to-cart-replacement:hover,
			{{WRAPPER}} .storeengine-btn--direct-checkout:hover,
			{{WRAPPER}} .storeengine-btn--view-options:hover`,
			getButtonHoverCSS( attributes ),
			getButtonHoverCSS( attributes, 'Tablet' ),
			getButtonHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product-quantity-wrap`,
			getButtonAlignmentCSS( attributes ),
			getButtonAlignmentCSS( attributes, 'Tablet' ),
			getButtonAlignmentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-add-to-cart-shortcode .storeengine-price.amount`,
			getPriceStyleCSS( attributes ),
			getPriceStyleCSS( attributes, 'Tablet' ),
			getPriceStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product-price-name,
			{{WRAPPER}} .storeengine-loop-product-price-summery .storeengine-loop-product-price-label`,
			getPriceNameCSS( attributes ),
			getPriceNameCSS( attributes, 'Tablet' ),
			getPriceNameCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single__amount .storeengine-product__multi-prices,
			{{WRAPPER}} .storeengine-single__amount .storeengine-single-product-prices,
			{{WRAPPER}} .storeengine-single__amount .storeengine-dropdown__toggle,
			{{WRAPPER}} .storeengine-dropdown.open .storeengine-dropdown-content .storeengine-product__multi-price,
			{{WRAPPER}} .storeengine-dropdown.open .storeengine-dropdown-content .storeengine-product__multi-price label`,
			getBoxCSS( attributes ),
			getBoxCSS( attributes, 'Tablet' ),
			getBoxCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product-price-summery .storeengine-single-product-price-label input[type=radio]`,
			getRadioCSS( attributes ),
			getRadioCSS( attributes, 'Tablet' ),
			getRadioCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single__amount`,
			getAlignmentCSS( attributes ),
			getAlignmentCSS( attributes, 'Tablet' ),
			getAlignmentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-add-to-cart-shortcode`,
			getGapCSS( attributes ),
			getGapCSS( attributes, 'Tablet' ),
			getGapCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-single-product-prices .storeengine-single-product-price,
			{{WRAPPER}} .storeengine-product__multi-prices .storeengine-dropdown__toggle,
			{{WRAPPER}} .storeengine-single__amount .storeengine-product__multi-prices`,
			getPriceBoxCSS( attributes, '' ),
			getPriceBoxCSS( attributes, 'Tablet' ),
			getPriceBoxCSS( attributes, 'Mobile' )
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
