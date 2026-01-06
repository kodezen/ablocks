import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

export const startSize = getRangeAttributes( {
	attributeName: 'startSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 16,
	unitDefaultValue: 'px',
} );
export const boxWidthAttribute = getRangeAttributes( {
	attributeName: 'box_width',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 100,
	unitDefaultValue: '%',
} );

export const boxTransition = getRangeAttributes( {
	attributeName: 'box_transition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const buttonTransitions = getRangeAttributes( {
	attributeName: 'btn_transition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const formTransition = getRangeAttributes( {
	attributeName: 'formTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const startT = getRangeAttributes( {
	attributeName: 'startT',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );
export const formBtnT = getRangeAttributes( {
	attributeName: 'formBtnT',
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
		default: 2,
	},
	course_id: {
		type: 'number',
		default: 0,
	},
	review_bg: {
		type: 'string',
		default: '#fff',
	},
	review_bg_hover: {
		type: 'string',
		default: '#fff',
	},
	review_btn: {
		type: 'string',
		default: '#fff',
	},
	review_btn_hover: {
		type: 'string',
		default: '#fff',
	},
	review_btn_bg: {
		type: 'string',
		default: '#fff',
	},
	review_btn_bg_hover: {
		type: 'string',
		default: '#fff',
	},
	starColor: {
		type: 'string',
		default: '#f4c150',
	},
	starColorH: {
		type: 'string',
		default: '#f4c150',
	},
	formBgH: {
		type: 'string',
		default: '#E5E4E6',
	},
	formBg: {
		type: 'string',
		default: '#E5E4E6',
	},
	formColor: {
		type: 'string',
		default: '#444',
	},
	formColorH: {
		type: 'string',
		default: '#444',
	},
	formBtnColor: {
		type: 'string',
		default: '#fff',
	},
	formBtnColorH: {
		type: 'string',
		default: '#fff',
	},
	formBtnBg: {
		type: 'string',
		default: '#7b68ee',
	},
	formBtnBgH: {
		type: 'string',
		default: '#7b68ee',
	},
	...boxTransition,
	...buttonTransitions,
	...startSize,
	...formTransition,
	...formBtnT,
	...typographyAttributes( 'review_btn_typography', true ),
	...typographyAttributes( 'formTypography', true ),
	...typographyAttributes( 'formBtnTypography', true ),
	...getDimensionsAttributes( 'padding', true ),
	...getDimensionsAttributes( 'button_padding', true ),
	...getDimensionsAttributes( 'formBtnPadding', true ),
	...getBorderAttributes( 'border', true ),
	...getBorderAttributes( 'formBorder', true ),
	...getBoxShadowAttributes( 'boxShadow' ),
	...globalAttributes,
};
export default attributes;
