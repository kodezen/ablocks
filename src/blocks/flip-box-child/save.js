import React from 'react';
import SaveContainer from '@Components/block-container/save';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, childId } = attributes;
	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ classNames(
					`ablocks-flipbox__${ childId === 1 ? 'front' : 'back' }`
				) }
			>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
