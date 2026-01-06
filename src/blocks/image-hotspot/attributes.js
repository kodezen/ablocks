import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

export const childWidth = getRangeAttributes( {
	attributeName: 'childWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 200,
	hasUnit: true,
	unitDefaultValue: 'px',
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
	backgroundImage: {
		type: 'string',
		default: '',
	},
	activeIndex: {
		type: 'number',
		default: 0,
	},
	// object of image sizes
	imageSizes: {
		type: 'object',
		default: {},
	},
	selectedImageSize: {
		type: 'string',
		default: '',
	},

	pinColor: {
		type: 'string',
		default: '#d9d9d9',
		copyStyle: true,
	},
	pinColorEffect: {
		type: 'string',
		default: '#d9d9d9',
		copyStyle: true,
	},
	pinHoverColor: {
		type: 'string',
		default: '#d9d9d9',
		copyStyle: true,
	},
	pinSize: {
		type: 'number',
		default: 15,
		copyStyle: true,
	},
	pinHoverSize: {
		type: 'number',
		default: 1.5,
		copyStyle: true,
	},
	lists: {
		type: 'array',
		default: [
			{
				id: 0,
				text: 'Your title here 0',
				xAxis: 35,
				yAxis: 32,
				isOpen: false,
				pinColor: '',
				pinColorEffect: '',
				pinHoverColor: '',
				pinSize: '',
				pinHoverSize: '',
			},
		],
	},

	animationType: {
		type: 'string',
		default: 'ablocks-hotspot-puls-effect 1s ease infinite',
		copyStyle: true,
	},
	contentAnimation: {
		type: 'string',
		default: 'ablocks-hotspot-fadeIn',
		copyStyle: true,
	},
	contentTrigger: {
		type: 'string',
		default: 'onClick',
		copyStyle: true,
	},
	contentPosition: {
		type: 'string',
		default: 'bottom',
		copyStyle: true,
	},

	// common child attributes
	backgroundColor: {
		type: 'string',
		default: 'white',
		copyStyle: true,
	},
	...childWidth,
	...getDimensionsAttributes( 'commonChildPadding', true ),
	...getBorderAttributes( 'commonChildBorder', true ),
	...getBoxShadowAttributes( 'commonBoxShadow', true ),
	...globalAttributes,
};
export default attributes;
