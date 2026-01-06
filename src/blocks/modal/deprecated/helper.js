import { __ } from '@wordpress/i18n';

export const positionsSet = [
	[
		{ label: 'Left', value: 'left' },
		{ label: 'Right', value: 'right' },
	],
	[
		{ label: 'Top', value: 'top' },
		{ label: 'Block', value: 'block' },
	],
	[
		{ label: 'Popup', value: 'popup' },
		{ label: 'Modal', value: 'modal' },
	],
];

export const blockPositions = [
	{
		label: __( 'Bottom', 'ablocks' ),
		value: 'bottom',
	},
	{
		label: __( 'Top', 'ablocks' ),
		value: 'top',
	},
	// {
	// 	label: __('Left', 'ablocks'),
	// 	value: 'left',
	// },
	// {
	// 	label: __('Right', 'ablocks'),
	// 	value: 'right',
	// },
];

export const panelContentPositionOptions = [
	{
		label: __( 'Stretch', 'ablocks' ),
		value: 'stretch',
		icon: <span className="ablocks-icon ablocks-icon--align-stretch" />,
		tooltipPosition: 'top-left',
	},
	{
		label: __( 'Top', 'ablocks' ),
		value: 'flex-start',
		icon: <span className="ablocks-icon ablocks-icon--align-start" />,
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: <span className="ablocks-icon ablocks-icon--align-center-two" />,
	},
	{
		label: __( 'Bottom', 'ablocks' ),
		value: 'flex-end',
		icon: <span className="ablocks-icon ablocks-icon--align-end" />,
	},
];

export const getMaxValueForUnit = ( unit ) => {
	switch ( unit ) {
		case 'px':
			return 2000;
		case 'em':
		case 'rem':
			return 150;
		default:
			return 100;
	}
};

export const getExtraClasses = ( {
	popupPosition,
	panelBlockPosition,
	popupOnTop,
} ) => {
	let className = '';
	className += `ablocks-block-modal-position--${ popupPosition } `;
	if ( 'block' === popupPosition && panelBlockPosition ) {
		className += `ablocks-block-modal-panel-direction--${ panelBlockPosition } `;
	}
	if ( 'popup' === popupPosition && popupOnTop ) {
		className += 'ablocks-block-modal-panel-popup-on-top ';
	}
	return className;
};
