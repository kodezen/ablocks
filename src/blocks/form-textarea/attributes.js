import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
export const textAreaRow = getRangeAttributes( {
	attributeName: 'textAreaRow',
	isResponsive: false,
	defaultValue: 5,
	copyStyle: true,
} );

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
	...textAreaRow,
	...inputWidth,
	customName: {
		type: 'string',
		default: '',
	},
	name: {
		type: 'string',
		default: '',
	},
	nameType: {
		type: 'string',
		default: '',
	},
	helperText: {
		type: 'string',
		default: '',
	},
	errorMsg: {
		type: 'string',
		default: 'This field is required',
	},
	label: {
		type: 'string',
		default: 'Message',
	},
	isRequired: {
		type: 'boolean',
		default: true,
	},
	placeholder: {
		type: 'string',
		default: 'Enter your message',
	},
	...globalAttributes,
};
export default attributes;
