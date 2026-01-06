import React from 'react';
import classNames from 'classnames';
import metadata from './block.json';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { RichText } from '@wordpress/block-editor';
import SaveContainer from '@Components/block-container/save';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';

const propTypes = {};

export default function Save( props ) {
	const { attributes } = props;
	const {
		block_id,
		buttonSize,
		iconPosition,
		iconClass,
		showIcon,
		link: { href, linkTarget, noFollow, keyValue },
		iconImageID,
		iconImageUrl,
	} = attributes;
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
		<SaveContainer
			blockId={ block_id }
			name={ metadata.name }
			attributes={ attributes }
		>
			<a
				{ ...anchorTagAttributes }
				className={ classNames(
					'ablocks-button',
					`ablocks-button--${ buttonSize }`,
					{
						[ `ablocks-button--icon-${ iconPosition }` ]:
							( iconClass && iconPosition ) ||
							( iconImageID && iconImageUrl ),
					}
				) }
			>
				{ showIcon && <RenderIcon attributes={ attributes } /> }
				<RichText.Content
					tagName={ 'span' }
					className="ablocks-button__text"
					value={ attributes.text }
				/>
			</a>
		</SaveContainer>
	);
}

Save.propTypes = propTypes;
