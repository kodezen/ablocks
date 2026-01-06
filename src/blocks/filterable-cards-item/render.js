import React from 'react';
import metadata from './block.json';
import RenderContainer from '@Components/block-container/render';
import { InnerBlocks } from '@wordpress/block-editor';

const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const { block_id, dataCategory } = attributes;
	const TEMPLATE = [
		[
			'ablocks/info-box',
			{
				stack: 'column',
				heading: 'Demo Title 01',
				allowButton: false,
			},
		],
	];
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				blockProps={ { 'data-category': dataCategory } }
			>
				<InnerBlocks template={ TEMPLATE } templateLock={ false } />
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
