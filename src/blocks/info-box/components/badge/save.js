import React from 'react';
import classNames from 'classnames';
import { RichText } from '@wordpress/block-editor';

const BadgeSave = ( props ) => {
	const { attributes } = props;
	const { badgeSize } = attributes;
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
				<RichText.Content
					tagName={ 'span' }
					value={ attributes.badgeText }
					className="ablocks-info-box-badge-link-text"
				/>
			</a>
		</React.Fragment>
	);
};

export default BadgeSave;
