import React, { useEffect } from 'react';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import AblocksNav from './nav';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { getRenderDomElement } from '@Utils/helper';
import { dispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
const propTypes = {};
export default function Render( props ) {
	const { attributes, clientId } = props;
	const { insertBlock } = ! wp.blockEditor
		? dispatch( 'core/editor' )
		: dispatch( 'core/block-editor' );
	const { block_id, sideBarMenuDevice } = attributes;
	const template = [
		[ 'ablocks/menu-item', { label: 'Home' } ],
		[ 'ablocks/menu-item', { label: 'About' } ],
		[
			'ablocks/menu-item',
			{ label: 'Products' },
			[
				[
					'ablocks/menu-child-sub',
					{},
					[
						[ 'ablocks/menu-item', { label: 'Academy LMS' } ],
						[ 'ablocks/menu-item', { label: 'Ablocks' } ],
					],
				],
			],
		],
		[ 'ablocks/menu-item', { label: 'Portfolio' } ],
		[ 'ablocks/menu-item', { label: 'Contact' } ],
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
	useEffect( () => {
		new AblocksNav( getRenderDomElement( `.ablocks-block-${ block_id }` ) );
	}, [ block_id ] );

	const handleNewMenuItem = () => {
		const carouselChildBlock = createBlock( 'ablocks/menu-item' );
		insertBlock( carouselChildBlock, 0, clientId );
	};

	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ {
					'data-menu-device': sideBarMenuDevice,
				} }
			>
				<div className="ablocks-menu__trigger-wrapper">
					<div
						className={ ` ablocks-menu__trigger ablocks-menu-${ sideBarMenuDevice }__trigger` }
					>
						<input
							type="checkbox"
							className="ablocks-menu__trigger-toggle"
						/>
						<span className="ablocks-menu__trigger-item"></span>
						<span className="ablocks-menu__trigger-item"></span>
						<span className="ablocks-menu__trigger-item"></span>
					</div>
				</div>
				<nav
					className={ `ablocks-menu ablocks-menu-${ sideBarMenuDevice }` }
				>
					<ul className="ablocks-main-menu" { ...innerBlocksProps }>
						{ children }
						<button
							className="ablocks-menu__new-item"
							onClick={ handleNewMenuItem }
						>
							+
						</button>
					</ul>
				</nav>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
