import classNames from 'classnames';

export const getClassNames = ( {
	name,
	blockId,
	_hide_on_desktop,
	_hide_on_tablet,
	_hide_on_mobile,
	className,
} ) => {
	const blockClass = `ablocks-block-${ blockId } ablocks-block--${
		name.split( '/' )[ 1 ]
	}`;

	return classNames( 'ablocks-block', blockClass, className, {
		'ablocks-hide-on-desktop': _hide_on_desktop,
		'ablocks-hide-on-tablet': _hide_on_tablet,
		'ablocks-hide-on-mobile': _hide_on_mobile,
	} );
};
