import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import {
	getCheckoutFormCSS,
	getCheckoutFormLabelCSS,
	getCheckoutFormInputCSS,
	getCheckoutFormSelectCSS,
	getCheckoutFormButtonCSS,
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
			`{{WRAPPER}} .storeengine-ajax-checkout-form__contact-information .storeengine-checkout-form-section-heading,
			{{WRAPPER}} .storeengine-ajax-checkout-form__billing-address .storeengine-checkout-form-section-heading`,
			getCheckoutFormCSS( attributes ),
			getCheckoutFormCSS( attributes, 'Tablet' ),
			getCheckoutFormCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-form-group .storeengine-form__inner label,
			{{WRAPPER}} .storeengine-ajax-checkout-form__contact-information .storeengine-form-field  .storeengine-form-field__inner label`,
			getCheckoutFormLabelCSS( attributes ),
			getCheckoutFormLabelCSS( attributes, 'Tablet' ),
			getCheckoutFormLabelCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-form-group .storeengine-form__inner input,
			{{WRAPPER}} .storeengine-ajax-checkout-form input`,
			getCheckoutFormInputCSS( attributes ),
			getCheckoutFormInputCSS( attributes, 'Tablet' ),
			getCheckoutFormInputCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-form-group .storeengine-form__inner select`,
			getCheckoutFormSelectCSS( attributes ),
			getCheckoutFormSelectCSS( attributes, 'Tablet' ),
			getCheckoutFormSelectCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-ajax-checkout-form .storeengine-checkout__order-btn button`,
			getCheckoutFormButtonCSS( attributes ),
			getCheckoutFormButtonCSS( attributes, 'Tablet' ),
			getCheckoutFormButtonCSS( attributes, 'Mobile' )
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
