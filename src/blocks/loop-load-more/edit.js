import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	LoopLoadMoreWrapper,
	LoopLoadMoreButton,
	LoopLoadMoreButtonHover,
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
	}, [ block_id, clientId ] );
	// Generate CSS
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );
		cssGenerator.addClassStyles(
			'{{WRAPPER}}',
			LoopLoadMoreWrapper( attributes ),
			LoopLoadMoreWrapper( attributes, 'Tablet' ),
			LoopLoadMoreWrapper( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-load-more__text',
			LoopLoadMoreButton( attributes ),
			LoopLoadMoreButton( attributes, 'Tablet' ),
			LoopLoadMoreButton( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-load-more__text:hover',
			LoopLoadMoreButtonHover( attributes ),
			LoopLoadMoreButtonHover( attributes, 'Tablet' ),
			LoopLoadMoreButtonHover( attributes, 'Mobile' )
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
