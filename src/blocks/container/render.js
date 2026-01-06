import React, { useEffect } from 'react';
import { getBlockTypes, createBlock } from '@wordpress/blocks';
import RenderContainer from '@Components/block-container/render2';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import { ShapeContainer } from './helper';
import { getRenderDomElement } from '@Utils/helper';

import './style.css';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, hasChildBlocks, className, clientId } =
		props;
	const { block_id, gridColumn, gridRow, layout, shapeTop, shapeBottom } =
		attributes;
	const innerBlocksProps = {
		renderAppender:
			layout === 'grid'
				? false
				: hasChildBlocks
				? undefined
				: InnerBlocks.ButtonBlockAppender,
		allowedBlocks: getBlockTypes()
			.filter( ( item ) => ! item.parent )
			.map( ( block ) => block.name ),
	};

	useEffect( () => {
		if ( layout === 'grid' ) {
			const innerBlocks = wp.data
				.select( 'core/block-editor' )
				.getBlocks( clientId );
			const expectedBlocksCount = gridColumn.value * gridRow.value;

			if ( innerBlocks.length !== expectedBlocksCount ) {
				if ( innerBlocks.length > expectedBlocksCount ) {
					const blocksToRemove =
						innerBlocks.slice( expectedBlocksCount );
					blocksToRemove.forEach( ( block ) => {
						wp.data
							.dispatch( 'core/block-editor' )
							.removeBlock( block.clientId );
					} );
				}
				if ( innerBlocks.length < expectedBlocksCount ) {
					const blocksToAdd = Array.from(
						{ length: expectedBlocksCount - innerBlocks.length },
						() => createBlock( 'ablocks/container', {} )
					);
					wp.data
						.dispatch( 'core/block-editor' )
						.insertBlocks(
							blocksToAdd,
							innerBlocks.length,
							clientId
						);
				}
				wp.data.dispatch( 'core/block-editor' ).selectBlock( clientId );
			}
		}
	}, [ clientId, gridColumn, gridRow ] );

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [] }
				className={ className }
			>
				<ShapeContainer position="top" shape={ shapeTop } />
				<ShapeContainer position="bottom" shape={ shapeBottom } />
				<InnerBlocks { ...innerBlocksProps } />
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
