import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBackgroundAttribute } from '@Controls/background/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	tableBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tableBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tableTransition: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	tableRowBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	tableRowBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	thumbImage: {
		type: 'number',
		default: 120,
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
	productSubTiteColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	productSubTiteColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	productPriceColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	productPriceColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...typographyAttributes( 'tableHeaderTypography', true ),
	...typographyAttributes( 'productTilteTypography', true ),
	...typographyAttributes( 'productsubTitleTypography', true ),
	...typographyAttributes( 'productPriceTypography', true ),
	...globalAttributes,
};
export default attributes;
