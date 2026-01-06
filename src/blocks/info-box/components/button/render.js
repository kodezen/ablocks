import React from 'react';
import RenderIcon from '@Controls/icon-upload/render-icon';
import classNames from 'classnames';
import { getAnchorKeyValueAttributes } from '@Controls/link-control/helper';
import { useBlockProps } from '@wordpress/block-editor';
import AblocksRichText from '@Components/rich-text';

const ButtonRender = ( props ) => {
	const { attributes, setAttributes } = props;
	const {
		btnSize,
		btnIconPosition,
		btnIconClass,
		btnShowIcon,
		btnLink: { linkTarget, noFollow, keyValue },
	} = attributes;
	const blockProps = useBlockProps();

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
				<AblocksRichText
					{ ...blockProps }
					tagName={ 'span' }
					identifier={ 'btnText' }
					value={ attributes.btnText }
					withoutInteractiveFormatting={ true }
					placeholder={ attributes.btnText }
					className={ 'ablocks-info-box-btn-link-text' }
					onChange={ ( btnText ) => setAttributes( { btnText } ) }
				/>
			</a>
		</React.Fragment>
	);
};

export default ButtonRender;
