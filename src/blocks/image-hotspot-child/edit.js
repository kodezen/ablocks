import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	getActiveContentCSS,
	getActiveContentHoverCSS,
	getActiveContentParentCSS,
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
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );

		// ablocks-block-9a5cb197-454e-4a8d-a089-51f8edb97eaf

		cssGenerator.addClassStyles(
			'{{WRAPPER}}',
			getActiveContentParentCSS( attributes ),
			getActiveContentParentCSS( attributes, 'Tablet' ),
			getActiveContentParentCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-hotspot__tooltip--active',
			getActiveContentCSS( attributes ),
			getActiveContentCSS( attributes, 'Tablet' ),
			getActiveContentCSS( attributes, 'Mobile' )
		);

		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-image-hotspot__tooltip--active:hover',
			getActiveContentHoverCSS( attributes ),
			getActiveContentHoverCSS( attributes, 'Tablet' ),
			getActiveContentHoverCSS( attributes, 'Mobile' )
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
