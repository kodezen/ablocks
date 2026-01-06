import React from 'react';
import AblocksRichText from '@Components/rich-text';
import { useBlockProps } from '@wordpress/block-editor';
import classNames from 'classnames';

const BadgeRender = ( props ) => {
	const { attributes, setAttributes } = props;
	const { badgeSize } = attributes;
	const blockProps = useBlockProps();

	return (
		<React.Fragment>
			<a // eslint-disable-line
				href="#"
				className={ classNames(
					'ablocks-info-box-badge-link',
					`ablocks-info-box-badge-link--${ badgeSize }`,
					`${
						attributes.allowBadgeHover
							? 'ablocks-badge-hover-enable'
							: ''
					}`
				) }
			>
				<AblocksRichText
					{ ...blockProps }
					tagName={ 'span' }
					identifier={ 'badgeText' }
					value={ attributes.badgeText }
					withoutInteractiveFormatting={ true }
					placeholder={ attributes.badgeText }
					className={ 'ablocks-info-box-badge-link-text' }
					onChange={ ( badgeText ) => setAttributes( { badgeText } ) }
				/>
			</a>
		</React.Fragment>
	);
};

export default BadgeRender;
