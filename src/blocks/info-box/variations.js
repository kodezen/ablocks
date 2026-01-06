import { plugin_root_url } from '../../utils/helper';

export const variations = [
	{
		name: 'Start',
		icon: (
			<img
				src={ plugin_root_url + 'assets/images/info-box/start.svg' }
				alt="start"
			/>
		),
		attributes: {
			variationSelected: 'row',
			iconAlignment: {
				value: 'flex-start',
			},
			contentAlignment: {
				value: 'flex-start',
			},
		},
		scope: [ 'block' ],
	},
	{
		name: 'Middle',
		icon: (
			<img
				src={ plugin_root_url + 'assets/images/info-box/middle.svg' }
				alt="middle"
			/>
		),
		attributes: {
			variationSelected: 'column',
			iconAlignment: {
				value: 'center',
			},
			contentAlignment: {
				value: 'center',
			},
		},
		scope: [ 'block' ],
	},
	{
		name: 'End',
		icon: (
			<img
				src={ plugin_root_url + 'assets/images/info-box/end.svg' }
				alt="end"
			/>
		),
		attributes: {
			variationSelected: 'row-reverse',
			iconAlignment: {
				value: 'flex-start',
			},
			contentAlignment: {
				value: 'flex-end',
			},
		},
		scope: [ 'block' ],
	},
];
