import React from 'react';
import SaveChildContainer from '@Components/block-container/childSave';
import metadata from './block.json';

const propTypes = {};

import { InnerBlocks } from '@wordpress/block-editor';
export default function Save( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	return (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<InnerBlocks.Content />
		</SaveChildContainer>
	);
}

Save.propTypes = propTypes;
