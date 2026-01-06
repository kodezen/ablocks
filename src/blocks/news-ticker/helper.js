import { useSelect } from '@wordpress/data';

export const useFetch = ( itemType ) => {
	return useSelect(
		( select ) =>
			select( 'core' ).getEntityRecords( 'postType', itemType, {
				per_page: -1,
			} ),
		[]
	);
};

export const labelPositionOptions = [
	{
		value: 'left',
		label: 'Left',
	},
	{
		value: 'right',
		label: 'Right',
	},
];
export const navigatorPositionOptions = [
	{
		value: 'left',
		label: 'Left',
	},
	{
		value: 'right',
		label: 'Right',
	},
];

export const slideDirectionOptions = [
	{ label: 'Left', value: 'ltr' },
	{ label: 'Right', value: 'rtl' },
];

// export const tickerTypeOptions = [
// 	{ label: 'Vertical(In Dev)', value: 'vertical' },
// 	{ label: 'Horizontal(In Dev)', value: 'horizontal' },
// 	{ label: 'Marquee', value: 'marquee' },
// 	{ label: 'Typewriter(In Dev)', value: 'typewriter' },
// ];

export const tickerLabelShapeOptions = [
	{ label: 'Normal', value: 'normal' },
	{ label: 'Small Shape', value: 'small' },
	{ label: 'Medium Shape', value: 'medium' },
	{ label: 'Large Shape', value: 'large' },
];

export const tickerListStyleOptions = [
	{ label: 'None', value: 'none' },
	{ label: 'Circle', value: 'circle' },
	{ label: 'Box', value: 'box' },
];

export const positionStickyOptions = [
	{ label: 'Up', value: 'up' },
	{ label: 'Down', value: 'down' },
];

export const getMaxValueForPadding = ( unit ) => {
	if ( unit === 'px' ) {
		return 50;
	} else if ( unit === 'em' ) {
		return 5;
	} else if ( unit === 'rem' ) {
		return 5;
	}
	return 50;
};

export const queryTypeOptions = [
	{ value: 'posts', label: 'Posts' },
	{ value: 'pages', label: 'Pages' },
	{ value: 'customText', label: 'Custom Text' },
];
