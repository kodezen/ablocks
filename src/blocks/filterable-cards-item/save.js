import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';
import { InnerBlocks } from '@wordpress/block-editor';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, dataCategory } = attributes;

	const lowerCaseDataCategory = dataCategory
		? dataCategory.toLowerCase()
		: '';
	return (
		<React.Fragment>
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ { 'data-category': lowerCaseDataCategory } }
			>
				<InnerBlocks.Content />
			</SaveChildContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
