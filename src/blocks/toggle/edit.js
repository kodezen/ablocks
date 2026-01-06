import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import {
	getToggleBarCSS,
	getToggleBarWrapperCSS,
	getToggleBarHoverCSS,
	getToggleLabelCSS,
	getToggleLabelActiveCSS,
	toggleActiveBgColorCSS,
	toggleActiveColorCSS,
	toggleNormalColorCSS,
	toggleNormalBgColorCSS,
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
			'{{WRAPPER}} .ablocks-toggle__topbar',
			getToggleBarCSS( attributes ),
			getToggleBarCSS( attributes, 'Tablet' ),
			getToggleBarCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-toggle__topbar:hover',
			getToggleBarHoverCSS( attributes ),
			getToggleBarHoverCSS(
				attributes,
				'Tablet',
				getToggleBarHoverCSS( attributes, 'Mobile' )
			)
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-toggle__topbar-wrapper',
			getToggleBarWrapperCSS( attributes ),
			getToggleBarWrapperCSS( attributes, 'Tablet' ),
			getToggleBarWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-toggle__label',
			getToggleLabelCSS( attributes ),
			getToggleLabelCSS( attributes, 'Tablet' ),
			getToggleLabelCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-toggle__label--active',
			getToggleLabelActiveCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-toggle__slider',
			toggleNormalBgColorCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-toggle__slider:before',
			toggleNormalColorCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} input.ablocks-toggle__checkbox:checked + .ablocks-toggle__slider',
			toggleActiveColorCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} input.ablocks-toggle__checkbox:checked + .ablocks-toggle__slider:before',
			toggleActiveBgColorCSS( attributes )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.toggle.editorInlineCSS`,
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
