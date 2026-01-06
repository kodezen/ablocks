import React, { useEffect } from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import { useSelect, select as dataSelect } from '@wordpress/data';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import { getBlockTypes } from '@wordpress/blocks';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { block_id, tabId } = attributes;

	const blockIndex = useSelect( ( select ) =>
		select( 'core/block-editor' ).getBlockIndex( clientId )
	);

	useEffect( () => {
		if ( tabId !== blockIndex ) {
			setAttributes( {
				tabId: blockIndex,
			} );
		}
	}, [ blockIndex, clientId ] );
	const hasChildBlocks =
		dataSelect( 'core/block-editor' ).getBlockOrder( clientId ).length > 0;
	const innerBlocksProps = {
		renderAppender: hasChildBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
		allowedBlocks: getBlockTypes()
			.filter( ( item ) => ! item.parent )
			.map( ( block ) => block.name ),
	};

	return (
		<React.Fragment>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					'data-tab-id': tabId,
				} }
			>
				<InnerBlocks { ...innerBlocksProps } />
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
