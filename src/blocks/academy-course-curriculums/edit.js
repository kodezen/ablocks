import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator';
import { applyFilters } from '@wordpress/hooks';

import {
	getCurriculumHeadingCSS,
	getCurriculumHeadingHoverCSS,
	getSubCurriculumCSS,
	getSubCurriculumHoverCSS,
	getLessonTitleCSS,
	getLessonTitleHoverCSS,
	getLessonListCSS,
	getLessonListHoverCSS,
	getIconHoverCSS,
	getIconCSS,
	getIconReadCSS,
	getIconReadHoverCSS,
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
			`{{WRAPPER}} .academy-single-course__content-item--curriculum .academy-curriculum-title`,
			getCurriculumHeadingCSS( attributes, '' ),
			getCurriculumHeadingCSS( attributes, 'Tablet' ),
			getCurriculumHeadingCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--curriculum .academy-curriculum-title:hover`,
			getCurriculumHeadingHoverCSS( attributes, '' ),
			getCurriculumHeadingHoverCSS( attributes, 'Tablet' ),
			getCurriculumHeadingHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-accordion a.academy-accordion__title`,
			getSubCurriculumCSS( attributes, '' ),
			getSubCurriculumCSS( attributes, 'Tablet' ),
			getSubCurriculumCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-accordion a.academy-accordion__title:hover`,
			getSubCurriculumHoverCSS( attributes, '' ),
			getSubCurriculumHoverCSS( attributes, 'Tablet' ),
			getSubCurriculumHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item .academy-entry-content .academy-entry-title`,
			getLessonTitleCSS( attributes, '' ),
			getLessonTitleCSS( attributes, 'Tablet' ),
			getLessonTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item .academy-entry-content .academy-entry-title:hover`,
			getLessonTitleHoverCSS( attributes, '' ),
			getLessonTitleHoverCSS( attributes, 'Tablet' ),
			getLessonTitleHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item`,
			getLessonListCSS( attributes, '' ),
			getLessonListCSS( attributes, 'Tablet' ),
			getLessonListCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item:hover`,
			getLessonListHoverCSS( attributes, '' ),
			getLessonListHoverCSS( attributes, 'Tablet' ),
			getLessonListHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item .academy-entry-control .academy-btn-play i`,
			getIconCSS( attributes, '' ),
			getIconCSS( attributes, 'Tablet' ),
			getIconCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item .academy-entry-control .academy-btn-play i:hover`,
			getIconHoverCSS( attributes, '' ),
			getIconHoverCSS( attributes, 'Tablet' ),
			getIconHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item .academy-entry-content .academy-icon::before`,
			getIconReadCSS( attributes, '' ),
			getIconReadCSS( attributes, 'Tablet' ),
			getIconReadCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-lesson-list__item .academy-entry-content .academy-icon::before`,
			getIconReadHoverCSS( attributes, '' ),
			getIconReadHoverCSS( attributes, 'Tablet' ),
			getIconReadHoverCSS( attributes, 'Mobile' )
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
