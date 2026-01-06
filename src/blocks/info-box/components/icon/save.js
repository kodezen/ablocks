import React from 'react';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';

const IconSave = ( props ) => {
	const { attributes } = props;
	const { iconLink } = attributes;
	const { linkTarget, noFollow, keyValue, href } = iconLink || {};

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
			{ href ? (
				<a { ...anchorTagAttributes }>
					<RenderIcon attributes={ attributes } />
				</a>
			) : (
				<RenderIcon attributes={ attributes } />
			) }
		</React.Fragment>
	);
};

export default IconSave;
