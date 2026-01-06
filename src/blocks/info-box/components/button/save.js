import React from 'react';
import classNames from 'classnames';
import RenderIcon from '@Controls/icon-upload/render-icon';
import { RichText } from '@wordpress/block-editor';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';

const ButtonSave = ( props ) => {
	const { attributes } = props;
	const {
		btnSize,
		btnIconPosition,
		btnIconClass,
		btnShowIcon,
		btnLink: { href, linkTarget, noFollow, keyValue },
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
		anchorTagAttributes.rel = 'nofollow noreferrer noopener';
	}
	if ( keyValue ) {
		anchorTagAttributes = {
			...anchorTagAttributes,
			...getAnchorKeyValueAttributes( keyValue ),
		};
	}
	return (
		<React.Fragment>
			<a
				{ ...anchorTagAttributes }
				className={ classNames(
					'ablocks-info-box-btn-link',
					`ablocks-info-box-btn-link--${ btnSize }`,
					{
						[ `ablocks-info-box-btn-link--icon-${ btnIconPosition }` ]:
							btnIconClass && btnIconPosition,
					},
					`${
						attributes.allowButtonHover
							? 'ablocks-button-hover-enable'
							: ''
					}`
				) }
			>
				{ btnShowIcon && (
					<RenderIcon
						attributePrefix={ 'btnIcon' }
						attributes={ attributes }
					/>
				) }
				<RichText.Content
					tagName={ 'span' }
					value={ attributes.btnText }
					className="ablocks-info-box-btn-link-text"
				/>
			</a>
		</React.Fragment>
	);
};

export default ButtonSave;
