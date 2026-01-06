import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import {
	getWrapperCSS,
	getImageCSS,
	getImageHoverCSS,
	getImageContainerCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( { block_id: clientId } );
		}
	}, [ block_id, clientId ] );
	// Generate CSS
	const generatedCSS = useMemo( () => {
		const css = new CSSGenerator2( attributes, clientId );

		// Image wrapper css
		css.addClassStyles(
			'{{WRAPPER}}',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		// Image container css
		css.addClassStyles(
			'{{WRAPPER}}',
			getImageContainerCSS( attributes ),
			getImageContainerCSS( attributes, 'Tablet' ),
			getImageContainerCSS( attributes, 'Mobile' )
		);

		// Image css
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container > .ablocks-block--featured-image > .ablocks-featured-image',
			getImageCSS( attributes ),
			getImageCSS( attributes, 'Tablet' ),
			getImageCSS( attributes, 'Mobile' )
		);

		// Image hover css
		css.addClassStyles(
			'{{WRAPPER}} .ablocks-block--featured-image img:hover',
			getImageHoverCSS( attributes ),
			getImageHoverCSS( attributes, 'Tablet' ),
			getImageHoverCSS( attributes, 'Mobile' )
		);

		return applyFilters(
			'ablocks.featuredImage.inlineCSS',
			css.generateCSS(),
			attributes
		);
	}, [ attributes ] );

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
