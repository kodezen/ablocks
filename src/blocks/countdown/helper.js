import { __ } from '@wordpress/i18n';

export const expireActionOptions = [
	{
		label: __( 'None', 'ablocks' ),
		value: 'none',
	},
	{
		label: __( 'Hide', 'ablocks' ),
		value: 'hide',
	},

	{
		label: __( 'Show Message', 'ablocks' ),
		value: 'show-message',
	},
	{
		label: __( 'Show Message & Hide Countdown', 'ablocks' ),
		value: 'show-message&hide-countdown',
	},

	{
		label: __( 'Redirect', 'ablocks' ),
		value: 'redirect',
	},
];

export const separatorOptions = [
	{
		label: __( ':', 'ablocks' ),
		value: ':',
	},
	{
		label: __( '/', 'ablocks' ),
		value: '/',
	},
	{
		label: __( '?', 'ablocks' ),
		value: '?',
	},
	{
		label: __( '|', 'ablocks' ),
		value: '|',
	},
];

export const boxBackgroundTypeOptions = [
	{
		label: __( 'Transparent', 'ablocks' ),
		value: 'transparent',
	},
	{
		label: __( 'Color', 'ablocks' ),
		value: 'Color',
	},
];

export const labelPositionOptions = [
	{
		label: __( 'Top', 'ablocks' ),
		value: 'column-reverse',
	},
	{
		label: __( 'Right', 'ablocks' ),
		value: 'row',
	},
	{
		label: __( 'Bottom', 'ablocks' ),
		value: 'column',
	},
	{
		label: __( 'Left', 'ablocks' ),
		value: 'row-reverse',
	},
];

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

export const justifyOptions = [
	{
		label: __( 'Flex Start', 'ablocks' ),
		value: 'flex-start',
		icon: <span className="ablocks-icon ablocks-icon--justify-start" />,
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: <span className="ablocks-icon ablocks-icon--justify-Center" />,
	},
	{
		label: __( 'Flex End', 'ablocks' ),
		value: 'flex-end',
		icon: <span className="ablocks-icon ablocks-icon--justify-end" />,
	},
	{
		label: __( 'Space Between', 'ablocks' ),
		value: 'space-between',
		icon: (
			<span className="ablocks-icon ablocks-icon--justify-spacebetween" />
		),
	},
	{
		label: __( 'Space Around', 'ablocks' ),
		value: 'space-around',
		icon: (
			<span className="ablocks-icon ablocks-icon--justify-spacearound" />
		),
	},
	{
		label: __( 'Space Evenly', 'ablocks' ),
		value: 'space-evenly',
		icon: (
			<span className="ablocks-icon ablocks-icon--justify-spaceevenly" />
		),
		tooltipPosition: 'top-left',
	},
];

export const alignOptions = [
	{
		label: __( 'Start', 'ablocks' ),
		value: 'flex-start',
		icon: <span className="ablocks-icon ablocks-icon--align-start" />,
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: <span className="ablocks-icon ablocks-icon--align-center-two" />,
	},
	{
		label: __( 'End', 'ablocks' ),
		value: 'flex-end',
		icon: <span className="ablocks-icon ablocks-icon--align-end" />,
	},
	{
		label: __( 'Stretch', 'ablocks' ),
		value: 'stretch',
		icon: <span className="ablocks-icon ablocks-icon--align-stretch" />,
		tooltipPosition: 'top-left',
	},
];

export const wrapOptions = [
	{
		label: __( 'Wrap', 'ablocks' ),
		value: 'wrap',
		icon: <span className="ablocks-icon ablocks-icon--wrap" />,
	},
	{
		label: __( 'No Wrap', 'ablocks' ),
		value: 'nowrap',
		icon: <span className="ablocks-icon ablocks-icon--no-wrap" />,
	},
	{
		label: __( 'Wrap Reverse', 'ablocks' ),
		value: 'wrap-reverse',
		icon: (
			<span className="ablocks-icon ablocks-icon--wrap ablocks-icon-rotate-180-deg" />
		),
		tooltipPosition: 'top-left',
	},
];
