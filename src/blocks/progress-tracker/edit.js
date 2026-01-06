import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';

import {
	getWrapperCSS,
	getContentCSS,
	getProgressBarTrackCSS,
	getProgressBarCSS,
	getProgressBarHoverCSS,
	getProgressCircleCSS,
	getProgressCircleBgCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id } = attributes;
	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
		if ( ! attributes?.blockVersion ) {
			setAttributes( { blockVersion: 2 } );
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
				cssGenerator = new CSSGenerator2( attributes, clientId );
			} else if (
				attributes?.blockVersion !== 2 &&
				! ( cssGenerator instanceof CSSGenerator )
			) {
				cssGenerator = new CSSGenerator( attributes, clientId );
			}
		} else if ( attributes?.blockVersion === 2 ) {
			cssGenerator = new CSSGenerator2( attributes, clientId );
		} else {
			cssGenerator = new CSSGenerator( attributes, clientId );
		}

		if ( cssGenerator === null ) {
			return '';
		}

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-progress-circle',
			getWrapperCSS( attributes ),
			getWrapperCSS( attributes, 'Tablet' ),
			getWrapperCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-progress__text',
			getContentCSS( attributes ),
			getContentCSS( attributes, 'Tablet' ),
			getContentCSS( attributes, 'Mobile' )
		);

		// bar css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-progress-bar-track ',
			getProgressBarTrackCSS( attributes ),
			getProgressBarTrackCSS( attributes, 'Tablet' ),
			getProgressBarTrackCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-progress-bar-track:hover',
			getProgressBarHoverCSS( attributes ),
			getProgressBarHoverCSS( attributes, 'Tablet' ),
			getProgressBarHoverCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-progress-bar',
			getProgressBarCSS( attributes )
		);

		// circle css
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-progress-circle__svg-bar',
			getProgressCircleCSS( attributes )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-progress-circle__svg-track',
			getProgressCircleBgCSS( attributes )
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
