import React from 'react';
import RenderContainer from '@Components/block-container/render';
import metadata from './block.json';
import { InnerBlocks } from '@wordpress/block-editor';
import classNames from 'classnames';
import { backSideTemplate, frontSideTemplate } from './helper';

const propTypes = {};

export default function Render( props ) {
	const { attributes } = props;
	const { block_id, childId } = attributes;
	return (
		<React.Fragment>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				className={ classNames(
					`ablocks-flipbox__${ childId === 1 ? 'front' : 'back' }`
				) }
			>
				<InnerBlocks
					template={
						childId === 1 ? frontSideTemplate : backSideTemplate
					}
					templateLock={ false }
				/>
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
