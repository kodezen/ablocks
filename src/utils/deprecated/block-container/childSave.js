import React from 'react';
import classNames from 'classnames';
import { useBlockProps } from '@wordpress/block-editor';
import { getClassNames } from './helper';
import PropTypes from 'prop-types';

const propTypes = {
	name: PropTypes.string,
	blockId: PropTypes.string,
	tagName: PropTypes.string,
	blockProps: PropTypes.object,
};
export default function SaveChildContainer( {
	blockId,
	name,
	children,
	attributes,
	className,
	tagName: Tag = 'div',
	blockProps = {},
} ) {
	const blockPropsArgs = useBlockProps.save( {
		...blockProps,
	} );
	const allProps = {
		...blockPropsArgs,
		className: getClassNames( {
			name,
			blockId,
			className: classNames( className, attributes?.className ),
		} ),
	};

	return (
		<React.Fragment>
			<Tag { ...allProps }>{ children }</Tag>
		</React.Fragment>
	);
}

SaveChildContainer.propTypes = propTypes;
