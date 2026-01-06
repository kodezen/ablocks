import React, { useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	getInputBlockMainSelected,
	getInputBlockMainWrapper,
	getRadioDynamicWidthCSS,
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
	const cssGenerator = new CSSGenerator( attributes, clientId );
	cssGenerator.addClassStyles(
		`.ablocks-block--child-${ block_id }`,
		getInputBlockMainWrapper( attributes ),
		getInputBlockMainWrapper( attributes, 'Tablet' ),
		getInputBlockMainWrapper( attributes, 'Mobile' )
	);
	if ( isSelected ) {
		cssGenerator.addClassStyles(
			`.ablocks-block--child-${ block_id }`,
			getInputBlockMainSelected( attributes ),
			getInputBlockMainSelected( attributes, 'Tablet' ),
			getInputBlockMainSelected( attributes, 'Mobile' )
		);
	}
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-form-builder__radio-option',
		getRadioDynamicWidthCSS( attributes ),
		getRadioDynamicWidthCSS( attributes, 'Tablet' ),
		getRadioDynamicWidthCSS( attributes, 'Mobile' )
	);
	// Generate CSS using the styling.js file
	const generatedCSS = cssGenerator.generateCSS();

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
