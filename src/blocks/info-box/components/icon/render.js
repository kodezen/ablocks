import React from 'react';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';

const IconRender = ( props ) => {
	const { attributes } = props;
	const { iconLink } = attributes;
	const { linkTarget, noFollow, keyValue, href } = iconLink || {};

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
			{ href ? (
				<a { ...anchorTagAttributes }>
					<RenderIcon
						attributes={ attributes }
						attributePrefix="icon"
					/>
				</a>
			) : (
				<RenderIcon attributes={ attributes } attributePrefix="icon" />
			) }
		</React.Fragment>
	);
};

export default IconRender;
