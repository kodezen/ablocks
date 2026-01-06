import React from 'react';
import metadata from './block.json';
import SaveContainer from '@Components/block-container/save2';
import { InnerBlocks } from '@wordpress/block-editor';

const propTypes = {};
const defaultProps = {};

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
				<table>
					<InnerBlocks.Content />
				</table>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
Save.defaultProps = defaultProps;
