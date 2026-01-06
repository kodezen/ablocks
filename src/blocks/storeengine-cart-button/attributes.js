import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';

export const button_width = getRangeAttributes( {
	attributeName: 'button_width',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	unitDefaultValueTablet: '%',
	unitDefaultValueMobile: '%',
} );

export const boxWidth = getRangeAttributes( {
	attributeName: 'boxWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	unitDefaultValueTablet: '%',
	unitDefaultValueMobile: '%',
} );

export const radioHeight = getRangeAttributes( {
	attributeName: 'radioHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 15,
	hasUnit: true,
	unitDefaultValue: 'px',
} );
export const radioWidth = getRangeAttributes( {
	attributeName: 'radioHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 15,
	hasUnit: true,
	unitDefaultValue: 'px',
} );

export const elementGapAttribute = getRangeAttributes( {
	attributeName: 'elementGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 12,
	hasUnit: true,
	unitDefaultValue: 'px',
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
	quantity: {
		type: 'number',
	},
	product_id: {
		type: 'number',
	},
	label: {
		type: 'string',
		default: 'Buy Now',
	},
	direct_checkout: {
		type: 'boolean',
		default: true,
	},
	button_color: {
		type: 'string',
		default: '#fff',
	},
	button_color_hover: {
		type: 'string',
		default: '#fff',
	},
	button_bg: {
		type: 'string',
		default: '#008DFF',
	},
	button_bg_hover: {
		type: 'string',
		default: '#008DFF',
	},
	priceColor: {
		type: 'string',
		default: '#111',
	},
	priceColorH: {
		type: 'string',
		default: '#111',
	},
	priceNameColor: {
		type: 'string',
		default: '#101828',
	},
	priceNameColorH: {
		type: 'string',
		default: '#101828',
	},
	boxBackground: {
		type: 'string',
		default: '#fff',
	},
	boxBackgroundH: {
		type: 'string',
		default: '#fff',
	},
	...button_width,
	...boxWidth,
	...elementGapAttribute,
	...alignmentAttributes( 'buttonAlign', true, {
		value: 'left',
	} ),
	...alignmentAttributes( 'priceAlign', true, {
		value: 'left',
	} ),
	...alignmentAttributes( 'buttonTextAlign', true, {
		value: 'center',
	} ),
	...typographyAttributes( 'btn_typography', true ),
	...typographyAttributes( 'priceTypography', true ),
	...typographyAttributes( 'priceNameTypography', true ),
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'buttonBorder', true ),
	...getBoxShadowAttributes( 'boxShadow', true ),
	...globalAttributes,
};
export default attributes;
