import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render';
import { InnerBlocks } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useDispatch, select } from '@wordpress/data';
import metadata from './block.json';
import CustomToolbar from './toolbar';
const propTypes = {};

export default function Render( props ) {
	const { attributes, clientId, isSelected } = props;
	const {
		block_id,
		iconAlignment,
		emoji,
		shapeType,
		shapeColor,
		shapeSize,
		alignment,
		markerType,
		allowDivider,
		listsDirection,
		innerGap,
		advanceListItemTextSize,
		textColor,
		advanceListItemTextTag,
		dropCaps,
		dropCapsTextColor,
		dividerType,
	} = attributes;

	const validateAttributes = ( changedAttributes, attObj ) => {
		const storedAttributes = [
			'iconAlignment',
			'emoji',
			'shapeType',
			'shapeColor',
			'shapeSize',
		];
		storedAttributes.forEach( ( item ) => {
			if ( changedAttributes.includes( item ) === false ) {
				attObj[ item ] = attributes[ item ];
			}
		} );
		return attObj;
	};

	const innerBlocksTemplate = [
		[ 'ablocks/advance-list-item', {} ],
		[ 'ablocks/advance-list-item', {} ],
		[ 'ablocks/advance-list-item', {} ],
	];
	// Use dispatch to update child block attributes
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	// const check = true;

	// A function to change the first child's attribute
	const changeChildAttribute = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		if ( childBlocks.length > 0 ) {
			// Loop through the child blocks and access their attributes
			childBlocks.forEach( ( childBlock ) => {
				let attObj = {
					markerType,
					allowDivider,
					alignment,
					listsDirection,
					innerGap,
					advanceListItemTextSize,
					textColor,
					advanceListItemTextTag,
					dropCaps,
					dropCapsTextColor,
					dividerType,
				};
				attObj = validateAttributes(
					childBlock.attributes.changedAttributes,
					attObj
				);
				const childBlockId = childBlock.clientId;
				updateBlockAttributes( childBlockId, attObj );
			} );
		}
	};
	useEffect( () => {
		if ( isSelected ) {
			changeChildAttribute();
		}
	}, [
		iconAlignment,
		emoji,
		shapeType,
		shapeColor,
		shapeSize,
		markerType,
		allowDivider,
		alignment,
		listsDirection,
		innerGap,
		advanceListItemTextSize,
		textColor,
		advanceListItemTextTag,
		dropCaps,
		dropCapsTextColor,
		dividerType,
	] );

	const handleNewMenuItem = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		const newList = createBlock( 'ablocks/advance-list-item' );
		dispatch( 'core/block-editor' ).insertBlock(
			newList,
			childBlocks.length,
			block_id
		);
		changeChildAttribute();
	};

	return (
		<React.Fragment>
			<CustomToolbar handleNewMenuItem={ handleNewMenuItem } />
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
					allowedBlocks={ [ 'ablocks/advance-list-item' ] }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
