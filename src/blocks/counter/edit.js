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
	getWrapperCSS,
	getNumberTextCSS,
	getHeadingTextCSS,
	getNumberWrapperCSS,
	getCounterCircleCSS,
	getCounterBarBgCSS,
	getCounterBarProgressCSS,
	getCounterCircleBgCSS,
	getCounterCircleProgressCSS,
	getCounterBarCSS,
	getCounterCircleWrapperCSS,
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
			'{{WRAPPER}} .ablocks-block-container',
			getCounterBarCSS( attributes ),
			getCounterBarCSS( attributes, 'Tablet' ),
			getCounterBarCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--counter--circle .ablocks-block-container',
			getCounterCircleWrapperCSS( attributes ),
			getCounterCircleWrapperCSS( attributes, 'Tablet' ),
			getCounterCircleWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--counter--number .ablocks-block-container',
			getNumberWrapperCSS( attributes ),
			getNumberWrapperCSS( attributes, 'Tablet' ),
			getNumberWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-counter__content',
			getNumberTextCSS( attributes ),
			getNumberTextCSS( attributes, 'Tablet' ),
			getNumberTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-counter__text',
			getHeadingTextCSS( attributes ),
			getHeadingTextCSS( attributes, 'Tablet' ),
			getHeadingTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--counter--bar  .ablocks-bar-counter__background ',
			getCounterBarBgCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--counter--bar .ablocks-bar-counter__progress',
			getCounterBarProgressCSS( attributes ),
			getCounterBarProgressCSS( attributes, 'Tablet' ),
			getCounterBarProgressCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--counter--circle',
			getCounterCircleCSS( attributes ),
			getCounterCircleCSS( attributes, 'Tablet' ),
			getCounterCircleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--counter--circle  .ablocks-circle-counter__background ',
			getCounterCircleBgCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--counter--circle .ablocks-circle-counter__progress',
			getCounterCircleProgressCSS( attributes )
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
			getIconElementCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}  .ablocks-icon-wrap svg.ablocks-svg-icon:hover',
			getElementImageHoverCSS( attributes ),
			getElementImageHoverCSS( attributes, 'Tablet' ),
			getElementImageHoverCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.counter.editorInlineCSS`,
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
