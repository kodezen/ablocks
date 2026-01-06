import React, { useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';

import {
	getIconSpaceCSS,
	getIconWrapperCSS,
	getInputBlockMainSelected,
	getInputBlockMainWrapper,
	getPasswordShowHideIconWrapperCSS,
} from './styling';
export default function Edit( props ) {
	const { isSelected, attributes, setAttributes, clientId } = props;
	const { block_id, name } = attributes;

	useEffect( () => {
		if ( ! block_id || block_id !== clientId ) {
			setAttributes( {
				block_id: clientId,
			} );
		}
	}, [ block_id, clientId ] );

	useEffect( () => {
		setAttributes( {
			name: name !== 'confirm_password' ? 'password' : 'confirm_password',
		} );
	}, [ name ] );
	// Generate CSS
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
		'{{WRAPPER}} .ablocks-form-builder__input-icon .ablocks-icon-wrap',
		getIconWrapperCSS( attributes ),
		getIconWrapperCSS( attributes, 'Tablet' ),
		getIconWrapperCSS( attributes, 'Mobile' )
	);
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-form-builder__input-show-icon',
		getIconSpaceCSS( attributes ),
		getIconSpaceCSS( attributes, 'Tablet' ),
		getIconSpaceCSS( attributes, 'Mobile' )
	);
	cssGenerator.addClassStyles(
		'{{WRAPPER}} .ablocks-form-builder__input-toggle-password .ablocks-icon-wrap ',
		getPasswordShowHideIconWrapperCSS( attributes )
	);
	const generatedCSS = cssGenerator.generateCSS();

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
