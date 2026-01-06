import globalAttributes from '@Global/AdvancedSettings/attributes';
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
	...inputWidth,
	label: {
		type: 'string',
		default: "What's your favorite programming lang?",
	},
	name: {
		type: 'string',
		default: '',
	},
	helperText: {
		type: 'string',
		default: '',
	},
	isRequired: {
		type: 'boolean',
		default: true,
	},
	errorMsg: {
		type: 'string',
		default: 'This field is required',
	},
	options: {
		type: 'array',
		default: [ { id: 1, value: 'javascript' } ],
	},
	...globalAttributes,
};
export default attributes;
