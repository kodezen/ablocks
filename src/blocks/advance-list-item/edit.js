import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	getContainerCSS,
	getIconOrder,
	getMarkerCSS,
	getParagraphTextCSS,
	getParagraphDropTextCSS,
	get_divider_css,
} from './styling';
import {
	getWrapperCSS as getIconWrapperCSS,
	getWrapperHoverCSS as getIconWrapperHoverCSS,
	getElementCSS as getIconElementCSS,
	getElementImageCSS as getIconElementImageCSS,
} from '@Controls/icon-upload/helper';

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
			'{{WRAPPER}}.ablocks-block--advance-list-item .ablocks-block-container',
			getContainerCSS( attributes ),
			getContainerCSS( attributes, 'Tablet' ),
			getContainerCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--advance-list-item .advance-list-item-marker',
			getMarkerCSS( attributes ),
			getMarkerCSS( attributes, 'Tablet' ),
			getMarkerCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--advance-list-item .advance-list-item-marker,{{WRAPPER}}.ablocks-block--advance-list-item .ablocks-icon-wrap',
			getIconOrder( attributes ),
			getIconOrder( attributes, 'Tablet' ),
			getIconOrder( attributes, 'Mobile' )
		);
		// Icon Style
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap:hover',
			getIconWrapperHoverCSS( attributes ),
			getIconWrapperHoverCSS( attributes, 'Tablet' ),
			getIconWrapperHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap img.ablocks-image-icon',
			getIconElementImageCSS( attributes ),
			getIconElementImageCSS( attributes, 'Tablet' ),
			getIconElementImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap svg.ablocks-svg-icon',
			getIconElementCSS( attributes ),
			getIconElementCSS( attributes, 'Tablet' ),
			getIconElementCSS( attributes, 'Mobile' )
		);

		//text
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-advance-list-item-text',
			getParagraphTextCSS( attributes ),
			getParagraphTextCSS( attributes, 'Tablet' ),
			getParagraphTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-advance-list-item-text-drop-caps::first-letter',
			getParagraphDropTextCSS( attributes ),
			getParagraphDropTextCSS( attributes, 'Tablet' ),
			getParagraphDropTextCSS( attributes, 'Mobile' )
		);

		//divider
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .ablocks-advance-list-item-divider__pattern-${
				attributes.dividerType === 'mask-style' ? 'mask' : 'css'
			}`,
			get_divider_css( attributes ),
			get_divider_css( attributes, 'Tablet' ),
			get_divider_css( attributes, 'Mobile' )
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
