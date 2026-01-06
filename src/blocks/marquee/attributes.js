import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const gap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: false,
	unitDefaultValue: 'px',
	defaultValue: 12,
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
	marqueeSlideLength: {
		type: 'number',
		default: 0,
	},
	pauseOnHover: {
		type: 'boolean',
		default: true,
	},
	marqueeDirection: {
		type: 'string',
		default: 'left',
	},
	marqueeSpeed: {
		type: 'number',
		default: 10,
	},
	loop: {
		type: 'boolean',
		default: false,
	},
	loopCount: {
		type: 'number',
		default: 2,
	},
	enableShadow: {
		type: 'boolean',
		default: true,
	},
	...gap,
	...globalAttributes,
};
export default attributes;
