import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getAvatarCSS,
	getAuthorCSS,
	getAuthorHoverCSS,
	getDateTimeCSS,
	getDateTimeHoverCSS,
	getDescriptionHoverCSS,
	getDescriptionCSS,
	getSummaryCSS,
	getSummaryHoverCSS,
	getSummaryIconHoverCSS,
	getSummaryIconCSS,
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
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-thumnail img`,
			getAvatarCSS( attributes, '' ),
			getAvatarCSS( attributes, 'Tablet' ),
			getAvatarCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-content .academy-review-meta__author`,
			getAuthorCSS( attributes, '' ),
			getAuthorCSS( attributes, 'Tablet' ),
			getAuthorCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-content .academy-review-meta__author:hover`,
			getAuthorHoverCSS( attributes, '' ),
			getAuthorHoverCSS( attributes, 'Tablet' ),
			getAuthorHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-content .academy-review-meta__published-date`,
			getDateTimeCSS( attributes, '' ),
			getDateTimeCSS( attributes, 'Tablet' ),
			getDateTimeCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-content .academy-review-meta__published-date:hover`,
			getDateTimeHoverCSS( attributes, '' ),
			getDateTimeHoverCSS( attributes, 'Tablet' ),
			getDateTimeHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-content .academy-review-description p`,
			getDescriptionCSS( attributes, '' ),
			getDescriptionCSS( attributes, 'Tablet' ),
			getDescriptionCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-content .academy-review-description p:hover`,
			getDescriptionHoverCSS( attributes, '' ),
			getDescriptionHoverCSS( attributes, 'Tablet' ),
			getDescriptionHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-thumnail .academy-review_container`,
			getSummaryCSS( attributes, '' ),
			getSummaryCSS( attributes, 'Tablet' ),
			getSummaryCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-thumnail .academy-review_container:hover`,
			getSummaryHoverCSS( attributes, '' ),
			getSummaryHoverCSS( attributes, 'Tablet' ),
			getSummaryHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-thumnail .academy-group-star i`,
			getSummaryIconCSS( attributes, '' ),
			getSummaryIconCSS( attributes, 'Tablet' ),
			getSummaryIconCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-list li .academy-review_container .academy-review-thumnail .academy-group-star i:hover`,
			getSummaryIconHoverCSS( attributes, '' ),
			getSummaryIconHoverCSS( attributes, 'Tablet' ),
			getSummaryIconHoverCSS( attributes, 'Mobile' )
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
