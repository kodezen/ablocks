import React, { useEffect, useMemo } from 'react';
import Settings from './settings';
import Render from './render';
import CSSGenerator from '@Utils/css-generator';

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

	const generatedCSS = useMemo( () => {
		const cssGenerator = new CSSGenerator( attributes, clientId );

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
