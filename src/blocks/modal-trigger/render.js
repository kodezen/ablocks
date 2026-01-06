import React from 'react';
import { InnerBlocks } from '@wordpress/block-editor';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import { getBlockTypes } from '@wordpress/blocks';

const propTypes = {};
const modalTriggerTemplate = [
	[
		'ablocks/button',
		{
			textColor: '#ffffff',
			buttonType: '#0d6efd',
			transition: 0.5,
			typography: {
				decoration: 'none',
			},
			padding: {
				top: '10',
				right: '25',
				bottom: '10',
				left: '25',
				isLinked: false,
			},
			border: { commonRadius: '5' },
		},
	],
];

export default function Render( props ) {
	const { attributes } = props;
	const { block_id } = attributes;

	const allowedBlocksModal = getBlockTypes()
		.filter(
			( item ) =>
				! item.parent &&
				! [ 'ablocks/modal', 'ablocks/modal-trigger' ].includes(
					item.name
				)
		)
		.map( ( block ) => block.name );

	const innerBlocksProps = {
		template: modalTriggerTemplate,
		allowedBlocks: allowedBlocksModal,
		templateLock: false,
	};

	return (
		<React.Fragment>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div className="ablocks-modal-trigger-wrap">
					<InnerBlocks { ...innerBlocksProps } />
				</div>
			</RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
