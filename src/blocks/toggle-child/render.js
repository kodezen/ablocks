import React from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import metadata from './block.json';
import { useInnerBlocksProps } from '@wordpress/block-editor';

const propTypes = {};
export default function Render( props ) {
	const { attributes } = props;
	const { block_id } = attributes;
	const Template = [ [ 'ablocks/container' ] ];
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			template: Template,
			allowedBlocks: [ 'ablocks/container' ],
			renderAppender: false,
		}
	);
	return (
		<div className="ablocks-toggle__child ablocks-toggle__child--editor">
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				<div { ...innerBlocksProps } />
			</RenderChildContainer>
		</div>
	);
}

Render.propTypes = propTypes;
