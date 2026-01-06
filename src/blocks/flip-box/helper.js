import { __ } from '@wordpress/i18n';

export const showSideOptions = [
	{
		label: __( 'Front', 'ablocks' ),
		value: 'front',
	},
	{
		label: __( 'Back', 'ablocks' ),
		value: 'back',
	},
];

export const toggleClasses = ( elements, activeIndex, inactiveIndex ) => {
	elements[ activeIndex ]?.children[ 1 ]?.classList.add(
		'ablocks-block--flip-box-child--active'
	);
	elements[ activeIndex ]?.children[ 1 ]?.classList.remove(
		'ablocks-block--flip-box-child--inactive'
	);
	elements[ inactiveIndex ]?.children[ 1 ]?.classList.add(
		'ablocks-block--flip-box-child--inactive'
	);
	elements[ inactiveIndex ]?.children[ 1 ]?.classList.remove(
		'ablocks-block--flip-box-child--active'
	);
};

export const directionOptions = [
	{
		label: __( 'Right', 'ablocks' ),
		value: 'right',
		icon: <span className="ablocks-icon ablocks-icon--arrow-right" />,
	},
	{
		label: __( 'Bottom', 'ablocks' ),
		value: 'bottom',
		icon: <span className="ablocks-icon ablocks-icon--arrow-down" />,
	},
	{
		label: __( 'Left', 'ablocks' ),
		value: 'left',
		icon: <span className="ablocks-icon ablocks-icon--arrow-left" />,
	},
	{
		label: __( 'Top', 'ablocks' ),
		value: 'top',
		icon: <span className="ablocks-icon ablocks-icon--arrow-up" />,
	},
];
