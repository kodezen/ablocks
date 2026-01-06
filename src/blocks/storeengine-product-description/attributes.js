import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';

export const imageWidthAttribute = getRangeAttributes( {
	attributeName: 'imageWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	unitDefaultValueTablet: '%',
	unitDefaultValueMobile: '%',
} );

export const imageHeightAttribute = getRangeAttributes( {
	attributeName: 'imageHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	unitDefaultValueTablet: '%',
	unitDefaultValueMobile: '%',
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
	product_id: {
		type: '',
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
	descriptionColor: {
		type: 'string',
		default: '#111',
	},
	descriptionColorH: {
		type: 'string',
		default: '#111',
	},
	isCustom: {
		type: 'boolean',
		default: false,
	},
	...typographyAttributes( 'titleTypography', true ),
	...typographyAttributes( 'descriptionTypography', true ),
	...getBorderAttributes( 'border', true ),
	...globalAttributes,
};
export default attributes;
