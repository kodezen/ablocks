import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getInputLabelCss,
	getInputFieldCss,
	getFormButtonCss,
	getFormButtonHoverCss,
	getInputFieldPlaceholderCss,
	getFormCss,
	getFormHoverCss,
	getInputFieldHoverCss,
} from './styling';

import './editor.scss';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { input_label_color, block_id } = attributes;

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
			'{{WRAPPER}} .academy-reg-form--instructor .academy-form-group label',
			getInputLabelCss( attributes ),
			getInputLabelCss( attributes, 'Tablet' ),
			getInputLabelCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-reg-form--instructor .academy-form-group input',
			getInputFieldCss( attributes ),
			getInputFieldCss( attributes, 'Tablet' ),
			getInputFieldCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-reg-form--instructor .academy-form-group input:hover',
			getInputFieldHoverCss( attributes ),
			getInputFieldHoverCss( attributes, 'Tablet' ),
			getInputFieldHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-reg-form--instructor .academy-form-group input::placeholder',
			getInputFieldPlaceholderCss( attributes ),
			getInputFieldPlaceholderCss( attributes, 'Tablet' ),
			getInputFieldPlaceholderCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-reg-form--instructor .academy-form-group button`,
			getFormButtonCss( attributes ),
			getFormButtonCss( attributes, 'Tablet' ),
			getFormButtonCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-reg-form--instructor .academy-form-group button:hover',
			getFormButtonHoverCss( attributes ),
			getFormButtonHoverCss( attributes, 'Tablet' ),
			getFormButtonHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-reg-form',
			getFormCss( attributes ),
			getFormCss( attributes, 'Tablet' ),
			getFormCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-reg-form:hover',
			getFormHoverCss( attributes ),
			getFormHoverCss( attributes, 'Tablet' ),
			getFormHoverCss( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.academy-instructor-registration-form.editorInlineCSS`,
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
