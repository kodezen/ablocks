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

export const getPathData = ( type ) => {
	switch ( type ) {
		case 'wave':
			return 'M0,42.2494C62.5,42.2494,62.5,0.25,125,0.25s62.5,41.9994,125,41.9994 M-41.6693,49.25 M-208.3307,-6.75';
		case 'arc':
			return 'M.25,125.25a125,125,0,0,1,250,0';
		case 'circle':
			return 'M.25,125.25a125,125,0,1,1,125,125,125,125,0,0,1-125-125';
		case 'line':
			return 'M 0 27 l 280 -22';
		case 'oval':
			return 'M.25,62.875C.25,28.2882,56.2144.25,125.25.25s125,28.0382,125,62.625-55.9644,62.625-125,62.625S.25,97.4619.25,62.875';
		case 'spiral':
			return 'M.1848,49.0219a149.3489,149.3489,0,0,1,210.9824-9.8266,119.479,119.479,0,0,1,7.8613,168.786A95.5831,95.5831,0,0,1,84,214.27a76.4666,76.4666,0,0,1-5.0312-108.023';
		default:
			return '';
	}
};
export const pathHeight = ( type ) => {
	switch ( type ) {
		case 'wave':
			return 45;
		case 'arc':
			return 150;
		case 'circle':
			return 250;
		case 'line':
			return 45;
		case 'oval':
			return 150;
		case 'spiral':
			return 250;
		default:
			return 100;
	}
};
