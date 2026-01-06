import React from 'react';
import metadata from './block.json';
import RenderChildContainer from '@Components/block-container/childRender';
import { useInnerBlocksProps } from '@wordpress/block-editor';
const propTypes = {};
const defaultProps = {};

export default function Render( props ) {
	const { attributes } = props;

	const { block_id } = attributes;

	const template = [
		[
			'ablocks/table-row',
			{},
			[
				[ 'ablocks/table-cell', { tagName: 'th' } ],
				[ 'ablocks/table-cell', { tagName: 'th' } ],
			],
		],
	];
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: [ 'ablocks/table-row' ],
			template,
		}
	);

	return (
		<React.Fragment>
			<RenderChildContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				tagName="thead"
				className="ablocks-block--table-header"
				{ ...innerBlocksProps }
			></RenderChildContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
