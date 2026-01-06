import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getReviewFormCSS,
	getReviewFormHoverCSS,
	getReviewButtonHoverCSS,
	getReviewButtonCSS,
	getReviewStarHoverCSS,
	getReviewStarCSS,
	getFormHoverCSS,
	getFormCSS,
	getFormButtonCSS,
	getFormButtonHoverCSS,
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
			`{{WRAPPER}} .academy-review-form,
			 {{WRAPPER}}.academy-review-form--open-form .comment-respond`,
			getReviewFormCSS( attributes, '' ),
			getReviewFormCSS( attributes, 'Tablet' ),
			getReviewFormCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form:hover,
			{{WRAPPER}} .academy-review-form--open-form .comment-respond:hover`,
			getReviewFormHoverCSS( attributes, '' ),
			getReviewFormHoverCSS( attributes, 'Tablet' ),
			getReviewFormHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form__add-review .academy-btn-add-review`,
			getReviewButtonCSS( attributes, '' ),
			getReviewButtonCSS( attributes, 'Tablet' ),
			getReviewButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form__add-review .academy-btn-add-review:hover`,
			getReviewButtonHoverCSS( attributes, '' ),
			getReviewButtonHoverCSS( attributes, 'Tablet' ),
			getReviewButtonHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form .academy-review-form-rating p.stars a,
			{{WRAPPER}} .academy-review-form .academy-review-form-rating p.stars a::before`,
			getReviewStarCSS( attributes, '' ),
			getReviewStarCSS( attributes, 'Tablet' ),
			getReviewStarCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form .academy-review-form-rating p.stars a,
			{{WRAPPER}} .academy-review-form .academy-review-form-rating p.stars a::before`,
			getReviewStarHoverCSS( attributes, '' ),
			getReviewStarHoverCSS( attributes, 'Tablet' ),
			getReviewStarHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form .comment-respond form.comment-form .academy-review-form-review textarea`,
			getFormCSS( attributes, '' ),
			getFormCSS( attributes, 'Tablet' ),
			getFormCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form .comment-respond form.comment-form .academy-review-form-review textarea:hover`,
			getFormHoverCSS( attributes, '' ),
			getFormHoverCSS( attributes, 'Tablet' ),
			getFormHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form input[type=submit]`,
			getFormButtonCSS( attributes, '' ),
			getFormButtonCSS( attributes, 'Tablet' ),
			getFormButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-review-form input[type=submit]:hover`,
			getFormButtonHoverCSS( attributes, '' ),
			getFormButtonHoverCSS( attributes, 'Tablet' ),
			getFormButtonHoverCSS( attributes, 'Mobile' )
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
