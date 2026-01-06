import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

export const sliderPosition = getRangeAttributes( {
	attributeName: 'sliderPosition',
	isResponsive: false,
	defaultValue: 50,
	copyStyle: true,
} );

export const sliderBarSize = getRangeAttributes( {
	attributeName: 'sliderBarSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 4,
	copyStyle: true,
} );

export const sliderIconSize = getRangeAttributes( {
	attributeName: 'sliderIconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 50,
	copyStyle: true,
} );

export const sliderIconBorderSize = getRangeAttributes( {
	attributeName: 'sliderIconBorderSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 2,
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	beforeImage: {
		type: 'string',
		default: '',
	},
	afterImage: {
		type: 'string',
		default: '',
	},

	...sliderPosition,
	sliderOrientation: {
		type: 'string',
		default: 'horizontal',
		copyStyle: true,
	},

	// labels
	showLabels: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	labelPosition: {
		type: 'number',
		default: 45,
		copyStyle: true,
	},
	labelBgColor: {
		type: 'string',
		default: 'rgba(0, 0, 0, 0.5)',
		copyStyle: true,
	},
	labelTextColor: {
		type: 'string',
		default: 'white',
		copyStyle: true,
	},
	labelWithOverlay: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	labelOverlayColor: {
		type: 'string',
		default: 'rgba(0, 0, 0, 0.5)',
		copyStyle: true,
	},

	...getBorderAttributes( 'labelBorder', true ),
	labelOnHover: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},

	//   overlay
	beforeImageLabel: {
		type: 'string',
		default: 'Before',
	},
	afterImageLabel: {
		type: 'string',
		default: 'After',
	},

	// handle
	showHandle: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	moveOnHover: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	...sliderBarSize,
	...sliderIconSize,
	...sliderIconBorderSize,
	handleColor: {
		type: 'string',
		default: 'white',
		copyStyle: true,
	},

	// settings
	swapImages: {
		type: 'boolean',
		default: false,
	},

	...globalAttributes,
};
export default attributes;
