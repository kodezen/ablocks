import React from 'react';
import SaveChildContainer from '@Components/block-container/childSave';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import metadata from './block.json';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	const { innerBlocksProps, children } = useInnerBlocksProps.save();
	return (
		<React.Fragment>
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				{ ...innerBlocksProps }
				className="ablocks-menu-child-mega"
				tagName="ul"
			>
				{ children }
			</SaveChildContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
