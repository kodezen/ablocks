import React from 'react';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import {
	useBlockProps,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';
import { select } from '@wordpress/data';
import { getBlockTypes } from '@wordpress/blocks';
const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes, clientId } = props;
	const { block_id } = attributes;

	const blockProps = useBlockProps();

	const hasChildBlocks =
		select( 'core/block-editor' ).getBlockOrder( clientId ).length > 0;
	const innerBlocksObj = {
		renderAppender: hasChildBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
		allowedBlocks: getBlockTypes()
			.filter( ( item ) => ! item.parent )
			.map( ( block ) => block.name ),
	};
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		...innerBlocksObj,
	} );

	return (
		<div className="swiper-slide ablocks-carousel-swiper-slide">
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div { ...innerBlocksProps }></div>
			</RenderChildContainer>
		</div>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
