import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import Render from './render';
import {
	getLoginFormButtonCss,
	getFormTitleCss,
	inputFieldLabelCss,
	getFormCardCss,
	getFormCardHoverCss,
	getLoginButtonHoverCss,
	getFormFooterTitleCss,
	getInputFieldCss,
	inputFieldLabelHoverCss,
	getInputFieldPlaceholderCss,
	formTitleHoverCss,
} from './styling';

import './editor.scss';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id, input_field_label_color } = attributes;

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
			'{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group button',
			getLoginFormButtonCss( attributes ),
			getLoginFormButtonCss( attributes, 'Tablet' ),
			getLoginFormButtonCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group button:hover',
			getLoginButtonHoverCss( attributes ),
			getLoginButtonHoverCss( attributes, 'Tablet' ),
			getLoginButtonHoverCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper .academy-login-form-info,
			{{WRAPPER}} .academy-login-form-wrapper .academy-login-form-info a`,
			getFormFooterTitleCss( attributes ),
			getFormFooterTitleCss( attributes, 'Tablet' ),
			getFormFooterTitleCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper .academy-login-form-heading `,
			getFormTitleCss( attributes ),
			getFormTitleCss( attributes, 'Tablet' ),
			getFormTitleCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper .academy-login-form-heading:hover`,
			formTitleHoverCss( attributes )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group label, 
			{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group .academy-form-group__forgetmenot label, 
			{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group .academy-form-group__inner a`,
			inputFieldLabelCss( attributes ),
			inputFieldLabelCss( attributes, 'Tablet' ),
			inputFieldLabelCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group label:hover, 
			{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group .academy-form-group__forgetmenot label:hover, 
			{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group .academy-form-group__inner a:hover`,
			inputFieldLabelHoverCss( attributes ),
			inputFieldLabelHoverCss( attributes, 'Tablet' ),
			inputFieldLabelHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper`,
			getFormCardCss( attributes ),
			getFormCardCss( attributes, 'Tablet' ),
			getFormCardCss( attributes, 'Tablet' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group input`,
			getInputFieldCss( attributes ),
			getInputFieldCss( attributes, 'Tablet' ),
			getInputFieldCss( attributes, 'Tablet' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper .academy-login-form .academy-form-group input::placeholder`,
			getInputFieldPlaceholderCss( attributes ),
			getInputFieldPlaceholderCss( attributes, 'Tablet' ),
			getInputFieldPlaceholderCss( attributes, 'Tablet' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-login-form-wrapper:hover`,
			getFormCardHoverCss( attributes ),
			getFormCardHoverCss( attributes, 'Tablet' ),
			getFormCardHoverCss( attributes, 'Tablet' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.academy-login-form.editorInlineCSS`,
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
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
