import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

export const avatarImageHeight = getRangeAttributes( {
	attributeName: 'avatarH',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 62,
	unitDefaultValue: 'px',
} );

export const avatarImageWidth = getRangeAttributes( {
	attributeName: 'avatarW',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 62,
	unitDefaultValue: 'px',
} );

export const starSize = getRangeAttributes( {
	attributeName: 'star_size',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 14,
	unitDefaultValue: 'px',
} );

export const titleTransition = getRangeAttributes( {
	attributeName: 'titleTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );

export const textTransition = getRangeAttributes( {
	attributeName: 'textTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	titleColor: {
		type: 'string',
		default: '#999',
	},
	titleColorH: {
		type: 'string',
		default: '#999',
	},
	textColor: {
		type: 'string',
		default: '#111',
	},
	textColorH: {
		type: 'string',
		default: '#111',
	},
	star_color: {
		type: 'string',
		default: '#f4c150',
	},
	star_colorH: {
		type: 'string',
		default: '#f4c150',
	},
	insColor: {
		type: 'string',
		default: '#111',
	},
	insColorH: {
		type: 'string',
		default: '#111',
	},
	...avatarImageHeight,
	...avatarImageWidth,
	...titleTransition,
	...textTransition,
	...typographyAttributes( 'titleTypography', true ),
	...typographyAttributes( 'insTypography', true ),
	...globalAttributes,
};
export default attributes;
