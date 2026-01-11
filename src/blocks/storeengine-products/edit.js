import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import {
	getProductsCSS,
	getProductsHoverCSS,
	getProductsCardTitleCSS,
	getProdutsPriceCSS,
	getProductsCartButtonCSS,
	getProductsCartButtonHoverCSS,
	// getButtonLayoutCSS,
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

	const [ storeEngineTerms, setstoreEngineTerms ] = useState( {} );

	useEffect( () => {
		if ( storeEngineTerms?.categories && storeEngineTerms?.tags ) {
			return false;
		}
		jQuery.post(
			window.ajaxurl,
			{
				action: 'ablocks/get_storeengine_terms',
				security: window.ABlocksGlobal.ablocks_nonce,
			},
			( data, status ) => {
				if ( 'success' === status ) {
					const { categories = [], tags = [] } = data?.data || {};
					const terms = {
						categories,
						tags,
					};
					setstoreEngineTerms( terms );
				}
			}
		);
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

	// Generate CSS
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );

		//added card css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-products--grid .storeengine-row .storeengine-product',
			getProductsCSS( attributes ),
			getProductsCSS( attributes, 'Tablet' ),
			getProductsCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-products--grid .storeengine-row .storeengine-product:hover',
			getProductsHoverCSS( attributes ),
			getProductsHoverCSS( attributes, 'Tablet' ),
			getProductsHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-products--grid .storeengine-row .storeengine-product .storeengine-product__body .storeengine-product__title,
			{{WRAPPER}} .storeengine-products--grid .storeengine-row .storeengine-product .storeengine-product__body .storeengine-product__title a `,
			getProductsCardTitleCSS( attributes ),
			getProductsCardTitleCSS( attributes, 'Tablet' ),
			getProductsCardTitleCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-product ins .storeengine-price',
			getProdutsPriceCSS( attributes ),
			getProdutsPriceCSS( attributes, 'Tablet' ),
			getProdutsPriceCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-add-to-cart-buttons .storeengine-btn`,
			getProductsCartButtonCSS( attributes ),
			getProductsCartButtonCSS( attributes, 'Tablet' ),
			getProductsCartButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-add-to-cart-buttons .storeengine-btn:hover`,
			getProductsCartButtonHoverCSS( attributes ),
			getProductsCartButtonHoverCSS( attributes, 'Tablet' ),
			getProductsCartButtonHoverCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.storeengine-products.editorInlineCSS`,
			null,
			attributes,
			cssGenerator
		);
		if ( editorInlineCSSExtend ) {
			return editorInlineCSSExtend;
		}

		return cssGenerator.generateCSS();
	}, [ attributes ] );

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && (
				<Settings storeEngineTerms={ storeEngineTerms } { ...props } />
			) }
			<Render { ...props } />
		</>
	);
}
