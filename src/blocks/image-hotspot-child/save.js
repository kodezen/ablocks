import React from 'react';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save';

const propTypes = {};
const defaultProps = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	return (
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<InnerBlocks.Content />
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
