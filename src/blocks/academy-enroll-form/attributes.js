import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const modalWidth = getRangeAttributes( {
	attributeName: 'modalWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 150,
	defaultValueTablet: 100,
	defaultValueMobile: 80,
	hasUnit: true,
	unitDefaultValue: 'px',
} );

export const bgTransition = getRangeAttributes( {
	attributeName: 'bg_transition',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 150,
	defaultValueTablet: 100,
	defaultValueMobile: 80,
	hasUnit: true,
	unitDefaultValue: 'px',
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
	},
	start_btn_color: {
		type: 'string',
		default: '#fff',
	},
	enroll_btn_color: {
		type: 'string',
		default: '#fff',
	},
	start_btn_color_hover: {
		type: 'string',
		default: '#fff',
	},
	enroll_btn_color_hover: {
		type: 'string',
		default: '#fff',
	},
	start_btn_bg_color: {
		type: 'string',
		default: '#7B68EE',
	},
	enroll_btn_bg_color: {
		type: 'string',
		default: '#7B68EE',
	},
	start_btn_bg_hover_color: {
		type: 'string',
		default: '#6F5DD6',
	},
	enroll_btn_bg_hover_color: {
		type: 'string',
		default: '#6F5DD6',
	},
	layout: {
		type: 'string',
		default: 'legacy',
	},
	massage_title_bg: {
		type: 'string',
		default: '',
	},
	massage_title_color: {
		type: 'string',
		default: '',
	},
	massage_title_hover_bg: {
		type: 'string',
		default: '',
	},
	massage_title_hover_color: {
		type: 'string',
		default: '',
	},
	list_color: {
		type: 'string',
		default: '',
	},
	list_hover_color: {
		type: 'string',
		default: '',
	},
	price_hover_color: {
		type: 'string',
		default: '',
	},
	price_color: {
		type: 'string',
		default: '',
	},
	price_title_hover_color: {
		type: 'string',
		default: '#111',
	},
	price_title_color: {
		type: 'string',
		default: '#111',
	},
	info_color_hover: {
		type: 'string',
		default: '#7b68ee',
	},
	info_color: {
		type: 'string',
		default: '#7b68ee',
	},
	info_bg_hover: {
		type: 'string',
		default: '#eae8fa',
	},
	info_bg: {
		type: 'string',
		default: '#eae8fa',
	},
	...modalWidth,
	...bgTransition,
	...typographyAttributes( 'start_btn_typography', true ),
	...typographyAttributes( 'price_title_typography', true ),
	...typographyAttributes( 'massage_title_typography', true ),
	...typographyAttributes( 'list_typography', true ),
	...typographyAttributes( 'price_typography', true ),
	...typographyAttributes( 'info_typography', true ),
	...getBorderAttributes( 'start_btn_border', true ),
	...getBorderAttributes( 'enroll_btn_border', true ),
	...getDimensionsAttributes( 'start_btn_padding', true ),
	...getDimensionsAttributes( 'enroll_btn_padding', true ),
	...globalAttributes,
};
export default attributes;
