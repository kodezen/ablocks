import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getOverviewHeadingCSS,
	getOverviewHeadingHoverCSS,
	getDescriptionCSS,
	getDescriptionHoverCSS,
} from './styling';

import './editor.scss';

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
		let cssGenerator = null;

		// Create appropriate CSS generator instance based on blockVersion
		if ( attributes?.blockVersion === 2 ) {
			cssGenerator = new CSSGenerator2( attributes, clientId );
		} else {
			cssGenerator = new CSSGenerator( attributes, clientId );
		}

		if ( ! cssGenerator ) {
			return '';
		}
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--description-title`,
			getOverviewHeadingCSS( attributes, '' ),
			getOverviewHeadingCSS( attributes, 'Tablet' ),
			getOverviewHeadingCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--description-title:hover`,
			getOverviewHeadingHoverCSS( attributes, '' ),
			getOverviewHeadingHoverCSS( attributes, 'Tablet' ),
			getOverviewHeadingHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--description p
			{{WRAPPER}} .academy-single-course__content-item--description `,
			getDescriptionCSS( attributes, '' ),
			getDescriptionCSS( attributes, 'Tablet' ),
			getDescriptionCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--description p:hover
			{{WRAPPER}} .academy-single-course__content-item--description:hover`,
			getDescriptionHoverCSS( attributes, '' ),
			getDescriptionHoverCSS( attributes, 'Tablet' ),
			getDescriptionHoverCSS( attributes, 'Mobile' )
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
