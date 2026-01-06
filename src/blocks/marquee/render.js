import React, { useEffect, useRef } from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render2';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';
import CustomToolbar from './toolbar';

import './style.css';
import './styles.scss';

export default function Render( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { block_id, marqueeSlideLength } = attributes;
	const dispatch = useDispatch();
	const marqueeRef = useRef( null );

	const TEMPLATE = [ [ {} ] ];

	const { insertBlock } = ! wp.blockEditor
		? dispatch( 'core/editor' )
		: dispatch( 'core/block-editor' );

	//get current inner blocks
	const innerBlocks = useSelect(
		( select ) => {
			return select( 'core/block-editor' ).getBlocks( clientId );
		},
		[ clientId ]
	);

	const { children, ...innerBlocksProps } = useInnerBlocksProps(
		{
			className: 'ablocks-block-marquee',
		},
		{
			template: TEMPLATE,
			renderAppender: false,
		}
	);

	const addNewMarquee = () => {
		const marqueeChildBlock = createBlock( 'ablocks/marquee-child' );
		insertBlock( marqueeChildBlock, marqueeSlideLength, clientId );
		setAttributes( { marqueeSlideLength: marqueeSlideLength + 1 } );
	};

	useEffect( () => {
		if ( marqueeRef.current ) {
			const marqueeInnerChild = marqueeRef.current.querySelector(
				'.ablocks-block-marquee__children-child'
			);
			if ( marqueeInnerChild ) {
				const validChildren = Array.from(
					marqueeInnerChild.children
				).filter( ( child ) => child.tagName.toLowerCase() === 'div' );
				const itemCount = validChildren.length;

				if ( itemCount > 3 ) {
					marqueeInnerChild.style.overflowX = 'scroll';
				} else {
					marqueeInnerChild.style.overflowX = '';
				}
			}
		}
	}, [ innerBlocks ] );

	return (
		<React.Fragment>
			<CustomToolbar addNewMarquee={ addNewMarquee } />
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div
					{ ...innerBlocksProps }
					className="ablocks-block-marquee"
					ref={ marqueeRef }
				>
					<div className="ablocks-block-marquee__children">
						<div className="ablocks-block-marquee__children-child">
							{ children }
						</div>
						<div role="presentation" onClick={ addNewMarquee }>
							<button className="ablocks-block-marquee__custom-btn">
								<span className="ablocks-icon ablocks-icon--plus"></span>
							</button>
						</div>
					</div>
				</div>
			</RenderContainer>
		</React.Fragment>
	);
}
