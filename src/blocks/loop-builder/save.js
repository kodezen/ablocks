import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function save( props ) {
	const { attributes } = props;
	const { tagName: Tag = 'div' } = attributes;
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save( blockProps );
	const { block_id } = attributes;

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<Tag { ...innerBlocksProps } />
			</SaveContainer>
		</React.Fragment>
	);
}
