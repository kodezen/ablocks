import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getAvatarImageCSS,
	getTitleCSS,
	getTitleHoverCSS,
	getReviewTextCSS,
	getReviewIconCSS,
	getInstructorCSS,
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
			`{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-info__thumbnail img`,
			getAvatarImageCSS( attributes, '' ),
			getAvatarImageCSS( attributes, 'Tablet' ),
			getAvatarImageCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-review__title,
			{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-info__content .instructor-title`,
			getTitleCSS( attributes, '' ),
			getTitleCSS( attributes, 'Tablet' ),
			getTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-review__title:hover,
			{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-info__content .instructor-title:hover`,
			getTitleHoverCSS( attributes, '' ),
			getTitleHoverCSS( attributes, 'Tablet' ),
			getTitleHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-review__rating span`,
			getReviewTextCSS( attributes, '' ),
			getReviewTextCSS( attributes, 'Tablet' ),
			getReviewTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-review__rating .academy-group-star .academy-icon:before`,
			getReviewIconCSS( attributes, '' ),
			getReviewIconCSS( attributes, 'Tablet' ),
			getReviewIconCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--instructors .course-single-instructor .instructor-info__content .instructor-name a`,
			getInstructorCSS( attributes, '' ),
			getInstructorCSS( attributes, 'Tablet' ),
			getInstructorCSS( attributes, 'Mobile' )
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
