import React, { useEffect } from 'react';
import { __ } from '@wordpress/i18n';
import RenderContainer from '@Components/block-container/render2';
import metadata from './block.json';
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import {
	dispatch,
	useSelect,
	useDispatch,
	select as dataSelect,
} from '@wordpress/data';
import { MyToolbar } from './toolbar';
import { getRenderDomElement } from '@Utils/helper';
import ABlocksAccordion from './accordion';

const propTypes = {};

export default function Render( props ) {
	const { attributes, clientId, isSelected } = props;
	const { block_id } = attributes;

	const innerBlocks = useSelect(
		( select ) => select( 'core/block-editor' ).getBlocks( clientId ),
		[ clientId ]
	);

	const blockProps = useBlockProps();

	useEffect( () => {
		let accordion;
		if ( innerBlocks.length > 0 ) {
			const element = getRenderDomElement(
				`.ablocks-block-${ block_id }.ablocks-block--accordion`
			);
			if ( element !== null ) {
				accordion = new ABlocksAccordion( element );
			}
		}

		return () => {
			if ( accordion ) {
				accordion.removeListeners(); // Clean up listeners on component unmount or re-render
			}
		};
	}, [ innerBlocks, block_id ] );
	const { updateBlockAttributes } = useDispatch( 'core/block-editor' );
	const changeChildAttribute = () => {
		const childBlocks =
			dataSelect( 'core/block-editor' ).getBlocks( clientId );
		if ( childBlocks.length > 0 ) {
			// Loop through the child blocks and access their attributes
			childBlocks.forEach( ( childBlock ) => {
				const childBlockId = childBlock.clientId;
				updateBlockAttributes( childBlockId, {
					parentAttributes: attributes,
				} );
			} );
		}
	};
	useEffect( () => {
		if ( isSelected ) {
			changeChildAttribute();
		}
	}, [ attributes ] );
	// Function to insert a new block with a default paragraph
	function insertButtonBlock() {
		const innerCount = innerBlocks.length;
		const newAccordionBlock = createBlock( 'ablocks/single-accordion', {}, [
			createBlock( 'ablocks/paragraph', {
				paragraph:
					'Lorem ipsum dolor sinonet amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
			} ),
		] );
		dispatch( 'core/block-editor' ).insertBlock(
			newAccordionBlock,
			innerCount,
			clientId
		);
	}

	// Inner block props
	const innerBlocksProps = useInnerBlocksProps( blockProps, {
		template: [
			[
				'ablocks/single-accordion',
				{},
				[
					[
						'ablocks/paragraph',
						{
							paragraph:
								'Lorem ipsum dolor sinonet amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
						},
					],
				],
			],
			[
				'ablocks/single-accordion',
				{},
				[
					[
						'ablocks/paragraph',
						{
							paragraph:
								'Lorem ipsum dolor sinonet amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
						},
					],
				],
			],
			[
				'ablocks/single-accordion',
				{},
				[
					[
						'ablocks/paragraph',
						{
							paragraph:
								'Lorem ipsum dolor sinonet amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.',
						},
					],
				],
			],
		],
		allowedBlocks: [ 'ablocks/single-accordion' ],
		templateLock: false,
		renderAppender: () => (
			<button
				className="ablocks-block-accordion-appender-button"
				type="button"
				onClick={ insertButtonBlock }
			>
				<span className="ablocks-icon ablocks-icon--plus"></span>
				<span>{ __( 'Add Accordion', 'ablocks' ) }</span>
			</button>
		),
	} );

	return (
		<React.Fragment>
			<MyToolbar insertButtonBlock={ insertButtonBlock } />
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
				<div { ...innerBlocksProps } />
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
