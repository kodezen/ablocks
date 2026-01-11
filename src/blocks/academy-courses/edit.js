import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

import {
	getCourseCardCategoryCss,
	getCourseCardTitleCss,
	getCourseCardAuthorCss,
	getCourseCardRatingCss,
	getCourseCardPriceCss,
	getCourseCardCss,
	getCourseCardHoverCss,
	getWishListIconCss,
	getWishListIconHoverCss,
	courseCardCategoryDesktopHoverCss,
	courseCardTitleDesktopHoverCss,
	courseCardAuthorDesktopHoverCss,
	courseCardRatingDesktopHoverCss,
	courseCardPriceDesktopHoverCss,
} from './styling';

import './editor.scss';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const {
		block_id,
		category_color,
		category_hover_color,
		title_color,
		title_hover_color,
		author_color,
		author_hover_color,
		rating_color,
		rating_hover_color,
		price_color,
		price_hover_color,
	} = attributes;

	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
	}, [ block_id, clientId ] );

	const [ academyTerms, setAcademyTerms ] = useState( {} );

	useEffect( () => {
		if ( academyTerms?.categories && academyTerms?.tags ) {
			return false;
		}
		jQuery.post(
			window.ajaxurl,
			{
				action: 'ablocks/get_academy_terms',
				security: window.ABlocksGlobal.nonce,
			},
			( data, status ) => {
				if ( 'success' === status ) {
					const { categories = [], tags = [] } = data?.data || {};
					const terms = {
						categories,
						tags,
					};
					setAcademyTerms( terms );
				}
			}
		);
	}, [] ); // eslint-disable-line react-hooks/exhaustive-deps

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
			'{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__meta--categroy a',
			getCourseCardCategoryCss( attributes ),
			getCourseCardCategoryCss( attributes, 'Tablet' ),
			getCourseCardCategoryCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__meta--categroy:hover a',
			courseCardCategoryDesktopHoverCss( attributes )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__title, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__title a`,
			getCourseCardTitleCss( attributes ),
			getCourseCardTitleCss( attributes, 'Tablet' ),
			getCourseCardTitleCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__title:hover, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__title:hover a`,
			courseCardTitleDesktopHoverCss( attributes )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__author, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__author .author, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__author .author a`,
			getCourseCardAuthorCss( attributes ),
			getCourseCardAuthorCss( attributes, 'Tablet' ),
			getCourseCardAuthorCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__author:hover, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__author:hover .author, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__author:hover .author a`,
			courseCardAuthorDesktopHoverCss( attributes )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating,
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating .academy-group-star, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating .academy-group-star .academy-icon::before, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating .academy-course__rating-count`,
			getCourseCardRatingCss( attributes, 'Tablet' ),
			getCourseCardRatingCss( attributes, 'Tablet' ),
			getCourseCardRatingCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating:hover,
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating:hover .academy-group-star, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating:hover .academy-group-star .academy-icon::before, 
			{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__rating:hover .academy-course__rating-count`,
			courseCardRatingDesktopHoverCss( attributes )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-row .academy-course,
			{{WRAPPER}} .academy-courses--grid .academy-row .academy-course, 
			{{WRAPPER}} .academy-courses--grid .academy-row .academy-course, 
			{{WRAPPER}} .academy-courses--grid .academy-row .academy-course`,
			getCourseCardCss( attributes ),
			getCourseCardCss( attributes, 'Tablet' ),
			getCourseCardCss( attributes, 'Tablet' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-courses--grid .academy-row .academy-course:hover,
			{{WRAPPER}} .academy-courses--grid .academy-row .academy-course:hover,
			{{WRAPPER}} .academy-courses--grid .academy-row .academy-course:hover,
			{{WRAPPER}} .academy-courses--grid .academy-row .academy-course:hover`,
			getCourseCardHoverCss( attributes ),
			getCourseCardHoverCss( attributes, 'Tablet' ),
			getCourseCardHoverCss( attributes, 'Tablet' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__price',
			getCourseCardPriceCss( attributes ),
			getCourseCardPriceCss( attributes, 'Tablet' ),
			getCourseCardPriceCss( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-courses--grid .academy-course .academy-course__price:hover',
			courseCardPriceDesktopHoverCss( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-courses .academy-course__header .academy-course-header-meta .academy-course__wishlist',
			getWishListIconCss( attributes ),
			getWishListIconCss( attributes, 'Tablet' ),
			getWishListIconCss( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .academy-courses .academy-course__header .academy-course-header-meta .academy-course__wishlist:hover',
			getWishListIconHoverCss( attributes ),
			getWishListIconHoverCss( attributes, 'Tablet' ),
			getWishListIconHoverCss( attributes, 'Mobile' )
		);

		// eslint-disable-next-line
		let editorInlineCSSExtend = applyFilters(
			`ablocks.academy-courses.editorInlineCSS`,
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
			{ isSelected && (
				<Settings academyTerms={ academyTerms } { ...props } />
			) }
			<Render { ...props } />
		</>
	);
}
