import React from 'react';
import SaveContainer from '@Components/block-container/save';
import { RichText } from '@wordpress/block-editor';
import metadata from './block.json';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, headingTag } = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<RichText.Content
					tagName={ headingTag }
					className="ablocks-heading-text"
					value={ attributes.heading }
				/>
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
