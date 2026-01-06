import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id } = attributes;

	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<span className="ablocks-block--certificate__verification-id">
				{ '#{{verification_id}}' }
			</span>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
