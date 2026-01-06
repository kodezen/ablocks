import {
	alignLeft,
	alignJustify,
	alignCenter,
	alignRight,
} from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
export const TOOLBAR_ALIGNMENT_OPTIONS = [
	{
		icon: alignLeft,
		title: __( 'Align text left' ),
		align: 'left',
	},
	{
		icon: alignCenter,
		title: __( 'Align text center' ),
		align: 'center',
	},
	{
		icon: alignRight,
		title: __( 'Align text right' ),
		align: 'right',
	},
	{
		icon: alignJustify,
		title: __( 'Align text justify' ),
		align: 'justify',
	},
];
