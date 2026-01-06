import React from 'react';
import { __ } from '@wordpress/i18n';
import { RenderMarker } from './helper';
import { RichText } from '@wordpress/block-editor';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export default function Content( {
	index,
	attributes,
	list,
	setAttributes,
	isSave,
} ) {
	const { markerType, emoji, listIcons, lists } = attributes;
	const listLinkData = list?.link || {};
	const { linkTarget, noFollow, keyValue } = listLinkData;
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

	const changeListHandler = ( id, controlValue, attributeObjectKey ) => {
		const updatedLists = lists.map( ( item ) => {
			if ( item.id === id ) {
				return { ...item, [ attributeObjectKey ]: controlValue };
			}
			return item;
		} );
		setAttributes( { lists: updatedLists } );
	};

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

			{ isSave ? (
				<RichText.Content
					tagName="span"
					value={ list?.text }
					className="ablocks-list__item-text"
					style={ {
						color: getTextColorCSS( list?.textColor ),
					} }
				/>
			) : (
				<RichText
					tagName="span"
					value={ list?.text }
					className="ablocks-list__item-text"
					onChange={ ( controlValue ) =>
						changeListHandler( list?.id, controlValue, 'text' )
					}
					style={ {
						color: getTextColorCSS( list?.textColor ),
					} }
					placeholder={ __( 'Enter Your Text' ) }
				/>
			) }
		</a>
	);
}
