import React from 'react';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveChildContainer from '@Components/block-container/childSave';
const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, tabId } = attributes;
	return (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			blockProps={ {
				'data-tab-id': tabId,
			} }
		>
			<InnerBlocks.Content />
		</SaveChildContainer>
	);
}

Save.propTypes = propTypes;
