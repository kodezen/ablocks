import React from 'react';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
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
			<div className="ablocks-block--certificate__background-image">
				<div className="ablocks-block--certificate__background-image-inner-block">
					<InnerBlocks.Content />
				</div>
			</div>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
