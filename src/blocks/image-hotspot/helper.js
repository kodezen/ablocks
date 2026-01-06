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
		title: __( 'Align text left', 'ablocks' ),
		align: 'left',
	},
	{
		icon: alignCenter,
		title: __( 'Align text center', 'ablocks' ),
		align: 'center',
	},
	{
		icon: alignRight,
		title: __( 'Align text right', 'ablocks' ),
		align: 'right',
	},
	{
		icon: alignJustify,
		title: __( 'Align text justify', 'ablocks' ),
		align: 'justify',
	},
];

export const AnimationTypeOptions = [
	{
		label: __( 'Puls Effect', 'ablocks' ),
		value: 'ablocks-hotspot-puls-effect 1s ease infinite',
	},
	{
		label: __( 'Soft Beat', 'ablocks' ),
		value: 'ablocks-hotspot-soft-beat 1.5s ease-in-out infinite',
	},
	{
		label: __( 'Glow', 'ablocks' ),
		value: 'ablocks-hotspot-glow 2s ease-in-out infinite',
	},
	{ label: __( 'None', 'ablocks' ), value: '' },
];

export const contentTriggerOptions = [
	{ label: __( 'On Hover', 'ablocks' ), value: 'onHover' },
	{ label: __( 'On Click', 'ablocks' ), value: 'onClick' },
];

export const TooltipAnimationOptions = [
	{ label: __( 'Fade In', 'ablocks' ), value: 'ablocks-hotspot-fadeIn' },
	{ label: __( 'Fade Grow', 'ablocks' ), value: 'ablocks-hotspot-fadeGrow' },
	{
		label: __( 'Slide In Top', 'ablocks' ),
		value: 'ablocks-hotspot-slideInTop',
	},
	{
		label: __( 'Slide In Bottom', 'ablocks' ),
		value: 'ablocks-hotspot-slideInBottom',
	},
	{
		label: __( 'Slide In Left', 'ablocks' ),
		value: 'ablocks-hotspot-slideInLeft',
	},
	{
		label: __( 'Slide In Right', 'ablocks' ),
		value: 'ablocks-hotspot-slideInRight',
	},
	{ label: __( 'None', 'ablocks' ), value: '' },
];

export const ContentPositionOptions = [
	{ label: __( 'Top', 'ablocks' ), value: 'top' },
	{ label: __( 'Bottom', 'ablocks' ), value: 'bottom' },
	{ label: __( 'Left', 'ablocks' ), value: 'left' },
	{ label: __( 'Right', 'ablocks' ), value: 'right' },
];

export const ImageSizeOptions = [
	{ label: __( 'Full', 'ablocks' ), value: 'full' },
	{ label: __( 'Large', 'ablocks' ), value: 'large' },
	{ label: __( 'Medium', 'ablocks' ), value: 'medium' },
	{ label: __( 'Thumbnail', 'ablocks' ), value: 'thumbnail' },
];
