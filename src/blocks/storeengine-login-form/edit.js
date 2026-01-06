import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
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
	formTitleDesktopHoverCss,
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
		const cssGenerator = new CSSGenerator( attributes, clientId );
		cssGenerator.addClassStyles(
			'{{WRAPPER}} storeengine-login-form-wrapper .storeengine-form-group button',
			getLoginFormButtonCss( attributes ),
			getLoginFormButtonCss( attributes, 'Tablet' ),
			getLoginFormButtonCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} storeengine-login-form-wrapper .storeengine-form-group button:hover',
			getLoginButtonHoverCss( attributes ),
			getLoginButtonHoverCss( attributes, 'Tablet' ),
			getLoginButtonHoverCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-wrapper .storeengine-login-form-info p,
			{{WRAPPER}} .storeengine-login-form-wrapper .storeengine-login-form-info p a`,
			getFormFooterTitleCss( attributes ),
			getFormFooterTitleCss( attributes, 'Tablet' ),
			getFormFooterTitleCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-heading`,
			getFormTitleCss( attributes ),
			getFormTitleCss( attributes, 'Tablet' ),
			getFormTitleCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-heading:hover`,
			formTitleDesktopHoverCss( attributes )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-wrapper .storeengine-login-form .storeengine-form-group label`,
			inputFieldLabelCss( attributes ),
			inputFieldLabelCss( attributes, 'Tablet' ),
			inputFieldLabelCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-wrapper .storeengine-login-form .storeengine-form-group label:hover `,
			inputFieldLabelHoverCss( attributes ),
			inputFieldLabelHoverCss( attributes, 'Tablet' ),
			inputFieldLabelHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-wrapper`,
			getFormCardCss( attributes ),
			getFormCardCss( attributes, 'Tablet' ),
			getFormCardCss( attributes, 'Tablet' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-wrapper:hover`,
			getFormCardHoverCss( attributes ),
			getFormCardHoverCss( attributes, 'Tablet' ),
			getFormCardHoverCss( attributes, 'Tablet' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-wrapper .storeengine-login-form .storeengine-form-group input`,
			getInputFieldCss( attributes ),
			getInputFieldCss( attributes, 'Tablet' ),
			getInputFieldCss( attributes, 'Tablet' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .storeengine-login-form-wrapper .storeengine-login-form .storeengine-form-group input::placeholder`,
			getInputFieldPlaceholderCss( attributes ),
			getInputFieldPlaceholderCss( attributes, 'Tablet' ),
			getInputFieldPlaceholderCss( attributes, 'Tablet' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.storeengine-login-form.editorInlineCSS`,
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
