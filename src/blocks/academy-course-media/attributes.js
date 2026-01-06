import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

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
	imageOpacity: {
		type: 'number',
		default: 1,
	},
	imageOpacityH: {
		type: 'number',
		default: 1,
	},
	...getAlignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...getBorderAttributes( 'border', true ),
	...getBoxShadowAttributes( 'boxShadow' ),
	...imageWidthAttribute,
	...imageHeightAttribute,
	...globalAttributes,
};
export default attributes;
