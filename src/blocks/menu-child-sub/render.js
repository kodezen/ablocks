import React, { useCallback } from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { dispatch } from '@wordpress/data';
import metadata from './block.json';

const propTypes = {};

export default function Render( props ) {
	const { attributes, clientId } = props;
	const {
		block_id,
		menuItemTypography,
		menuItemTextColor,
		menuItemTextColorH,
		menuItemBackgroundH,
		menuItemBackground,
		menuItemPadding,
		menuItemMargin,
		menuItemBorder,
		menuItemDisplay,
		menuItemDirection,
		menuItemDirectionTablet,
		menuItemDirectionMobile,
		menuItemJustification,
		menuItemAlign,
		menuItemAlignTablet,
		menuItemAlignMobile,
	} = attributes;
	const innerBlocksUpdatedAttributes = {
		typography: menuItemTypography,
		textColor: menuItemTextColor,
		textColorH: menuItemTextColorH,
		background: menuItemBackground,
		backgroundH: menuItemBackgroundH,
		padding: menuItemPadding,
		border: menuItemBorder,
		margin: menuItemMargin,
		display: menuItemDisplay,

		direction: menuItemDirection,
		directionTablet: menuItemDirectionTablet,
		directionMobile: menuItemDirectionMobile,

		justify: menuItemJustification,
		justifyMobile: menuItemJustification.valueMobile,
		justifyTablet: menuItemJustification.valueTablet,

		align: menuItemAlign,
		alignTablet: menuItemAlignTablet,
		alignMobile: menuItemAlignMobile,
	};
	// Function to handle inserting a new 'menu-item' block
	const handleNewBlock = useCallback( () => {
		const newSimpleMenu = createBlock( 'ablocks/menu-item' );
		dispatch( 'core/block-editor' ).insertBlock(
			newSimpleMenu,
			0,
			clientId
		);
	}, [ clientId, ...Object.values( innerBlocksUpdatedAttributes ) ] );
	// InnerBlocks template definition
	const template = [
		[ 'ablocks/menu-item', {} ], // Correct template format
	];
	const allowedBlocks = [ 'ablocks/menu-item' ];
	const { children, innerBlocksProps } = useInnerBlocksProps(
		{},
		{
			template,
			allowedBlocks,
			renderAppender: false,
		}
	);

	return (
		<React.Fragment>
			{ /* <MyToolbar handleNewBlock={handleNewBlock} /> */ }
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				tagName="ul"
				{ ...innerBlocksProps }
				className="ablocks-menu-child-sub ablocks-menu-child-sub--editor"
			>
				{ children }
				<button
					className="ablocks-menu-child-sub__new-item"
					onClick={ handleNewBlock }
				>
					Add new Item
				</button>
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
