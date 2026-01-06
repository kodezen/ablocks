import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import {
	getCartSubWrapperCSS,
	getCartSubCSS,
	getCartSubTableRowCSS,
	getCartSubTableRowLastCSS,
	getCartSubTableRowTextCSS,
	getCartSubTableRowLastTextCSS,
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
				cssGenerator = new CSSGenerator2( attributes, clientId );
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
			'{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode table',
			getCartSubWrapperCSS( attributes ),
			getCartSubWrapperCSS( attributes, 'Tablet' ),
			getCartSubWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode ',
			getCartSubCSS( attributes ),
			getCartSubCSS( attributes, 'Tablet' ),
			getCartSubCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode .storeengine-cart-sub-total-table tr:first-child ',
			getCartSubTableRowCSS( attributes ),
			getCartSubTableRowCSS( attributes, 'Tablet' ),
			getCartSubTableRowCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode .storeengine-cart-sub-total-table tr:first-child td,
			{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode .storeengine-cart-sub-total-table tr:first-child th`,
			getCartSubTableRowTextCSS( attributes ),
			getCartSubTableRowTextCSS( attributes, 'Tablet' ),
			getCartSubTableRowTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode .storeengine-cart-sub-total-table tr',
			getCartSubTableRowLastCSS( attributes ),
			getCartSubTableRowLastCSS( attributes, 'Tablet' ),
			getCartSubTableRowLastCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode .storeengine-cart-sub-total-table tr td,
			{{WRAPPER}} .storeengine-cart-sub-total-table-shortcode .storeengine-cart-sub-total-table tr th`,
			getCartSubTableRowLastTextCSS( attributes ),
			getCartSubTableRowLastTextCSS( attributes, 'Tablet' ),
			getCartSubTableRowLastTextCSS( attributes, 'Mobile' )
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
