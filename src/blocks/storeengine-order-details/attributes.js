import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const imageWidth = getRangeAttributes( {
	attributeName: 'imageWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	unitDefaultValue: 'px',
	hasUnit: false,
	copyStyle: true,
} );
export const imageHeight = getRangeAttributes( {
	attributeName: 'imageHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	unitDefaultValue: 'px',
	hasUnit: false,
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	titleColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	titleColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	productTitleColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	productTitleColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	discountPriceColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	discountPriceColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	regularPriceColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	regularPriceColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	qualityColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	qualityColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tableTextColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tableTextColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...imageWidth,
	...typographyAttributes( 'titleTypography', true ),
	...typographyAttributes( 'ProductTitleTypography', true ),
	...typographyAttributes( 'discountPriceTypography', true ),
	...typographyAttributes( 'qualityTypography', true ),
	...typographyAttributes( 'tableTextTypography', true ),
	...globalAttributes,
};
export default attributes;
