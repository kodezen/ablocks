import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getResetFormCss,
	getResetFormLabelCss,
	getResetFormInputCss,
	getResetFormButtonCss,
	getResetFormHeaderCss,
	getResetFormFooterCss,
	getResetFormHoverCss,
	getResetFormInputHoverCss,
	getResetFormButtonHoverCss,
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
			'{{WRAPPER}} .academy-password-reset-form-wrapper',
			getResetFormCss( attributes ),
			getResetFormCss( attributes, 'Tablet' ),
			getResetFormCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper:hover',
			getResetFormHoverCss( attributes ),
			getResetFormHoverCss( attributes, 'Tablet' ),
			getResetFormHoverCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper .academy-password-reset-form .academy-form-group label',
			getResetFormLabelCss( attributes ),
			getResetFormLabelCss( attributes, 'Tablet' ),
			getResetFormLabelCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper .academy-password-reset-form .academy-form-group input',
			getResetFormInputCss( attributes ),
			getResetFormInputCss( attributes, 'Tablet' ),
			getResetFormInputCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper .academy-password-reset-form .academy-form-group input:hover',
			getResetFormInputHoverCss( attributes ),
			getResetFormInputHoverCss( attributes, 'Tablet' ),
			getResetFormInputHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper .academy-password-reset-form .academy-form-group button',
			getResetFormButtonCss( attributes ),
			getResetFormButtonCss( attributes, 'Tablet' ),
			getResetFormButtonCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper .academy-password-reset-form .academy-form-group button:hover',
			getResetFormButtonHoverCss( attributes ),
			getResetFormButtonHoverCss( attributes, 'Tablet' ),
			getResetFormButtonHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper h2.academy-password-reset-form-heading',
			getResetFormHeaderCss( attributes ),
			getResetFormHeaderCss( attributes, 'Tablet' ),
			getResetFormHeaderCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-password-reset-form-wrapper .academy-password-reset-form-info a',
			getResetFormFooterCss( attributes ),
			getResetFormFooterCss( attributes, 'Tablet' ),
			getResetFormFooterCss( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.academy-password-reset-form.editorInlineCSS`,
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
