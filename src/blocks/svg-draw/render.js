import React from 'react';
import RenderContainer from '@Components/block-container/render2';
import RenderIcon from '@Controls/icon-upload/render-icon';
import metadata from './block.json';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import './style.css';
const propTypes = {};

import ABlocksToolbarAlignment from '@Toolbar/alignment';
import { BlockControls } from '@wordpress/block-editor';
export default function Render( props ) {
	const { attributes, setAttributes } = props;
	const { alignment } = attributes;
	const { block_id, link } = attributes;
	const { linkTarget, noFollow, keyValue, href } = link || {};

	let anchorTagAttributes = {};

	if ( linkTarget ) {
		anchorTagAttributes.target = '_blank';
	}
	if ( noFollow ) {
		anchorTagAttributes.rel = linkTarget
			? 'nofollow noreferrer noopener'
			: 'nofollow';
	} else {
		anchorTagAttributes.rel = 'noopener';
	}
	if ( keyValue ) {
		anchorTagAttributes = {
			...anchorTagAttributes,
			...getAnchorKeyValueAttributes( keyValue ),
		};
	}
	return (
		<React.Fragment>
			<BlockControls>
				<ABlocksToolbarAlignment
					attributeValue={ alignment }
					setAttributes={ setAttributes }
				/>
			</BlockControls>
			<RenderContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
				typography={ [] }
			>
				{ href ? (
					<a { ...anchorTagAttributes }>
						<RenderIcon attributes={ attributes } />
					</a>
				) : (
					<RenderIcon attributes={ attributes } />
				) }
			</RenderContainer>
		</React.Fragment>
	);
}

Render.propTypes = propTypes;
