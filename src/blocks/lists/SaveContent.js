import React from 'react';
import { RenderMarker } from './helper';
import { RichText } from '@wordpress/block-editor';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export default function SaveContent( { index, attributes, list } ) {
	const { markerType, emoji, listIcons } = attributes;
	const listLinkData = list?.link || {};
	const { linkTarget, href = '', noFollow, keyValue } = listLinkData;

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
		<a
			{ ...anchorTagAttributes }
			key={ list?.id }
			className="ablocks-list__item-content"
		>
			<RenderMarker
				markerType={ markerType }
				emoji={ emoji }
				index={ index }
				iconAttributes={ listIcons }
				listProperties={ list }
			/>
			<RichText.Content
				tagName="span"
				value={ list?.text }
				className="ablocks-list__item-text"
				style={ {
					color: getTextColorCSS( list?.textColor ),
				} }
			/>
		</a>
	);
}
