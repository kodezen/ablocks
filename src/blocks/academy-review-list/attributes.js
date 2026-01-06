import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

export const avatarHeight = getRangeAttributes( {
	attributeName: 'avatarHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 50,
	unitDefaultValue: 'px',
} );
export const avatarWidth = getRangeAttributes( {
	attributeName: 'avatarWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 50,
	unitDefaultValue: 'px',
} );
export const iconSize = getRangeAttributes( {
	attributeName: 'iconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 16,
	unitDefaultValue: 'px',
} );
export const authorTransition = getRangeAttributes( {
	attributeName: 'authorTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const dateTransition = getRangeAttributes( {
	attributeName: 'dateTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const desTransition = getRangeAttributes( {
	attributeName: 'desTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const sumTransition = getRangeAttributes( {
	attributeName: 'sumTransition',
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
	course_id: {
		type: 'number',
		default: 0,
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	authorColor: {
		type: 'string',
		default: '#111',
	},
	authorHoverColor: {
		type: 'string',
		default: '#111',
	},
	dateColor: {
		type: 'string',
		default: '#111',
	},
	dateHoverColor: {
		type: 'string',
		default: '#111',
	},
	sumColor: {
		type: 'string',
		default: '#111',
	},
	sumColorH: {
		type: 'string',
		default: '#111',
	},
	iconColor: {
		type: 'string',
		default: '#f4c150',
	},
	iconColorH: {
		type: 'string',
		default: '#f4c150',
	},
	...authorTransition,
	...dateTransition,
	...desTransition,
	...typographyAttributes( 'authorTypography', true ),
	...typographyAttributes( 'sumTypography', true ),
	...typographyAttributes( 'dateTypography', true ),
	...typographyAttributes( 'desTypography', true ),
	...globalAttributes,
};
export default attributes;
