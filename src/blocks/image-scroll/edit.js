import React, { useState, useMemo, useEffect } from 'react';
import CSSGenerator from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';
import Settings from './settings';
import Render from './render';

import {
	getWrapperCSS,
	getImageCSS,
	getImageHoverCSS,
	getImageContainerCSS,
	getScrollCSS,
	getScrollOptionCSS,
	getImageFigureCSS,
	getImageOverlayCSS,
	getImageOverlayHoverCSS,
	getWrapperHoverCSS,
	getIconWrapperCSS,
	getIconWrapperHoverCSS,
} from './styling';
export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { imgUrl, block_id } = attributes;
	const [ currentImageData, setCurrentImageData ] = useState( {} );
	// Generate CSS
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
	}, [ block_id, clientId ] );

	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );

		// Image wrapper css

		cssGenerator.addClassStyles(
			'{{WRAPPER}}',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}:hover',
			getWrapperHoverCSS( attributes ),
			getWrapperHoverCSS( attributes, 'Tablet' ),
			getWrapperHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`
			{{WRAPPER}} .ablocks-block-container
			`,
			getScrollCSS( attributes ),
			getScrollCSS( attributes, 'Tablet' ),
			getScrollCSS( attributes, 'Mobile' )
		);
		if ( imgUrl ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-container',
				getScrollOptionCSS( attributes ),
				getScrollOptionCSS( attributes, 'Tablet' ),
				getScrollOptionCSS( attributes, 'Mobile' )
			);
		}
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-image-overlay',
			getImageOverlayCSS( attributes )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--image-scroll:hover .ablocks-block-image-overlay',
			getImageOverlayHoverCSS( attributes )
		);
		// Image container css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container',
			getImageContainerCSS( attributes ),
			getImageContainerCSS( attributes, 'Tablet' ),
			getImageContainerCSS( attributes, 'Mobile' )
		);
		if ( imgUrl ) {
			cssGenerator.addClassStyles(
				'{{WRAPPER}} .ablocks-block-container .ablocks-image-figure',
				getImageFigureCSS( attributes ),
				getImageFigureCSS( attributes, 'Tablet' ),
				getImageFigureCSS( attributes, 'Mobile' )
			);
		}
		// Image css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-image-figure img',
			getImageCSS( attributes ),
			getImageCSS( attributes, 'Tablet' ),
			getImageCSS( attributes, 'Mobile' )
		);

		// Image hover css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-image-figure img:hover',
			getImageHoverCSS( attributes ),
			getImageHoverCSS( attributes, 'Tablet' ),
			getImageHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-icon-wrap',
			getIconWrapperCSS( attributes ),
			getIconWrapperCSS( attributes, 'Tablet' ),
			getIconWrapperCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}}.ablocks-block--image-scroll:hover  .ablocks-icon-wrap',
			getIconWrapperHoverCSS( attributes )
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
