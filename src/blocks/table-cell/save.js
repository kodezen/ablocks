import React from 'react';
import metadata from './block.json';
import SaveChildContainer from '@Components/block-container/childSave';
import { InnerBlocks } from '@wordpress/block-editor';
const propTypes = {};
const defaultProps = {};
export default function Save( props ) {
	const { attributes } = props;
	const { block_id, rowSpan, colSpan } = attributes;

	return (
		<React.Fragment>
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				tagName="td"
				blockProps={ {
					rowSpan,
					colSpan,
				} }
			>
				<InnerBlocks.Content />
			</SaveChildContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
