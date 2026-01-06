import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import Render from './render';
import { getShippingHeadingCSS, getShippingAddressCSS } from './styling';
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

		// Create appropriate CSS generator instance based on blockVersion
		if ( attributes?.blockVersion === 2 ) {
			cssGenerator = new CSSGenerator2( attributes, clientId );
		} else {
			cssGenerator = new CSSGenerator( attributes, clientId );
		}

		if ( ! cssGenerator ) {
			return '';
		}

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-shipping-shortcode .storeengine-order-shipping-heading',
			getShippingHeadingCSS( attributes, '' ),
			getShippingHeadingCSS( attributes, 'Tablet' ),
			getShippingHeadingCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .storeengine-order-shipping-shortcode .storeengine-order-shipping-address p',
			getShippingAddressCSS( attributes, '' ),
			getShippingAddressCSS( attributes, 'Tablet' ),
			getShippingAddressCSS( attributes, 'Mobile' )
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
