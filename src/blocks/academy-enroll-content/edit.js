import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getContentCSS,
	getContentIconCSS,
	getContentListCSS,
	getShareButtonListCSS,
	getWishlistButtonCSS,
	getButtonIconCSS,
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
			`{{WRAPPER}} .academy-widget-enroll__content-lists`,
			getContentCSS( attributes, '' ),
			getContentCSS( attributes, 'Tablet' ),
			getContentCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__content-lists li .academy-icon,
			{{WRAPPER}} .academy-icon--level:before,
			{{WRAPPER}} .academy-icon--video-lesson:before`,
			getContentIconCSS( attributes, '' ),
			getContentIconCSS( attributes, 'Tablet' ),
			getContentIconCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__content-lists li`,
			getContentListCSS( attributes, '' ),
			getContentListCSS( attributes, 'Tablet' ),
			getContentListCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__wishlist-and-share .academy-btn`,
			getShareButtonListCSS( attributes, '' ),
			getShareButtonListCSS( attributes, 'Tablet' ),
			getShareButtonListCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__wishlist-and-share .academy-course__wishlist`,
			getWishlistButtonCSS( attributes, '' ),
			getWishlistButtonCSS( attributes, 'Tablet' ),
			getWishlistButtonCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-widget-enroll__wishlist-and-share .academy-btn i.academy-icon`,
			getButtonIconCSS( attributes, '' ),
			getButtonIconCSS( attributes, 'Tablet' ),
			getButtonIconCSS( attributes, 'Mobile' )
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
