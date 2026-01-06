import React, { useMemo, useEffect } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';
import {
	loopTemplateWrapper,
	templateCardStyleCSS,
	templateCardStyleHoverCSS,
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

	// Temporary approch instead of attribute migration. Might remove it in future
	useEffect( () => {
		console.log( 'attributes.gridColumns', attributes.gridColumns );
		if (
			attributes.gridColumns !== '' &&
			Number( attributes.gridColumns ) !== 2
		) {
			console.log( 'here' );
			const tempTemplateGridColumns = {
				value: '',
				valueTablet: 2,
				valueMobile: 1,
			};
			tempTemplateGridColumns.value = Number( attributes.gridColumns );
			setAttributes( { templateGridColumns: tempTemplateGridColumns } );
			setAttributes( { gridColumns: '' } );
		}
	}, [] );
	// Temporary approch instead of attribute migration. Might remove it in future

	// Generate CSS
	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .wp-block-ablocks-loop-template ',
			loopTemplateWrapper( attributes ),
			loopTemplateWrapper( attributes, 'Tablet' ),
			loopTemplateWrapper( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-template-item',
			templateCardStyleCSS( attributes ),
			templateCardStyleCSS( attributes, 'Tablet' ),
			templateCardStyleCSS( attributes, 'Mobile' )
		);
		cssGenerator.addClassStyles(
			'{{WRAPPER}} .ablocks-loop-template-item:hover',
			templateCardStyleHoverCSS( attributes ),
			templateCardStyleHoverCSS( attributes, 'Tablet' ),
			templateCardStyleHoverCSS( attributes, 'Mobile' )
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
