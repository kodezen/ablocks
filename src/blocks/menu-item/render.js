import React, { useState, useEffect } from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import { useInnerBlocksProps, BlockControls } from '@wordpress/block-editor';
import classNames from 'classnames';
import Tooltip from '@Components/tooltip';
import { createBlock } from '@wordpress/blocks';
import { dispatch, useSelect } from '@wordpress/data';
import { dropDownIcon } from './helper';
import metadata from './block.json';

const propTypes = {};

export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { block_id, label, hasMegaMenu, isSubMenu } = attributes;
	const [ showSubMenu, setShowSubMenu ] = useState( false );
	const [ rotateIcon, setRotateIcon ] = useState( false );
	const allowedBlocks = [
		'ablocks/menu-child-sub',
		'ablocks/menu-child-mega',
	];
	const { innerBlocksProps, children } = useInnerBlocksProps(
		{},
		{ allowedBlocks, renderAppender: false }
	);

	const handleShowSubMenu = () => {
		setShowSubMenu( true );
		setRotateIcon( true );
	};

	const handleCloseSubMenu = () => {
		setShowSubMenu( false );
		setRotateIcon( false );
	};

	const { hasChildBlocks, parentBlockName } = useSelect( ( select ) => {
		const coreBlockEditor = select( 'core/block-editor' );
		const parentBlock = coreBlockEditor.getBlockRootClientId( block_id );
		const parentBlockDetails = parentBlock
			? coreBlockEditor.getBlock( parentBlock )
			: null;

		return {
			hasChildBlocks:
				coreBlockEditor?.getBlockOrder( block_id ).length > 0,
			parentBlockName: parentBlockDetails?.name || null,
		};
	} );

	function handleAddSubMenu() {
		const newChildSub = createBlock( 'ablocks/menu-child-sub' );
		dispatch( 'core/block-editor' ).insertBlock( newChildSub, 0, block_id );
		setShowSubMenu( true );
		setRotateIcon( true );
	}

	function handleAddMegaMenu() {
		const newChildMega = createBlock( 'ablocks/menu-child-mega' );
		dispatch( 'core/block-editor' ).insertBlock(
			newChildMega,
			0,
			block_id
		);
		setShowSubMenu( true );
		setRotateIcon( true );
		setAttributes( { hasMegaMenu: true } );
	}

	useEffect( () => {
		setAttributes( { isSubMenu: hasChildBlocks } );
	}, [ hasChildBlocks ] );

	return (
		<React.Fragment>
			<BlockControls>
				{ ! hasChildBlocks && (
					<>
						<div
							role="presentation"
							onClick={ handleAddSubMenu }
							className="ablocks-menu-item-toolbar-dropdown-icon"
						>
							<Tooltip tooltipText="Add Submenu">
								<span className="ablocks-icon ablocks-icon--submenu"></span>
							</Tooltip>
						</div>

						{ parentBlockName === 'ablocks/menu' && (
							<div
								role="presentation"
								onClick={ handleAddMegaMenu }
								className="ablocks-menu-item-toolbar-dropdown-icon"
							>
								<Tooltip tooltipText="Add Mega Menu">
									<span className="ablocks-icon ablocks-icon--megamenu"></span>
								</Tooltip>
							</div>
						) }
					</>
				) }
			</BlockControls>
			{ showSubMenu && (
				<div
					className="ablocks-menu-item__submenu-overlay"
					role="presentation"
					onClick={ handleCloseSubMenu }
				></div>
			) }
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				tagName="li"
				{ ...innerBlocksProps }
				className={ classNames( 'ablocks-menu-item', {
					'ablocks-has-mega-menu': hasMegaMenu,
					'ablocks-has-sub-menu': ! hasMegaMenu && isSubMenu,
				} ) }
				blockProps={ {
					onClick: handleShowSubMenu,
				} }
			>
				<a href='#' className="ablocks-menu-item__link">{label}</a> {/* eslint-disable-line */}
				{ hasChildBlocks && (
					<div
						className={ classNames(
							'ablocks-menu-item__dropdown-icon',
							{ 'rotate-icon': rotateIcon }
						) }
					>
						{ dropDownIcon }
					</div>
				) }
				{ showSubMenu && children }
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
