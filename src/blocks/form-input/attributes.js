import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const inputIconSize = getRangeAttributes( {
	attributeName: 'inputIconSize',
	isResponsive: false,
	defaultValue: 28,
	copyStyle: true,
} );
export const inputIconSpace = getRangeAttributes( {
	attributeName: 'inputIconSpace',
	isResponsive: false,
	defaultValue: 38,
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
	// inputWidth: {
	// 	type: 'number',
	// 	default: 100,
	// },
	...inputWidth,
	customName: {
		type: 'string',
		default: '',
	},
	label: {
		type: 'string',
		default: 'Name',
	},
	helperText: {
		type: 'string',
		default: '',
	},
	formType: {
		type: 'string',
		default: '',
	},
	errorMsg: {
		type: 'string',
		default: 'This field is required',
	},
	name: {
		type: 'string',
		default: '',
	},
	placeholder: {
		type: 'string',
		default: 'name',
	},
	inputType: {
		type: 'string',
		default: '',
	},
	isRequired: {
		type: 'boolean',
		default: true,
	},
	nameChangeable: {
		type: 'boolean',
		default: true,
	},
	showIcon: {
		type: 'boolean',
		default: false,
	},
	iconColor: {
		type: 'string',
		default: '',
	},
	...inputIconSize,
	...inputIconSpace,
	...getBorderAttributes( 'border', true ),
	...iconPickerAttributes( 'icon', {
		size: 28,
	} ),
	...buttonGroupAttributes( 'emailType', false, {
		value: 'email',
	} ),
	...globalAttributes,
};
export default attributes;
