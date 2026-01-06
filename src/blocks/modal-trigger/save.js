import React from 'react';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveChildContainer from '@Components/block-container/childSave';
const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, hideTrigger } = attributes;

	return hideTrigger ? (
		<></>
	) : (
		<SaveChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<div className="ablocks-modal-trigger-wrap">
				<InnerBlocks.Content />
			</div>
		</SaveChildContainer>
	);
}

Save.propTypes = propTypes;
