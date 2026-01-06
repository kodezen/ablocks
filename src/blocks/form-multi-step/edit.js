import React, { useEffect } from 'react';
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
	}, [ block_id, clientId ] );

	// const { blockParents, hasChildBlocks } = useSelect((select) => {
	// 	const coreBlockEditor = select('core/block-editor');
	// 	return {
	// 		blockParents: coreBlockEditor?.getBlockParents(clientId),
	// 		hasChildBlocks: coreBlockEditor?.getBlockOrder(clientId).length > 0,
	// 	};
	// });

	// Generate CSS
	const cssGenerator = new CSSGenerator( attributes, clientId );

	const generatedCSS = cssGenerator.generateCSS();

	return (
		<>
			<style>{ generatedCSS }</style>
			{ isSelected && <Settings { ...props } /> }
			<Render { ...props } />
		</>
	);
}
