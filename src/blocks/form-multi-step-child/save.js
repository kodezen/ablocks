import React from 'react';
import SaveChildContainer from '@Components/block-container/childSave';
import metadata from './block.json';

import { useInnerBlocksProps } from '@wordpress/block-editor';
export default function Save( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	const innerBlockProps = useInnerBlocksProps.save( {
		className: 'ablocks-form-multi-step-child',
	} );
	return (
		<React.Fragment>
			<SaveChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div { ...innerBlockProps }></div>
			</SaveChildContainer>
		</React.Fragment>
	);
}
