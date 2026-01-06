import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const containerWidth = getRangeAttributes( {
	attributeName: 'containerWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	defaultValue: 250,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	floatAlignment: {
		type: 'object',
		default: '',
	},

	floatMargin: {
		type: 'object',
		default: '',
	},
	variationSelected: {
		type: 'boolean',
		default: false,
	},
	...containerWidth,
	...globalAttributes,
};
export default attributes;
