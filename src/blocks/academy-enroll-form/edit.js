import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getStartButtonCss,
	getStartButtonHoverCss,
	getEnrollButtonCss,
	getEnrollButtonHoverCss,
	getMassageTitleCSS,
	getPriceCSS,
	getModalListHoverCSS,
	getModalListCSS,
	getModalCSS,
	getPriceTitleHoverCSS,
	getPriceTitleCSS,
	getEnrollInfoCSS,
	getEnrollInfoHoverCSS,
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

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form .academy-widget-enroll__continue a,
			{{WRAPPER}} .academy-widget-enroll__continue .academy-btn,
			{{WRAPPER}} .academy-enroll-form-shortcode__continue a`,
			getStartButtonCss( attributes ),
			getStartButtonCss( attributes, 'Tablet' ),
			getStartButtonCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form .academy-widget-enroll__continue a:hover,
			{{WRAPPER}} .academy-widget-enroll__continue .academy-btn:hover,
			{{WRAPPER}} .academy-enroll-form-shortcode__continue a:hover`,
			getStartButtonHoverCss( attributes ),
			getStartButtonHoverCss( attributes, 'Tablet' ),
			getStartButtonHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form .academy-widget-enroll__enroll-form button,
			{{WRAPPER}} .academy-enroll-form-shortcode__prerequisite-button,
			{{WRAPPER}} .academy-enroll-form-shortcode__button,
			{{WRAPPER}} .academy-enroll-form-shortcode .academy-course-enroll-form .academy-btn--bg-purple,
			{{WRAPPER}} .academy-widget-enroll__enroll-form .academy-btn,
			{{WRAPPER}} .academy-add-to-cart-button button,
			{{WRAPPER}} .academy-widget-enroll__add-to-cart form button,
			{{WRAPPER}} .academy-widget-enroll__complete-form .academy-btn`,
			getEnrollButtonCss( attributes ),
			getEnrollButtonCss( attributes, 'Tablet' ),
			getEnrollButtonCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form .academy-widget-enroll__enroll-form button:hover,
			{{WRAPPER}} .academy-enroll-form-shortcode__prerequisite-button:hover,
			{{WRAPPER}} .academy-enroll-form-shortcode__button:hover,
			{{WRAPPER}} .academy-enroll-form-shortcode .academy-course-enroll-form .academy-btn--bg-purple:hover,
			{{WRAPPER}} .academy-widget-enroll__enroll-form .academy-btn:hover,
			{{WRAPPER}} .academy-add-to-cart-button button:hover,
			{{WRAPPER}} .academy-widget-enroll__add-to-cart form button:hover,
			{{WRAPPER}} .academy-widget-enroll__complete-form .academy-btn:hover`,
			getEnrollButtonHoverCss( attributes, '' ),
			getEnrollButtonHoverCss( attributes, 'Tablet' ),
			getEnrollButtonHoverCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form-shortcode__prerequisite .academy-shortcode-prerequisites-message`,
			getMassageTitleCSS( attributes ),
			getMassageTitleCSS( attributes, 'Tablet' ),
			getMassageTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form-shortcode__prerequisite`,
			getModalCSS( attributes ),
			getModalCSS( attributes, 'Tablet' ),
			getModalCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form-shortcode__prerequisite .academy-shortcode-prerequisites-lists a`,
			getModalListCSS( attributes ),
			getModalListCSS( attributes, 'Tablet' ),
			getModalListCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__prerequisites .academy-prerequisites-lists li a:hover`,
			getModalListHoverCSS( attributes, '' ),
			getModalListHoverCSS( attributes, 'Tablet' ),
			getModalListHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-enroll-form-shortcode__price,
			{{WRAPPER}} .academy-widget-enroll__head .academy-course-type,
			{{WRAPPER}} .academy-widget-enroll__head .academy-course-price del,
			{{WRAPPER}} .academy-widget-enroll__head .academy-course-price ins`,
			getPriceCSS( attributes, '' ),
			getPriceCSS( attributes, 'Tablet' ),
			getPriceCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__head .title`,
			getPriceTitleCSS( attributes, '' ),
			getPriceTitleCSS( attributes, 'Tablet' ),
			getPriceTitleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__head .title:hover`,
			getPriceTitleHoverCSS( attributes, '' ),
			getPriceTitleHoverCSS( attributes, 'Tablet' ),
			getPriceTitleHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__enrolled-info`,
			getEnrollInfoCSS( attributes, '' ),
			getEnrollInfoCSS( attributes, 'Tablet' ),
			getEnrollInfoCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__enrolled-info:hover`,
			getEnrollInfoHoverCSS( attributes, '' ),
			getEnrollInfoHoverCSS( attributes, 'Tablet' ),
			getEnrollInfoHoverCSS( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.academy-enroll-form.editorInlineCSS`,
			null,
			attributes,
			cssGenerator
		);
		if ( editorInlineCSSExtend ) {
			return editorInlineCSSExtend;
		}

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
