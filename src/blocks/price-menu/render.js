import React, { useEffect } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { InnerBlocks, BlockControls } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useDispatch, select } from '@wordpress/data';
import GetDeviceType from '@Utils/get-device-type';
import './style.css';
const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes, clientId, isSelected } = props;
	const {
		block_id,
		device,
		alignment,
		itemsDirection,
		allowIcon,
		allowDescription,
		allowDivider,
		titleTag,
		titleAlignment,
		descriptionTag,
		descriptionAlignment,
		placeDivider,
		dividerType,
		gap,
		placePrice,
		priceTag,
		priceAlignment,
	} = attributes;

	const newDevice = GetDeviceType();

	useEffect( () => {
		setAttributes( { device: newDevice } );
	}, [ newDevice ] );

	// InnerBlocks template definition
	const innerBlocksTemplate = [
		[ 'ablocks/price-menu-item', {} ], // Correct template format
		[ 'ablocks/price-menu-item', {} ],
		[ 'ablocks/price-menu-item', {} ],
	];
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
					alignment,
					itemsDirection,
					allowIcon,
					allowDescription,
					allowDivider,
					titleTag,
					titleAlignment,
					descriptionTag,
					descriptionAlignment,
					placeDivider,
					dividerType,
					gap,
					placePrice,
					priceTag,
					priceAlignment,
				} );
			} );
		}
	};

	// Function to handle inserting a new price-menu-item block
	const handleNewMenuItem = () => {
		const childBlocks = select( 'core/block-editor' ).getBlocks( clientId );
		const newPriceMenu = createBlock( 'ablocks/price-menu-item' );
		dispatch( 'core/block-editor' ).insertBlock(
			newPriceMenu,
			childBlocks.length,
			block_id
		);
		changeChildAttribute();
	};

	useEffect( () => {
		if ( isSelected ) {
			changeChildAttribute();
		}
	}, [
		alignment,
		itemsDirection,
		allowIcon,
		allowDescription,
		allowDivider,
		titleTag,
		titleAlignment,
		descriptionTag,
		descriptionAlignment,
		placeDivider,
		dividerType,
		gap,
		placePrice,
		priceTag,
		priceAlignment,
	] );

	useEffect( () => {
		if ( alignment[ 'value' + device ] === 'flex-start' ) {
			titleAlignment[ 'value' + device ] = 'left';
			descriptionAlignment[ 'value' + device ] = 'left';
			priceAlignment[ 'value' + device ] = 'left';
		} else if ( alignment[ 'value' + device ] === 'flex-end' ) {
			titleAlignment[ 'value' + device ] = 'right';
			descriptionAlignment[ 'value' + device ] = 'right';
			priceAlignment[ 'value' + device ] = 'right';
		} else if ( alignment[ 'value' + device ] === 'center' ) {
			titleAlignment[ 'value' + device ] = 'center';
			descriptionAlignment[ 'value' + device ] = 'center';
			priceAlignment[ 'value' + device ] = 'center';
		}
	}, [ alignment ] );

	return (
		<React.Fragment>
			<BlockControls></BlockControls>
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
					allowedBlocks={ [ 'ablocks/price-menu-item' ] }
				/>
				<button
					className="ablocks-price-menu-add-button"
					onClick={ handleNewMenuItem }
				>
					<span className="ablocks-icon ablocks-icon--plus"></span>
					Add Item
				</button>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
