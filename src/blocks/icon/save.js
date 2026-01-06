import React from 'react';
import SaveContainer from '@Components/block-container/save2';
import RenderIcon from '@Controls/icon-upload/render-icon';
import metadata from './block.json';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const { block_id, link } = attributes;
	const { linkTarget, noFollow, keyValue, href } = link || {};
	let anchorTagAttributes = {};

	if ( href ) {
		anchorTagAttributes.href = href;
	}

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
			<SaveContainer
				blockId={ block_id }
				name={ metadata.name }
				attributes={ attributes }
			>
				{ link && href ? (
					<a { ...anchorTagAttributes }>
						<RenderIcon attributes={ attributes } />
					</a>
				) : (
					<RenderIcon attributes={ attributes } />
				) }
			</SaveContainer>
		</React.Fragment>
	);
}

Save.propTypes = propTypes;
