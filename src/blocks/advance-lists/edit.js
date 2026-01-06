import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	getContainerCSS,
	getParagraphTextCSS,
	getParagraphDropTextCSS,
	get_divider_css,
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
			'{{WRAPPER}}.ablocks-block--advance-lists .ablocks-block-container .block-editor-inner-blocks .block-editor-block-list__layout',
			getContainerCSS( attributes ),
			getContainerCSS( attributes, 'Tablet' ),
			getContainerCSS( attributes, 'Mobile' )
		);

		//text
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-advance-list-item-text',
			getParagraphTextCSS( attributes ),
			getParagraphTextCSS( attributes, 'Tablet' ),
			getParagraphTextCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-block-container .ablocks-advance-list-item-text-drop-caps::first-letter',
			getParagraphDropTextCSS( attributes ),
			getParagraphDropTextCSS( attributes, 'Tablet' ),
			getParagraphDropTextCSS( attributes, 'Mobile' )
		);

		//divider
		cssGenerator.addClassStyles(
			`{{WRAPPER}} .ablocks-advance-list-item-divider__pattern-${
				attributes.dividerType === 'mask-style' ? 'mask' : 'css'
			}`,
			get_divider_css( attributes ),
			get_divider_css( attributes, 'Tablet' ),
			get_divider_css( attributes, 'Mobile' )
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
