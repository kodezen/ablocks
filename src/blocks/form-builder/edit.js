import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { useSelect } from '@wordpress/data';
import { VariationPicker } from './variationPicker';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getRowColumnDisplayCss,
	getLabelCSS,
	getHelperTextCSS,
	getInputPlaceholderCSS,
	getInputCSS,
	getInputHoverCSS,
	getFieldCSS,
	getSubmitButtonCSS,
	getSubmitButtonHoverCSS,
	getAlignmentButtonCSS,
	getChildBlockPositionCSS,
	getMultiStepAppenderRemove,
	getInputFocusCSS,
	getIconPositionCSS,
	getNevigetorCSS,
	getNavigatorSpacingCSS,
	getErrorStylesCSS,
	getSuccessStylesCSS,
	getSuccessErrorCommonStylesCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
		// Save Version
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );

	// eslint-disable-next-line
	const { blockParents } = useSelect((select) => {
		const coreBlockEditor = select( 'core/block-editor' );
		return {
			blockParents: coreBlockEditor?.getBlockParents( clientId ),
			hasChildBlocks:
				coreBlockEditor?.getBlockOrder( clientId ).length > 0,
		};
	} );
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
			'{{WRAPPER}} > .ablocks-block-container > .ablocks-form-builder',
			getRowColumnDisplayCss( attributes ),
			getRowColumnDisplayCss( attributes, 'Tablet' ),
			getRowColumnDisplayCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__field',
			getFieldCSS( attributes ),
			getFieldCSS( attributes, 'Tablet' ),
			getFieldCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__label',
			getLabelCSS( attributes ),
			getLabelCSS( attributes, 'Tablet' ),
			getLabelCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__helper-text',
			getHelperTextCSS( attributes ),
			getHelperTextCSS( attributes, 'Tablet' ),
			getHelperTextCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__input',
			getInputCSS( attributes ),
			getInputCSS( attributes, 'Tablet' ),
			getInputCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__input:hover',
			getInputHoverCSS( attributes ),
			getInputHoverCSS( attributes, 'Tablet' ),
			getInputHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__input:focus',
			getInputFocusCSS( attributes ),
			getInputFocusCSS( attributes, 'Tablet' ),
			getInputFocusCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__input::placeholder',
			getInputPlaceholderCSS( attributes ),
			getInputPlaceholderCSS( attributes, 'Tablet' ),
			getInputPlaceholderCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__input-icon,{{WRAPPER}} .ablocks-form-builder__input-toggle-password',
			getIconPositionCSS( attributes ),
			getIconPositionCSS( attributes, 'Tablet' ),
			getIconPositionCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__submit-button',
			getAlignmentButtonCSS( attributes ),
			getAlignmentButtonCSS( attributes, 'Tablet' ),
			getAlignmentButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__submit-button',
			getSubmitButtonCSS( attributes ),
			getSubmitButtonCSS( attributes, 'Tablet' ),
			getSubmitButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__submit-button:hover',
			getSubmitButtonHoverCSS( attributes ),
			getSubmitButtonHoverCSS( attributes, 'Tablet' ),
			getSubmitButtonHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .block-editor-block-list__layout',
			getChildBlockPositionCSS( attributes ),
			getChildBlockPositionCSS( attributes, 'Tablet' ),
			getChildBlockPositionCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-form-builder__fields.block-editor-block-list__layout > .block-list-appender',
			getMultiStepAppenderRemove( attributes ),
			getMultiStepAppenderRemove( attributes, 'Tablet' ),
			getMultiStepAppenderRemove( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--form-builder__navigator',
			getNevigetorCSS( attributes ),
			getNevigetorCSS( attributes, 'Tablet' ),
			getNevigetorCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--form-builder__navigator-redirect-page',
			getNavigatorSpacingCSS( attributes ),
			getNavigatorSpacingCSS( attributes, 'Tablet' ),
			getNavigatorSpacingCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--form-builder__error',
			getErrorStylesCSS( attributes ),
			getErrorStylesCSS( attributes, 'Tablet' ),
			getErrorStylesCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--form-builder__success',
			getSuccessStylesCSS( attributes ),
			getSuccessStylesCSS( attributes, 'Tablet' ),
			getSuccessStylesCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--form-builder__feedback-message',
			getSuccessErrorCommonStylesCSS( attributes ),
			getSuccessErrorCommonStylesCSS( attributes, 'Tablet' ),
			getSuccessErrorCommonStylesCSS( attributes, 'Mobile' )
		);

		return cssGenerator.generateCSS();
	}, [ attributes ] );
	// Generate CSS

	if ( attributes.variationSelected ) {
		return <VariationPicker { ...props } />;
	}

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
