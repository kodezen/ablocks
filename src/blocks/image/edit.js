import React, { useState, useMemo, useEffect } from 'react';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import Settings from './settings';
import Render from './render';
import {
	getWrapperCSS,
	getImageCSS,
	getImageHoverCSS,
	getImageContainerCSS,
	getImageCaptionCSS,
	getImageCaptionHoverCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const [ currentImageData, setCurrentImageData ] = useState( {} );
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

		// Image wrapper css

		cssGenerator.addClassStyles(
			'{{WRAPPER}}',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		// Image container css
		cssGenerator.addClassStyles(
			'{{WRAPPER}}',
			getImageContainerCSS( attributes ),
			getImageContainerCSS( attributes, 'Tablet' ),
			getImageContainerCSS( attributes, 'Mobile' )
		);

		// Image css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-figure img',
			getImageCSS( attributes ),
			getImageCSS( attributes, 'Tablet' ),
			getImageCSS( attributes, 'Mobile' )
		);

		// Image hover css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-figure img:hover',
			getImageHoverCSS( attributes ),
			getImageHoverCSS( attributes, 'Tablet' ),
			getImageHoverCSS( attributes, 'Mobile' )
		);

		// Image caption css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-figure .ablocks-image-caption',
			getImageCaptionCSS( attributes ),
			getImageCaptionCSS( attributes, 'Tablet' ),
			getImageCaptionCSS( attributes, 'Mobile' )
		);

		// Image caption hover css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-figure .ablocks-image-caption:hover',
			getImageCaptionHoverCSS( attributes ),
			getImageCaptionHoverCSS( attributes, 'Tablet' ),
			getImageCaptionHoverCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.image.editorInlineCSS`,
			null,
			attributes,
			cssGenerator
		);
		if ( editorInlineCSSExtend ) {
			return editorInlineCSSExtend;
		}

		return cssGenerator.generateCSS();
	}, [ attributes ] );

	const otherProps = {
		currentImageData,
		setCurrentImageData,
	};

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...otherProps } { ...props } /> }
			<Render { ...otherProps } { ...props } />
		</>
	);
}
