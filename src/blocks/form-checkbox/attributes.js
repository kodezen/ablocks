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

	label: {
		type: 'string',
		default: 'Checkbox',
	},
	...inputWidth,
	errorMsg: {
		type: 'string',
		default: 'This field is required',
	},
	helperText: {
		type: 'string',
		default: '',
	},
	inputType: {
		type: 'string',
		default: '',
	},
	name: {
		type: 'string',
		default: '',
	},
	isRequired: {
		type: 'boolean',
		default: false,
	},
	isChecked: {
		type: 'boolean',
		default: false,
	},
	placeholder: {
		type: 'string',
		default: 'Enter your message',
	},
	...globalAttributes,
};
export default attributes;
