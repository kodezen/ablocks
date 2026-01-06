import { __ } from '@wordpress/i18n';

export const course_column_options = [
	{
		label: __( '2', 'ablocks' ),
		value: 2,
	},
	{
		label: __( '3', 'ablocks' ),
		value: 3,
	},
	{
		label: __( '4', 'ablocks' ),
		value: 4,
	},
	{
		label: __( '6', 'ablocks' ),
		value: 6,
	},
	{
		label: __( '12', 'ablocks' ),
		value: 12,
	},
];

export const course_difficulty_level_options = [
	{
		label: __( 'Beginner', 'ablocks' ),
		value: 'beginner',
	},
	{
		label: __( 'Intermediate', 'ablocks' ),
		value: 'intermediate',
	},
	{
		label: __( 'Expert', 'ablocks' ),
		value: 'experts',
	},
];

export const price_type_options = [
	{
		label: __( 'Free', 'ablocks' ),
		value: 'free',
	},
	{
		label: __( 'Paid', 'ablocks' ),
		value: 'paid',
	},
];

export const order_by_options = [
	{
		label: __( 'Date', 'ablocks' ),
		value: 'date',
	},
	{
		label: __( 'Product Title', 'ablocks' ),
		value: 'title',
	},
	{
		label: __( 'Modified Date', 'ablocks' ),
		value: 'modified',
	},
];

export const order_options = [
	{
		label: __( 'Descending', 'ablocks' ),
		value: 'DESC',
	},
	{
		label: __( 'Ascending', 'ablocks' ),
		value: 'ASC',
	},
];
