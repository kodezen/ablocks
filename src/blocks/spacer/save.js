import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';

export default function Save( { attributes } ) {
	const { block_id, spacerHeight } = attributes;

	// Destructure height value and unit with default values
	const heightValue = spacerHeight?.value || 0;

	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<div
				className="ablocks-spacer__box"
				style={ {
					height: `${ heightValue }px`,
					width: '100%',
				} }
			></div>
		</SaveContainer>
	);
}
