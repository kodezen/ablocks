import { __ } from '@wordpress/i18n';

export const alignmentOptions = [
	{
		label: 'left',
		value: 'left',
		icon: 'left',
	},
	{
		label: 'center',
		value: 'center',
		icon: 'center',
	},
	{
		label: 'right',
		value: 'right',
		icon: 'right',
	},
];

export const layoutOptions = [
	{
		value: 'bar',
		label: __( 'Bar', 'ablocks' ),
	},
	{
		value: 'circle',
		label: __( 'Circle', 'ablocks' ),
	},
];

export const directionOptions = [
	{
		value: 'left',
		label: __( 'Left', 'ablocks' ),
	},
	{
		value: 'right',
		label: __( 'Right', 'ablocks' ),
	},
];

export const progressRelativeOptions = [
	{
		value: 'entire_page',
		label: __( 'Entire Page', 'ablocks' ),
	},
	{
		value: 'selector',
		label: __( 'Selector', 'ablocks' ),
	},
];
