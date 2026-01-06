import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import {
	getLabelCSS,
	getWrapperCSS,
	getSeparatorCSS,
	getNumberCSS,
	getCountDownItemsCSS,
	getCountDownItemCSS,
	getCountDownItemHoverCSS,
} from './styling';
export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { targetTime, block_id } = attributes;

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
			'{{WRAPPER}}',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container',
			getCountDownItemsCSS( attributes ),
			getCountDownItemsCSS( attributes, 'Tablet' ),
			getCountDownItemsCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-countdown__item',
			getCountDownItemCSS( attributes ),
			getCountDownItemCSS( attributes, 'Tablet' ),
			getCountDownItemCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-countdown__item:hover',
			getCountDownItemHoverCSS( attributes ),
			getCountDownItemHoverCSS( attributes, 'Tablet' ),
			getCountDownItemHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-countdown__item .ablocks-countdown-label',
			getLabelCSS( attributes ),
			getLabelCSS( attributes, 'Tablet' ),
			getLabelCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-countdown__item .ablocks-countdown-value',
			getNumberCSS( attributes ),
			getNumberCSS( attributes, 'Tablet' ),
			getNumberCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-countdown__separator',
			getSeparatorCSS( attributes ),
			getSeparatorCSS( attributes, 'Tablet' ),
			getSeparatorCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.countdown.editorInlineCSS`,
			null,
			attributes,
			cssGenerator
		);
		if ( editorInlineCSSExtend ) {
			return editorInlineCSSExtend;
		}
		return cssGenerator.generateCSS();
	}, [ attributes ] );

	useEffect( () => {
		const currentDate = new Date();

		// Step 2: Add 2 days to the current date
		currentDate.setDate( currentDate.getDate() + 2 );

		if ( ! targetTime ) {
			setAttributes( { targetTime: currentDate.toISOString() } );
		}
	}, [ clientId, targetTime ] );
	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
