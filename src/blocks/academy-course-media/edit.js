import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import CSSGenerator from '@Utils/css-generator';
import CSSGenerator2 from '@Utils/css-generator2';
import Render from './render';
import './editor.scss';
import { getFeaturedImageCSS, getFeaturedImageContainerCSS } from './styling';

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
			`{{WRAPPER}} .academy-default-featured-image,
			{{WRAPPER}} .plyr--video`,
			getFeaturedImageCSS( attributes ),
			getFeaturedImageCSS( attributes, 'Tablet' ),
			getFeaturedImageCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			`{{WRAPPER}}.ablocks-block--academy-course-media:not(.ablocks-block-container),
			{{WRAPPER}}.ablocks-block--academy-course-media .ablocks-block-container `,
			getFeaturedImageContainerCSS( attributes ),
			getFeaturedImageContainerCSS( attributes, 'Tablet' ),
			getFeaturedImageContainerCSS( attributes, 'Mobile' )
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
