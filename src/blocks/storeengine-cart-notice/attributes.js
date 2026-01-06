import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';

export const infoBoxWidthAttribute = getRangeAttributes( {
	attributeName: 'infoBoxWidth',
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
	product_id: {
		type: 'number',
		default: 0,
	},
	boxBackground: {
		type: 'string',
		default: '#e1f2ff',
	},
	boxBackgroundH: {
		type: 'string',
		default: '#e1f2ff',
	},
	boxColor: {
		type: 'string',
		default: '#515a62',
	},
	boxColorH: {
		type: 'string',
		default: '#515a62',
	},
	linkColor: {
		type: 'string',
		default: '#101828',
	},
	linkColorH: {
		type: 'string',
		default: '#101828',
	},
	isCustom: {
		type: 'boolean',
		default: false,
	},
	...infoBoxWidthAttribute,
	...alignmentAttributes( 'infoboxAlignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'linkTypography', true ),
	...typographyAttributes( 'infoTypography', true ),
	...getDimensionsAttributes( 'infoBoxPadding', true ),
	...getBorderAttributes( 'infoBoxBorder', true ),
	...getBoxShadowAttributes( 'infoBoxoxShadow', true ),
	...globalAttributes,
};
export default attributes;
