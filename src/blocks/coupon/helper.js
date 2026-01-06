import { __ } from '@wordpress/i18n';

export const iconTypeOption = [
	{ value: 'default', label: __( 'Default', 'ablocks' ) },
	{ value: 'stacked', label: __( 'Stacked', 'ablocks' ) },
	{ value: 'framed', label: __( 'Framed', 'ablocks' ) },
];

export const couponStyleOptions = [
	{ value: 'default', label: __( 'Default', 'ablocks' ) },
	{ value: 'style2', label: __( 'Hidden Coupon', 'ablocks' ) },
	{ value: 'style3', label: __( 'Simple Coupon', 'ablocks' ) },
	{ value: 'style4', label: __( 'Coupon Overlay', 'ablocks' ) },
];

export const CouponAlignmentOptions = [
	{
		label: __( 'Left', 'ablocks' ),
		value: 'left',
		icon: 'left',
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: 'center',
	},
	{
		label: __( 'Right', 'ablocks' ),
		value: 'right',
		icon: 'right',
	},
];
