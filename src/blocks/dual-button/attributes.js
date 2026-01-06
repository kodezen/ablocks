import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getTextShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as groupButtonAttributes } from '@Controls/group-button/helper';

export const gap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 20,
	defaultValueTablet: 20,
	defaultValueMobile: 10,
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
		default: '',
	},
	justifyItems: {
		type: 'string',
		default: 'start',
		copyStyle: true,
	},
	...gap,
	buttonType: {
		type: 'string',
		default: '#ddd',
		copyStyle: true,
	},
	buttonSize: {
		type: 'string',
		default: 'small',
		copyStyle: true,
	},
	textColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	textColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	background: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	backgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	transition: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	...getAlignmentAttributes( 'alignment', true, {
		value: 'flex-start',
	} ),
	...groupButtonAttributes( 'stack', false, {
		value: 'horizontal',
	} ),
	...getTypographyAttributes( 'typography', true ),
	...getTextShadowAttributes( 'textShadow' ),
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'border', true ),
	...globalAttributes,
};
export default attributes;
