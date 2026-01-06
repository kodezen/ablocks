import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import {
	getTitleCSS,
	getTitleHoverCSS,
	getTitleActiveCSS,
	getPanelCSS,
	getPanelHoverCSS,
	getPanelActiveCSS,
	getItemCSS,
	getItemHoverCSS,
	getIconCSS,
	getIconHoverCSS,
	getContentCSS,
	getContentHoverCSS,
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
	}, [ block_id, clientId ] );
	// Generate CSS
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );

		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--single-accordion',
			getItemCSS( attributes ),
			getItemCSS( attributes, 'Tablet' ),
			getItemCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--single-accordion:hover',
			getItemHoverCSS( attributes ),
			getItemHoverCSS( attributes, 'Tablet' ),
			getItemHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__heading  .ablocks-block-accordion-title',
			getTitleCSS( attributes ),
			getTitleCSS( attributes, 'Tablet' ),
			getTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__heading:hover  .ablocks-block-accordion-title',
			getTitleHoverCSS( attributes ),
			getTitleHoverCSS( attributes, 'Tablet' ),
			getTitleHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--single-accordion-is-selected  .ablocks-block-accordion-title',
			getTitleActiveCSS( attributes ),
			getTitleActiveCSS( attributes, 'Tablet' ),
			getTitleActiveCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__heading',
			getPanelCSS( attributes ),
			getPanelCSS( attributes, 'Tablet' ),
			getPanelCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--single-accordion-is-selected .ablocks-block--single-accordion__heading',
			getPanelActiveCSS( attributes ),
			getPanelActiveCSS( attributes, 'Tablet' ),
			getPanelActiveCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__heading:hover',
			getPanelHoverCSS( attributes ),
			getPanelHoverCSS( attributes, 'Tablet' ),
			getPanelHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__heading svg.ablocks-svg-icon',
			getIconCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__heading:hover svg.ablocks-svg-icon',
			getIconHoverCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__body-content',
			getContentCSS( attributes ),
			getContentCSS( attributes, 'Tablet' ),
			getContentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block--single-accordion__body-content:hover',
			getContentHoverCSS( attributes ),
			getContentHoverCSS( attributes, 'Tablet' ),
			getContentHoverCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.single-accordion.editorInlineCSS`,
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
