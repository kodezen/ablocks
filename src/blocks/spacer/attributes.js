import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const spacerHeight = getRangeAttributes( {
	attributeName: 'spacerHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 50,
	hasUnit: true,
	unitDefaultValue: 'px',
	unitDefaultValueTablet: 'px',
	unitDefaultValueMobile: 'px',
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
	...spacerHeight,
	...globalAttributes,
};
export default attributes;
