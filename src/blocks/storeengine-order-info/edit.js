import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import { getStatusTitleCSS, getDetilsTitleCSS, getEmailCSS } from './styling';
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
			'{{WRAPPER}} .storeengine-thankyou-order-info-shortcode .storeengine-thankyou-order-info-success__content h4',
			getStatusTitleCSS( attributes ),
			getStatusTitleCSS( attributes, 'Tablet' ),
			getStatusTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-thankyou-order-info-shortcode .storeengine-thankyou-order-info-success__content p span,
			 {{WRAPPER}} .storeengine-thankyou-order-info-shortcode .storeengine-thankyou-order-info-success__content p time`,
			getDetilsTitleCSS( attributes ),
			getDetilsTitleCSS( attributes, 'Tablet' ),
			getDetilsTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-thankyou-order-info-shortcode .storeengine-thankyou-order-info-success .storeengine-thankyou-order-info-success__email p span,
			{{WRAPPER}} .storeengine-thankyou-order-info-shortcode .storeengine-thankyou-order-info-success .storeengine-thankyou-order-info-success__email p a`,
			getEmailCSS( attributes, '' ),
			getEmailCSS( attributes, 'Tablet' ),
			getEmailCSS( attributes, 'Mobile' )
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
