import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';

// export const button_width = getRangeAttributes( {
// 	attributeName: 'button_width',
// 	attributeObjectKey: 'value',
// 	isResponsive: true,
// 	defaultValue: 100,
// 	hasUnit: true,
// 	unitDefaultValue: '%',
// 	unitDefaultValueTablet: '%',
// 	unitDefaultValueMobile: '%',
// } );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	iconColor: {
		type: 'string',
		default: '#111',
	},
	iconColorH: {
		type: 'string',
		default: '#111',
	},
	countBg: {
		type: 'string',
		default: '#008DFF',
	},
	countBgH: {
		type: 'string',
		default: '#008DFF',
	},
	countColor: {
		type: 'string',
		default: '#fff',
	},
	countColorH: {
		type: 'string',
		default: '#fff',
	},
	...typographyAttributes( 'countTypography', true ),
	...globalAttributes,
};
export default attributes;
