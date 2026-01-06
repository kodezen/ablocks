import React from 'react';
import SaveContainer from '@Utils/deprecated/block-container/save';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, isRootContainer, containerWidthType } = attributes;
	const className = `ablocks-block--container--${ containerWidthType }${
		isRootContainer ? ' ablocks-block--container--is-root' : ''
	}`;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ `${ className.trim() }` }
			>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
