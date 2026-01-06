import React from 'react';
import classNames from 'classnames';
import SaveContainer from '@Components/block-container/save';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, isRootContainer, containerWidthType } = attributes;

	const className = classNames( {
		'ablocks-block--container--is-root': isRootContainer,
		alignfull:
			isRootContainer &&
			( containerWidthType === 'full' || containerWidthType === 'boxed' ),
	} );

	return (
		<React.Fragment>
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ className }
			>
				<InnerBlocks.Content />
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
