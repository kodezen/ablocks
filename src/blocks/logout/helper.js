import { __ } from '@wordpress/i18n';

export const directionOptions = [
	{
		label: __( 'Row', 'ablocks' ),
		value: 'row',
		icon: <span className="ablocks-icon ablocks-icon--arrow-right" />,
	},
	{
		label: __( 'Column', 'ablocks' ),
		value: 'column',
		icon: <span className="ablocks-icon ablocks-icon--arrow-down" />,
	},
	{
		label: __( 'Row Reverse', 'ablocks' ),
		value: 'row-reverse',
		icon: <span className="ablocks-icon ablocks-icon--arrow-left" />,
	},
	{
		label: __( 'Column Reverse', 'ablocks' ),
		value: 'column-reverse',
		icon: <span className="ablocks-icon ablocks-icon--arrow-up" />,
		tooltipPosition: 'top-left',
	},
];

export const alignmentOptions = [
	{
		label: __( 'Flex Start', 'ablocks' ),
		value: 'flex-start',
		icon: 'left',
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: 'center',
	},
	{
		label: __( 'Flex End', 'ablocks' ),
		value: 'flex-end',
		icon: 'right',
	},
	{
		label: __( 'Space Between', 'ablocks' ),
		value: 'space-between',
		icon: 'justify',
	},
];
export const logoutRedirectOptions = [
	{
		label: __( 'Current URL', 'ablocks' ),
		value: 'current-url',
	},
	{
		label: __( 'Custom URL', 'ablocks' ),
		value: 'custom-url',
	},
];
export const loginRedirectOptions = [
	{
		label: __( 'Current URL', 'ablocks' ),
		value: 'current-url',
	},
	{
		label: __( 'Custom URL', 'ablocks' ),
		value: 'custom-url',
	},
];
