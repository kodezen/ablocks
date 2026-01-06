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

export const certificateFont = {
	certificateFontVariants: {
		'Abhaya Libre': {
			variants: [ '400', '500', '600', '700', '800' ],
		},
		'Alex Brush': {
			variants: [ '400' ],
		},
		Allura: {
			variants: [ '400' ],
		},
		Cinzel: {
			variants: [ '400', '500', '600', '700' ],
		},
		'DM Sans': {
			variants: [ '400', '500', '600', '700', '900' ],
		},
		'Great Vibes': {
			variants: [ '400' ],
		},
		'Grenze Gotisch': {
			variants: [ '400', '500', '600', '700' ],
		},
		'Libre Baskerville': {
			variants: [ '400', '700' ],
		},
		Lora: {
			variants: [ '400', '500', '600', '700' ],
		},
		Poppins: {
			variants: [ '400', '700' ],
		},
		Roboto: {
			variants: [ '100', '300', '400', '500', '700', '900' ],
		},
	},
	families: [
		{
			label: 'Abhaya Libre',
			value: 'Abhaya Libre',
		},
		{
			label: 'Alex Brush',
			value: 'Alex Brush',
		},
		{
			label: 'Allura',
			value: 'Allura',
		},
		{
			label: 'Cinzel',
			value: 'Cinzel',
		},
		{
			label: 'DM Sans',
			value: 'DM Sans',
		},
		{
			label: 'Great Vibes',
			value: 'Great Vibes',
		},
		{
			label: 'Grenze Gotisch',
			value: 'Grenze Gotisch',
		},
		{
			label: 'Libre Baskerville',
			value: 'Libre Baskerville',
		},
		{
			label: 'Lora',
			value: 'Lora',
		},
		{
			label: 'Poppins',
			value: 'Poppins',
		},
		{
			label: 'Roboto',
			value: 'Roboto',
		},
	],
};
