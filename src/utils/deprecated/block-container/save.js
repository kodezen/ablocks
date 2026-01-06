import React from 'react';
import classNames from 'classnames';
import { applyFilters } from '@wordpress/hooks';
import { useBlockProps } from '@wordpress/block-editor';
import _ from 'lodash';
import { getClassNames } from './helper';
import PropTypes from 'prop-types';

const propTypes = {
	name: PropTypes.string,
	blockId: PropTypes.string,
	blockProps: PropTypes.object,
};

export default function SaveContainer( {
	blockId,
	name,
	children,
	attributes,
	className,
	dataAttributes = {},
	blockProps = {},
} ) {
	const { _hide_on_desktop, _hide_on_tablet, _hide_on_mobile, _animation } =
		attributes;

	// eslint-disable-next-line
	let saveContainerClasses = applyFilters(
		`ablocks.global.save_container_classes`,
		{},
		attributes
	);

	// eslint-disable-next-line
	let saveContainerAttributes = applyFilters(
		`ablocks.global.save_container_attributes`,
		{},
		attributes
	);

	const isEnabledAnimation =
		( _animation?.animationType && _animation?.animationType !== 'none' ) ||
		( _animation?.animationTypeTablet &&
			_animation?.animationTypeTablet !== 'none' ) ||
		( _animation?.animationTypeMobile &&
			_animation?.animationTypeMobile !== 'none' );

	const blockPropsArgs = useBlockProps.save( { ...blockProps } );
	const allProps = {
		...blockPropsArgs,
		...dataAttributes,
		className: getClassNames( {
			name,
			blockId,
			className: classNames( className, attributes?.className, {
				'ablocks-invisible': isEnabledAnimation,
				...saveContainerClasses,
			} ),
			_hide_on_desktop,
			_hide_on_tablet,
			_hide_on_mobile,
		} ),
	};

	const dataSettings = {
		...( isEnabledAnimation ? _animation : {} ),
		...saveContainerAttributes,
	};

	if ( ! _.isEmpty( dataSettings ) ) {
		allProps[ 'data-settings' ] = JSON.stringify( dataSettings );
	}

	return (
		<React.Fragment>
			<div { ...allProps }>
				<div className="ablocks-block-container">{ children }</div>
			</div>
		</React.Fragment>
	);
}

SaveContainer.propTypes = propTypes;
