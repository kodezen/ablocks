import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const space = getRangeAttributes( {
	attributeName: 'space',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
	copyStyle: true,
} );
export const gap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
	copyStyle: true,
} );
export const toggleWidth = getRangeAttributes( {
	attributeName: 'toggleWidth',
	isResponsive: false,
	defaultValue: 60,
	copyStyle: true,
} );
export const toggleHeight = getRangeAttributes( {
	attributeName: 'toggleHeight',
	isResponsive: false,
	defaultValue: 28,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	isSwitch: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	leftLabel: {
		type: 'string',
		default: 'Monthly',
	},
	rightLabel: {
		type: 'string',
		default: 'Yearly',
	},
	...gap,
	toggleBarBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...toggleWidth,
	...toggleHeight,
	labelNormalColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	labelActiveColor: {
		type: 'string',
		default: '#562DD4',
		copyStyle: true,
	},
	toggleNormalColor: {
		type: 'string',
		default: 'white',
		copyStyle: true,
	},
	toggleNormalBgColor: {
		type: 'string',
		default: '#562DD4',
		copyStyle: true,
	},
	toggleActiveColor: {
		type: 'string',
		default: 'white',
		copyStyle: true,
	},
	toggleActiveBgColor: {
		type: 'string',
		default: '#d4552d',
		copyStyle: true,
	},
	...alignmentAttributes( 'alignment', true, {
		value: 'center',
	} ),
	...buttonGroupAttributes( 'toggleDirection', false, {
		value: 'row',
	} ),
	...buttonGroupAttributes( 'labelColorState', false, {
		value: 'normal',
	} ),
	...buttonGroupAttributes( 'toggleColorState', false, {
		value: 'normal',
	} ),
	...typographyAttributes( 'labelTypography', true ),
	...space,
	...getDimensionsAttributes( 'toggleBarPadding', true ),
	...getBorderAttributes( 'toggleBarBorder', true ),
	...globalAttributes,
};
export default attributes;
