import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	filterButtonAlignment,
	getNormalButtonStyle,
	getNormalHoverButtonStyle,
	getACtivebButtonStyle,
	getActiveButtonStyleHover,
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
			filterButtonAlignment( attributes ),
			filterButtonAlignment( attributes, 'Tablet' ),
			filterButtonAlignment( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-term-filter',
			getNormalButtonStyle( attributes ),
			getNormalButtonStyle( attributes, 'Tablet' ),
			getNormalButtonStyle( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-term-filter:hover',
			getNormalHoverButtonStyle( attributes ),
			getNormalHoverButtonStyle( attributes, 'Tablet' ),
			getNormalHoverButtonStyle( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-term-filter--active',
			getACtivebButtonStyle( attributes ),
			getACtivebButtonStyle( attributes, 'Tablet' ),
			getACtivebButtonStyle( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-term-filter--active:hover',
			getActiveButtonStyleHover( attributes ),
			getActiveButtonStyleHover( attributes, 'Tablet' ),
			getActiveButtonStyleHover( attributes, 'Mobile' )
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
