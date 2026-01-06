import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';

export const inputWidthAttribute = getRangeAttributes( {
	attributeName: 'inputWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 50,
	hasUnit: true,
	unitDefaultValue: 'px',
} );
export const buttonWidthAttributes = getRangeAttributes( {
	attributeName: 'buttonWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
} );
export const AddButtonWidthAttributes = getRangeAttributes( {
	attributeName: 'AddButtonWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	isCustom: {
		type: 'boolean',
		default: false,
	},
	product_id: {
		type: 'number',
		default: 0,
	},
	titleColor: {
		type: 'string',
		default: '#111',
	},
	titleColorH: {
		type: 'string',
		default: '#111',
	},
	productPriceColor: {
		type: 'string',
		default: '#111',
	},
	productPriceColorH: {
		type: 'string',
		default: '#111',
	},
	inputTextColor: {
		type: 'string',
		default: '#111',
	},
	inputTextColorH: {
		type: 'string',
		default: '#111',
	},
	buttonColor: {
		type: 'string',
		default: '#fff',
	},
	buttonColorH: {
		type: 'string',
		default: '#fff',
	},
	buttonBackground: {
		type: 'string',
		default: '#008DFF',
	},
	buttonBackgroundH: {
		type: 'string',
		default: '#008DFF',
	},
	AddButtonColor: {
		type: 'string',
		default: '#111',
	},
	AddButtonColorH: {
		type: 'string',
		default: '#111',
	},
	AddButtonBackground: {
		type: 'string',
		default: '#fff',
	},
	AddButtonBackgroundH: {
		type: 'string',
		default: '#fff',
	},
	...buttonWidthAttributes,
	...inputWidthAttribute,
	...AddButtonWidthAttributes,
	...alignmentAttributes( 'priceAlign', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'ProductPriceTypography', true ),
	...typographyAttributes( 'inputTextTypography', true ),
	...typographyAttributes( 'btnTypography', true ),
	...typographyAttributes( 'AddBtnTypography', true ),
	...typographyAttributes( 'titleTypography', true ),
	...getDimensionsAttributes( 'inputPadding', true ),
	...getBorderAttributes( 'inputBorder', true ),
	...getDimensionsAttributes( 'buttonPadding', true ),
	...getBorderAttributes( 'buttonBorder', true ),
	...getDimensionsAttributes( 'AddButtonPadding', true ),
	...getBorderAttributes( 'AddButtonBorder', true ),
	...globalAttributes,
};
export default attributes;
