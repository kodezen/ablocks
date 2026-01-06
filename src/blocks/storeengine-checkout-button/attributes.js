import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const buttonWidth = getRangeAttributes( {
	attributeName: 'buttonWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	unitDefaultValue: '%',
	hasUnit: true,
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
	buttonColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...buttonWidth,
	...alignmentAttributes( 'buttonAlignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'buttonTypography', true ),
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'buttonBorder', true ),
	...getBoxShadowAttributes( 'boxShadow' ),
	...globalAttributes,
};
export default attributes;
