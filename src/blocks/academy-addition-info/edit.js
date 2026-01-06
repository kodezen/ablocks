import React, { useState, useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import { applyFilters } from '@wordpress/hooks';

import {
	getHeadingCSS,
	getHeadingHoverCSS,
	getListCSS,
	getListHoverCSS,
	getTabCSS,
	getTabHoverCSS,
	getListActiveCSS,
	getListActiveHoverCSS,
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
			`{{WRAPPER}} .academy-single-course__content-item--benefits .benefits-title`,
			getHeadingCSS( attributes, '' ),
			getHeadingCSS( attributes, 'Tablet' ),
			getHeadingCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--benefits .benefits-title:hover`,
			getHeadingHoverCSS( attributes, '' ),
			getHeadingHoverCSS( attributes, 'Tablet' ),
			getHeadingHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--benefits .benefits-content ul li span,
			{{WRAPPER}} .academy-tabs-content .academy-lists li span`,
			getListCSS( attributes, '' ),
			getListCSS( attributes, 'Tablet' ),
			getListCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--benefits .benefits-content ul li span:hover,
			{{WRAPPER}} .academy-tabs-content .academy-lists li span:hover`,
			getListHoverCSS( attributes, '' ),
			getListHoverCSS( attributes, 'Tablet' ),
			getListHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--additional-info .academy-tabs-nav li a`,
			getTabCSS( attributes, '' ),
			getTabCSS( attributes, 'Tablet' ),
			getTabCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-single-course__content-item--additional-info .academy-tabs-nav li a:hover`,
			getTabHoverCSS( attributes, '' ),
			getTabHoverCSS( attributes, 'Tablet' ),
			getTabHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-tabs-nav li.active`,
			getListActiveCSS( attributes, '' ),
			getListActiveCSS( attributes, 'Tablet' ),
			getListActiveCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .academy-tabs-nav li.active:hover`,
			getListActiveHoverCSS( attributes, '' ),
			getListActiveHoverCSS( attributes, 'Tablet' ),
			getListActiveHoverCSS( attributes, 'Mobile' )
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
