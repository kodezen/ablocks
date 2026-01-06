import React, { useEffect, useState } from 'react';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { select } from '@wordpress/data';
const Render = ( props ) => {
	const { attributes, clientId } = props;
	const { block_id } = attributes;
	const [ isEven, setIsEven ] = useState( false );

	// Determine the block's position in its parent
	useEffect( () => {
		const parentBlockId =
			select( 'core/block-editor' ).getBlockRootClientId( clientId );
		const blockIndex = select( 'core/block-editor' ).getBlockIndex(
			clientId,
			parentBlockId
		);
		setIsEven( blockIndex % 2 === 0 );
	}, [ clientId ] );

	// Inner blocks setup
	const innerBlocksTemplate = [ [ 'ablocks/table-cell', {} ] ];
	const { children } = useInnerBlocksProps(
		{ className: 'ablocks-table-row' },
		{
			template: innerBlocksTemplate,
			allowedBlocks: [ 'ablocks/table-cell' ],
			renderAppender: false,
		}
	);
	return (
		<>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				tagName="tr"
				className={ `ablocks-block--table-row ${
					isEven
						? 'ablocks-table-row--even'
						: 'ablocks-table-row--odd'
				}` }
			>
				{ children }
			</RenderChildContainer>
		</>
	);
};

export default Render;
