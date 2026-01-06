import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const inputWidth = getRangeAttributes( {
	attributeName: 'inputWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	inputType: {
		type: 'string',
		default: '',
	},
	optionWidth: {
		type: 'number',
		default: 50,
	},
	minimumValue: {
		type: 'number',
		default: 0,
	},
	maximumValue: {
		type: 'number',
		default: 0,
	},
	label: {
		type: 'string',
		default: "What's your favorite programming lang?",
	},
	helperText: {
		type: 'string',
		default: '',
	},
	...inputWidth,
	name: {
		type: 'string',
		default: '',
	},
	radioArr: {
		type: 'array',
		default: [
			{
				id: 1,
				value: 'Javascript',
			},
		],
	},
	markerType: {
		type: 'string',
		default: 'icon',
		copyStyle: true,
	},
	listIcons: {
		type: 'array',
		selector: 'svg.ablocks-svg-icon',
		source: 'query',
		query: {
			viewBox: {
				type: 'string',
				source: 'attribute',
				attribute: 'viewBox',
			},
			path: {
				type: 'string',
				selector: 'path',
				source: 'attribute',
				attribute: 'd',
			},
		},
		copyStyle: true,
	},
	listIconsClasses: {
		type: 'array',
		copyStyle: true,
	},
	...iconPickerAttributes( 'icon', {
		path: 'M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z',
		viewBox: '0 0 512 512',
		className: 'far fa-arrow-alt-circle-up',
		hasNoSelectorOrSource: true,
	} ),
	...globalAttributes,
};

export default attributes;
