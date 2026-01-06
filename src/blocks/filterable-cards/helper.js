import { __ } from '@wordpress/i18n';
export const columnOptions = [
	{ label: '1 Columns', value: 1 },
	{ label: '2 Columns', value: 2 },
	{ label: '3 Columns', value: 3 },
	{ label: '4 Columns', value: 4 },
	{ label: '5 Columns', value: 5 },
	{ label: '6 Columns', value: 6 },
	{ label: '7 Columns', value: 7 },
	{ label: '8 Columns', value: 8 },
	{ label: '9 Columns', value: 9 },
	{ label: '10 Columns', value: 10 },
];
export const animationOptions = [
	{ label: 'Fade In', value: 'fade-in' },
	{ label: 'Slide Up', value: 'slide-up' },
	{ label: 'Zoom In', value: 'zoom-in' },
	{ label: 'Rotate', value: 'rotate' },
	{ label: 'Slide-in from Left', value: 'slide-in-left' },
	{ label: 'Slide-in from Right', value: 'slide-in-right' },
];
export const numberMenuAlignment = [
	{
		label: __( 'Flex Start', 'ablocks' ),
		value: 'flex-start',
		icon: 'left',
	},
	{
		label: __( 'Center', 'ablocks' ),
		value: 'center',
		icon: 'center',
	},
	{
		label: __( 'Flex End', 'ablocks' ),
		value: 'flex-end',
		icon: 'right',
	},
	{
		label: __( 'Space Between', 'ablocks' ),
		value: 'space-between',
		icon: 'justify',
	},
];
export const searchDownIcon = (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
	>
		<g clipPath="url(#clip0_9663_5064)">
			<path
				d="M16.25 7.5L10 13.75L3.75 7.5"
				stroke="#13191B"
				strokeWidth="1.25"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
		<defs>
			<clipPath id="clip0_9663_5064">
				<rect width="20" height="20" fill="white" />
			</clipPath>
		</defs>
	</svg>
);
