import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getFeedbackHeadingCSS,
	getFeedbackHeadingHoverCSS,
	getFeedbackSectionCSS,
	getFeedbackSectionHoverCSS,
	getAvgRatingCSS,
	getAvgRatingHoverCSS,
	getRatingStarCSS,
	getRatingStartHoverCSS,
	getRatingTotalCSS,
	getRatingTotalHoverCSS,
	getFeedbackCSS,
	getFeedbackHoverCSS,
	getStartCSS,
	getStartHoverCSS,
	getFillCSS,
	getFillHoverCSS,
	getFillActiveCSS,
	getFillActiveHoverCSS,
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
			`{{WRAPPER}} .academy-single-course__content-item--feedback .feedback-title`,
			getFeedbackHeadingCSS( attributes, '' ),
			getFeedbackHeadingCSS( attributes, 'Tablet' ),
			getFeedbackHeadingCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .feedback-title:hover`,
			getFeedbackHeadingHoverCSS( attributes, '' ),
			getFeedbackHeadingHoverCSS( attributes, 'Tablet' ),
			getFeedbackHeadingHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings`,
			getFeedbackSectionCSS( attributes, '' ),
			getFeedbackSectionCSS( attributes, 'Tablet' ),
			getFeedbackSectionCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}}.academy-single-course__content-item--feedback .academy-student-course-feedback-ratings:hover`,
			getFeedbackSectionHoverCSS( attributes, '' ),
			getFeedbackSectionHoverCSS( attributes, 'Tablet' ),
			getFeedbackSectionHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-avg-rating`,
			getAvgRatingCSS( attributes, '' ),
			getAvgRatingCSS( attributes, 'Tablet' ),
			getAvgRatingCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-avg-rating:hover`,
			getAvgRatingHoverCSS( attributes, '' ),
			getAvgRatingHoverCSS( attributes, 'Tablet' ),
			getAvgRatingHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-avg-rating-html .academy-icon::before`,
			getRatingStarCSS( attributes, '' ),
			getRatingStarCSS( attributes, 'Tablet' ),
			getRatingStarCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-avg-rating-html .academy-icon:hover::before`,
			getRatingStartHoverCSS( attributes, '' ),
			getRatingStartHoverCSS( attributes, 'Tablet' ),
			getRatingStartHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-avg-rating-total`,
			getRatingTotalCSS( attributes, '' ),
			getRatingTotalCSS( attributes, 'Tablet' ),
			getRatingTotalCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-avg-rating-total:hover`,
			getRatingTotalHoverCSS( attributes, '' ),
			getRatingTotalHoverCSS( attributes, 'Tablet' ),
			getRatingTotalHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-col,
			{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-label,
			{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-label span`,
			getFeedbackCSS( attributes, '' ),
			getFeedbackCSS( attributes, 'Tablet' ),
			getFeedbackCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-col:hover,
			{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-label:hover,
			{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-label span:hover`,
			getFeedbackHoverCSS( attributes, '' ),
			getFeedbackHoverCSS( attributes, 'Tablet' ),
			getFeedbackHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-icon`,
			getStartCSS( attributes, '' ),
			getStartCSS( attributes, 'Tablet' ),
			getStartCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-icon:hover`,
			getStartHoverCSS( attributes, '' ),
			getStartHoverCSS( attributes, 'Tablet' ),
			getStartHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-fill`,
			getFillCSS( attributes, '' ),
			getFillCSS( attributes, 'Tablet' ),
			getFillCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-fill`,
			getFillHoverCSS( attributes, '' ),
			getFillHoverCSS( attributes, 'Tablet' ),
			getFillHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-fill-bar`,
			getFillActiveCSS( attributes, '' ),
			getFillActiveCSS( attributes, 'Tablet' ),
			getFillActiveCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--feedback .academy-student-course-feedback-ratings .academy-ratings-list-item .academy-ratings-list-item-fill-bar:hover`,
			getFillActiveHoverCSS( attributes, '' ),
			getFillActiveHoverCSS( attributes, 'Tablet' ),
			getFillActiveHoverCSS( attributes, 'Mobile' )
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
