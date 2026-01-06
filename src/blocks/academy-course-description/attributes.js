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

export const textTransition = getRangeAttributes( {
	attributeName: 'textTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );

export const description_transition = getRangeAttributes( {
	attributeName: 'description_transition',
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
	blockVersion: {
		type: 'number',
		default: '2',
	},
	heading_color: {
		type: 'string',
		default: '#111',
	},
	heading_colorH: {
		type: 'string',
		default: '#111',
	},
	description_color: {
		type: 'string',
		default: '#444',
	},
	description_colorH: {
		type: 'string',
		default: '#444',
	},
	...typographyAttributes( 'heading_typography', true ),
	...typographyAttributes( 'description_typography', true ),
	...globalAttributes,
};
export default attributes;
