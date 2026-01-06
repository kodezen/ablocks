import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator2 from '@Utils/css-generator2';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import {
	getWrapperCSS,
	getHeadingTextCSS,
	getSvgPathCSS,
	getHeadingGeneralCSS,
	getHeadingAnimatedCSS,
	getHeadingatagCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id, isAnimated } = attributes;
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
			// No instance, so create the correct one based on blockVersion
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
			'{{WRAPPER}} .ablocks-heading-text',
			getHeadingTextCSS( attributes ),
			getHeadingTextCSS( attributes, 'Tablet' ),
			getHeadingTextCSS( attributes, 'Mobile' )
		);
		const desktopHeadingatagStyles = getHeadingatagCSS( attributes );

		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--heading a',
			desktopHeadingatagStyles
		);

		if ( isAnimated ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-animated-text path',
				getSvgPathCSS( attributes ),
				getSvgPathCSS( attributes, 'Tablet' ),
				getSvgPathCSS( attributes, 'Mobile' )
			);

			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-animated-text',
				getHeadingGeneralCSS( attributes ),
				getHeadingGeneralCSS( attributes, 'Tablet' ),
				getHeadingGeneralCSS( attributes, 'Mobile' )
			);
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-animated-text-wrapper',
				getHeadingAnimatedCSS( attributes ),
				getHeadingAnimatedCSS( attributes, 'Tablet' ),
				getHeadingAnimatedCSS( attributes, 'Mobile' )
			);
		}

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.heading.editorInlineCSS`,
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
