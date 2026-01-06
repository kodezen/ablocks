import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const inputWidth = getRangeAttributes( {
	attributeName: 'inputWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 18,
	defaultValueTablet: 18,
	defaultValueMobile: 12,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const buttonWidth = getRangeAttributes( {
	attributeName: 'buttonWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 18,
	defaultValueTablet: 18,
	defaultValueMobile: 12,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
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
	input_placeholder: {
		type: 'string',
		default: '',
	},
	buttonColor: {
		type: 'string',
		default: '',
	},
	buttonColorH: {
		type: 'string',
		default: '',
	},
	buttonBackground: {
		type: 'string',
		default: '',
	},
	buttonBackgroundH: {
		type: 'string',
		default: '',
	},
	buttonTitle: {
		type: 'string',
		default: '',
	},
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'inputBorder', true ),
	...getBorderAttributes( 'buttonBorder', true ),
	...buttonGroupAttributes( 'direction', true, {
		value: 'column',
	} ),
	...alignmentAttributes( 'formAlignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'buttonTypography', true ),
	...globalAttributes,
	...getBoxShadowAttributes( 'boxShadow' ),
	...inputWidth,
	...buttonWidth,
};
export default attributes;
