import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import {
	getWrapperCSS as getIconWrapperCSS,
	getWrapperHoverCSS as getIconWrapperHoverCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
	getElementImageHoverCSS,
} from '@Controls/icon-upload/helper';
import {
	getButtonCSS,
	getButtonHoverCSS,
	getButtonTextCSS,
	getWrapperCSS,
	getIconHoverCSS,
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
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
		}
	}, [ block_id, clientId ] );
	// Generate CSS
	const generatedCSS = useMemo( () => {
		// const cssGenerator = new CSSGenerator(attributes, clientId);
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
		// Generate wrapper CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}}',
			getWrapperCSS( attributes, '' ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);
		// Generate button CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-stripe-button',
			getButtonCSS( attributes ),
			getButtonCSS( attributes, 'Tablet' ),
			getButtonCSS( attributes, 'Mobile' )
		);

		// Generate button hover CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-stripe-button:hover',
			getButtonHoverCSS( attributes, '' ),
			getButtonHoverCSS( attributes, 'Tablet' ),
			getButtonHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-stripe-button:hover .ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconHoverCSS( attributes, '' ),
			getIconHoverCSS( attributes, 'Tablet' ),
			getIconHoverCSS( attributes, 'Mobile' )
		);
		// Generate button text CSS
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-stripe-button .ablocks-stripe-button__text',
			getButtonTextCSS( attributes, '' ),
			getButtonTextCSS( attributes, 'Tablet' ),
			getButtonTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-icon-wrap',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-icon-wrap:hover',
			getIconWrapperHoverCSS( attributes ),
			getIconWrapperHoverCSS( attributes, 'Tablet' ),
			getIconWrapperHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-icon-wrap img.ablocks-image-icon',
			getIconElementImageCSS( attributes ),
			getIconElementImageCSS( attributes, 'Tablet' ),
			getIconElementImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-icon-wrap img.ablocks-image-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconElementCSS( attributes ),
			getIconElementCSS( attributes, 'Tablet' ),
			getIconElementCSS( attributes, 'Tablet' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-icon-wrap svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Tablet' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.button.editorInlineCSS`,
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
