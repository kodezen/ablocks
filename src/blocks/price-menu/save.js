import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
