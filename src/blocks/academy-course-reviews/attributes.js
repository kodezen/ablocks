import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

export const transition = getRangeAttributes( {
	attributeName: 'transition',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const avgTransition = getRangeAttributes( {
	attributeName: 'avg_transition',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const listT = getRangeAttributes( {
	attributeName: 'listT',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const sectionWidth = getRangeAttributes( {
	attributeName: 'section_width',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 100,
	unitDefaultValue: '%',
} );
export const sectionHeight = getRangeAttributes( {
	attributeName: 'section_height',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 100,
	unitDefaultValue: '%',
} );
export const ratingSize = getRangeAttributes( {
	attributeName: 'rating_size',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 16,
	unitDefaultValue: 'px',
} );
export const startSize = getRangeAttributes( {
	attributeName: 'startSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 12,
	unitDefaultValue: 'px',
} );
export const ratingTransition = getRangeAttributes( {
	attributeName: 'rating_transition',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const totalTransition = getRangeAttributes( {
	attributeName: 'total_transition',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const startT = getRangeAttributes( {
	attributeName: 'startT',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const fillT = getRangeAttributes( {
	attributeName: 'fillT',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const fillAT = getRangeAttributes( {
	attributeName: 'fillAT',
	attributeObjectKey: 'value',
	isResponsive: false,
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
	heading_color: {
		type: 'string',
		default: '#111',
	},
	heading_color_hover: {
		type: 'string',
		default: '#111',
	},
	section_bg: {
		type: 'string',
		default: '#fff',
	},
	section_bg_hover: {
		type: 'string',
		default: '#fff',
	},
	avg_color: {
		type: 'string',
		default: '#111',
	},
	avg_color_hover: {
		type: 'string',
		default: '#111',
	},
	rating_color: {
		type: 'string',
		default: '#f4c150',
	},
	rating_color_hover: {
		type: 'string',
		default: '#f4c150',
	},
	total_rating_hover: {
		type: 'string',
		default: '#999',
	},
	total_rating_color: {
		type: 'string',
		default: '#999',
	},
	listColor: {
		type: 'string',
		default: '#999',
	},
	listColorH: {
		type: 'string',
		default: '#999',
	},
	starColor: {
		type: 'string',
		default: '#f4c150',
	},
	starColorH: {
		type: 'string',
		default: '#f4c150',
	},
	fillBg: {
		type: 'string',
		default: '#e7e7e7',
	},
	fillBgH: {
		type: 'string',
		default: '#e7e7e7',
	},
	fillABg: {
		type: 'string',
		default: '#f4c150',
	},
	fillABgH: {
		type: 'string',
		default: '#f4c150',
	},
	...startSize,
	...startT,
	...fillT,
	...fillAT,
	...listT,
	...avgTransition,
	...transition,
	...globalAttributes,
	...ratingSize,
	...ratingTransition,
	...totalTransition,
	...typographyAttributes( 'heading_typography', true ),
	...typographyAttributes( 'listTypography', true ),
	...typographyAttributes( 'total_typography', true ),
	...typographyAttributes( 'avg_typography', true ),
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'border', true ),
	...getBoxShadowAttributes( 'boxShadow' ),
};
export default attributes;
