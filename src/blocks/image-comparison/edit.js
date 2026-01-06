import React, { useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getAfterImageOverlayHorizontalCSS,
	getAfterImageOverlayVerticalCSS,
	getBeforeImageHeightCSS,
	getBeforeImageOverlayHorizontalCSS,
	getBeforeImageOverlayVerticalCSS,
	getBeforeImageWidthCSS,
	getHorizontalSliderIconCSS,
	getImageOverlayCSS,
	getImageOverlayHoverCSS,
	getOverlayCSS,
	getSliderLineHorizontalCSS,
	getSliderLineVerticalCSS,
	getVerticalSliderIconCSS,
	getWrapperCSS,
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
	// const cssGenerator = new CSSGenerator(attributes, clientId);
	let cssGenerator = null;
	if ( cssGenerator ) {
		if (
			attributes?.version === 2 &&
			! ( cssGenerator instanceof CSSGenerator2 )
		) {
			cssGenerator = new CSSGenerator2( attributes, clientId ); // Create new instance of v2 if needed
		} else if (
			attributes?.version !== 2 &&
			! ( cssGenerator instanceof CSSGenerator )
		) {
			cssGenerator = new CSSGenerator( attributes, clientId ); // Create new instance of v1 if needed
		}
	} else {
		// No instance, so create the correct one based on version
		if ( attributes?.version === 2 ) {
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
		'{{WRAPPER}} .ablocks-image-comparison__images-container .ablocks-image-comparison__before-image',
		getBeforeImageWidthCSS( attributes, '' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__images-container-vertical .ablocks-image-comparison__before-image',
		getBeforeImageHeightCSS( attributes, '' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__images-container .ablocks-image-comparison__slider-line',
		getSliderLineHorizontalCSS( attributes ),
		getSliderLineHorizontalCSS( attributes, 'Tablet' ),
		getSliderLineHorizontalCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__images-container-vertical .ablocks-image-comparison__slider-line',
		getSliderLineVerticalCSS( attributes ),
		getSliderLineVerticalCSS( attributes, 'Tablet' ),
		getSliderLineVerticalCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__images-container .ablocks-image-comparison__slider-icon',
		getHorizontalSliderIconCSS( attributes ),
		getHorizontalSliderIconCSS( attributes, 'Tablet' ),
		getHorizontalSliderIconCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__images-container-vertical .ablocks-image-comparison__slider-icon',
		getVerticalSliderIconCSS( attributes ),
		getVerticalSliderIconCSS( attributes, 'Tablet' ),
		getVerticalSliderIconCSS( attributes, 'Mobile' )
	);

	// overlay
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__overlay',
		getOverlayCSS( attributes )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__overlay--hover',
		getOverlayCSS( attributes )
	);

	// label
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__beforeImage-label',
		getImageOverlayCSS( attributes ),
		getImageOverlayCSS( attributes, 'Tablet' ),
		getImageOverlayCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__beforeImage-label:hover',
		getImageOverlayHoverCSS( attributes ),
		getImageOverlayHoverCSS( attributes, 'Tablet' ),
		getImageOverlayHoverCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__afterImage-label',
		getImageOverlayCSS( attributes ),
		getImageOverlayCSS( attributes, 'Tablet' ),
		getImageOverlayCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__afterImage-label:hover',
		getImageOverlayHoverCSS( attributes ),
		getImageOverlayHoverCSS( attributes, 'Tablet' ),
		getImageOverlayHoverCSS( attributes, 'Mobile' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__beforeImage-label--horizontal',
		getBeforeImageOverlayHorizontalCSS( attributes, '' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__beforeImage-label--vertical',
		getBeforeImageOverlayVerticalCSS( attributes, '' )
	);
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__afterImage-label--horizontal',
		getAfterImageOverlayHorizontalCSS( attributes, '' )
	);

	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-image-comparison__afterImage-label--vertical',
		getAfterImageOverlayVerticalCSS( attributes, '' )
	);

	const generatedCSS = cssGenerator.generateCSS();

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
