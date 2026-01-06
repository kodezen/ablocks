import React, { useEffect } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { MyToolbar } from './toolbar';
import { dispatch, useDispatch, select } from '@wordpress/data';
import './style.css';
const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes, clientId, isSelected } = props;
	const {
		block_id,
		buttonType,
		buttonSize,
		textShadow,
		typography,
		textColor,
		textColorH,
		background,
		backgroundH,
		transition,
		padding,
	} = attributes;

	// InnerBlock template definition
	const innerBlocksTemplate = [
		[ 'ablocks/button', {} ], // Correct template format
		[ 'ablocks/button', {} ],
	];

	const handleNewButton = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		const newButton = createBlock( 'ablocks/button' );
		dispatch( 'core/block-editor' ).insertBlock(
			newButton,
			childBlocks.length,
			block_id
		);
	};

	// Use dispatch to update child block attributes
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );

	// A function to change the first child's attribute
	const changeChildAttribute = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		if ( childBlocks.length > 0 ) {
			// Loop through the child blocks and access their attributes
			childBlocks.forEach( ( childBlock ) => {
				const childBlockId = childBlock.clientId;
				updateBlockAttributes( childBlockId, {
					buttonType,
					buttonSize,
					textShadow,
					typography,
					textColor,
					textColorH,
					background,
					backgroundH,
					padding,
					border: attributes?.border,
					transition,
				} );
			} );
		}
	};
	useEffect( () => {
		if ( isSelected ) {
			changeChildAttribute();
		}
	}, [
		buttonType,
		buttonSize,
		textShadow,
		typography,
		textColor,
		textColorH,
		background,
		backgroundH,
		padding,
		transition,
		attributes?.border,
	] );

	return (
		<React.Fragment>
			<BlockControls>
				<MyToolbar insertButtonBlock={ handleNewButton } />
			</BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [
					{
						fontFamily: attributes.typography?.fontFamily,
						weight: attributes.typography?.weight,
					},
				] }
			>
				<InnerBlocks
					template={ innerBlocksTemplate }
					allowedBlocks={ [ 'ablocks/button' ] }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
