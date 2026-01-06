import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import {
	getCartListTableCSS,
	getCartListTableHeaderCSS,
	getCartListTableHeaderTextCSS,
	getCartListProductTitleCSS,
	getCartListProductSubTitleCSS,
	getCartListPoductPriceCSS,
	// getCartListTableHoverCSS,
	getCartListTablethumbImageThumbnailCSS,
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
		// const cssGenerator = new CSSGenerator(attributes, clientId);
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
			'{{WRAPPER}} .storeengine-cart-table',
			getCartListTableCSS( attributes ),
			getCartListTableCSS( attributes, 'Tablet' ),
			getCartListTableCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-table .storeengine-cart-table__head tr',
			getCartListTableHeaderCSS( attributes ),
			getCartListTableHeaderCSS( attributes, 'Tablet' ),
			getCartListTableHeaderCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-list-table-shortcode .storeengine-cart-table__head tr th',
			getCartListTableHeaderTextCSS( attributes ),
			getCartListTableHeaderTextCSS( attributes, 'Tablet' ),
			getCartListTableHeaderTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-product .storeengine-cart-product__content .storeengine-cart-product-title a',
			getCartListProductTitleCSS( attributes ),
			getCartListProductTitleCSS( attributes, 'Tablet' ),
			getCartListProductTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-product__content .storeengine-cart-product-price',
			getCartListProductSubTitleCSS( attributes ),
			getCartListProductSubTitleCSS( attributes, 'Tablet' ),
			getCartListProductSubTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-list-table-shortcode .storeengine-cart-table__body-td .storeengine-price bdi',
			getCartListPoductPriceCSS( attributes ),
			getCartListPoductPriceCSS( attributes, 'Tablet' ),
			getCartListPoductPriceCSS( attributes, 'Mobile' )
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
