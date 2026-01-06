import React, { useEffect, useMemo } from 'react';
import CSSGenerator from '@Utils/css-generator';
import Settings from './settings';
import Render from './render';
import CSSGenerator2 from '@Utils/css-generator2';
import {
	getWrapperCSS,
	getTextPathContainerCSS,
	getTextCSS,
	getTextHoverCSS,
	getTextPathCSS,
} from './styling';

export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, block_id, clientId } = props;

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
			'{{WRAPPER}}.ablocks-block--text-path .ablocks-block-container',
			getTextPathContainerCSS( attributes ),
			getTextPathContainerCSS( attributes, 'Tablet' ),
			getTextPathContainerCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-text-path-text',
			getTextCSS( attributes ),
			getTextCSS( attributes, 'Tablet' ),
			getTextCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-text-path-text:hover',
			getTextHoverCSS( attributes ),
			getTextHoverCSS( attributes, 'Tablet' ),
			getTextHoverCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-path-text-path',
			getTextPathCSS( attributes, '' ),
			getTextPathCSS( attributes, 'Tablet' ),
			getTextPathCSS( attributes, 'Mobile' )
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
