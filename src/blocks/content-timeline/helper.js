import { __ } from '@wordpress/i18n';

export const dateAlignmentOptions = [
	{
		label: __( 'Left', 'ablocks' ),
		value: 'left',
		icon: <span className="ablocks-icon ablocks-icon--align-start" />,
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: <span className="ablocks-icon ablocks-icon--align-center-two" />,
	},
	{
		label: __( 'Right', 'ablocks' ),
		value: 'right',
		icon: <span className="ablocks-icon ablocks-icon--align-end" />,
	},
];
