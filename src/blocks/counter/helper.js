import { __ } from '@wordpress/i18n';

export const alignmentOptions = [
	{
		label: 'left',
		value: 'flex-start',
		icon: 'left',
	},
	{
		label: 'center',
		value: 'center',
		icon: 'center',
	},
	{
		label: 'right',
		value: 'flex-end',
		icon: 'right',
	},
];

export const separatorOptions = [
	{ label: __( 'Default', 'ablocks' ), value: '' },
	{ label: __( 'Comma', 'ablocks' ), value: ',' },
	{ label: __( 'Dot', 'ablocks' ), value: '.' },
	{ label: __( 'WhiteSpace', 'ablocks' ), value: ' ' },
	{ label: __( 'Apostrophe', 'ablocks' ), value: "'" },
	{ label: __( 'Underline', 'ablocks' ), value: '_' },
];

export const layoutOptions = [
	{
		value: 'number',
		label: __( 'Number', 'ablocks' ),
	},
	{
		value: 'circle',
		label: __( 'Circle', 'ablocks' ),
	},
	{
		value: 'bar',
		label: __( 'Bar', 'ablocks' ),
	},
];

export const mediaPositionOptions = ( preset ) => {
	switch ( preset ) {
		case 'preset-1':
			return [
				{
					value: 'top',
					label: __( 'Top', 'ablocks' ),
				},
				{
					value: 'bottom',
					label: __( 'Bottom', 'ablocks' ),
				},
				{
					value: 'leftOfNumber',
					label: __( 'Left Of Number', 'ablocks' ),
				},
				{
					value: 'rightOfNumber',
					label: __( 'Right Of Number', 'ablocks' ),
				},
			];
		case 'preset-2':
			return [
				{
					value: 'top',
					label: __( 'Top', 'ablocks' ),
				},
				{
					value: 'bottom',
					label: __( 'Bottom', 'ablocks' ),
				},
			];
	}
};

export const iconTypeOption = [
	{ value: 'default', label: __( 'Default', 'ablocks' ) },
	{ value: 'stacked', label: __( 'Stacked', 'ablocks' ) },
	{ value: 'framed', label: __( 'Framed', 'ablocks' ) },
];

export const barHeadingPositionOptions = [
	{
		label: __( 'Top', 'ablocks' ),
		value: 'top',
	},
	{
		label: __( 'Inner', 'ablocks' ),
		value: 'inner',
	},

	{
		label: __( 'Bottom', 'ablocks' ),
		value: 'bottom',
	},
];
