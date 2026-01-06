import React from 'react';
import RenderChildContainer from '@Components/block-container/childRender';
import { useInnerBlocksProps } from '@wordpress/block-editor';
import metadata from './block.json';
import GetDeviceType from '@Utils/get-device-type';
const propTypes = {};

const defaultProps = {};

export default function Render( props ) {
	const deviceType = GetDeviceType();
	const { attributes } = props;
	const { block_id } = attributes;
	const allowedBlocks = [ 'ablocks/container' ];
	const template = [ [ 'ablocks/container' ] ];
	const { children, innerBlocksProps } = useInnerBlocksProps(
		{},
		{
			template,
			allowedBlocks,
		}
	);
	return (
		<RenderChildContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
			{ ...innerBlocksProps }
			className="ablocks-menu-child-mega--editor ablocks-menu-child-mega"
			allowQuickEdit={ deviceType !== 'Mobile' && true }
		>
			{ children }
		</RenderChildContainer>
	);
}

Render.propTypes = propTypes;
Render.defaultProps = defaultProps;
