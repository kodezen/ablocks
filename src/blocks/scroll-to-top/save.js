import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import metadata from './block.json';
import RenderContent from './RenderContent';
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
				{ RenderContent( attributes ) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
