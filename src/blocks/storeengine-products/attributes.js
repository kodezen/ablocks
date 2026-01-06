import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBackgroundAttribute } from '@Controls/background/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const buttonWidth = getRangeAttributes( {
	attributeName: 'buttonWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	unitDefaultValue: 'px',
	hasUnit: false,
	copyStyle: true,
} );
export const buttonDriection = getRangeAttributes( {
	attributeName: 'buttonDriection',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 'column',
	unitDefaultValue: '',
	hasUnit: false,
	copyStyle: true,
} );
export const buttonGap = getRangeAttributes( {
	attributeName: 'buttonGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	unitDefaultValue: 'px',
	hasUnit: false,
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	products_count: {
		type: 'number',
		default: 3,
	},
	products_columns: {
		type: 'number',
		default: 3,
		copyStyle: true,
	},
	show_pagination: {
		type: 'boolean',
		default: true,
	},
	price_types: {
		type: 'array',
		default: [],
	},
	order_by: {
		type: 'string',
		default: 'date',
	},
	products_order: {
		type: 'string',
		default: 'DESC',
	},
	products_ids: {
		type: 'array',
		default: [],
	},
	products_categories: {
		type: 'array',
		default: [],
	},
	products_tags: {
		type: 'array',
		default: [],
	},
	products_exclude_ids: {
		type: 'array',
		default: [],
	},
	products_exclude_categories: {
		type: 'array',
		default: [],
	},
	products_exclude_tags: {
		type: 'array',
		default: [],
	},
	title_color: {
		type: 'string',
		default: '#008DFF',
		copyStyle: true,
	},
	title_hover_color: {
		type: 'string',
		default: ' ',
		copyStyle: true,
	},
	price_color: {
		type: 'string',
		default: ' ',
		copyStyle: true,
	},
	price_hover_color: {
		type: 'string',
		copyStyle: true,
		default: ' ',
	},
	cart_button_color: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	cart_button_hover_color: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	cart_button_text_color: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	cart_button_text_hover_color: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	cart_button_transition: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	...buttonDriection,
	...buttonGap,
	...buttonWidth,
	...typographyAttributes( 'cat_typography', true ),
	...typographyAttributes( 'cart_button_typography', true ),
	...typographyAttributes( 'title_typography', true ),
	...typographyAttributes( 'author_typography', true ),
	...typographyAttributes( 'rating_typography', true ),
	...typographyAttributes( 'price_typography', true ),
	...getBackgroundAttribute( 'card_background', true ),
	...getBorderAttributes( 'card_border', true ),
	...getDimensionsAttributes( 'card_margin', true ),
	...getDimensionsAttributes( 'card_hover_margin', true ),
	...getDimensionsAttributes( 'card_padding', true ),
	...getDimensionsAttributes( 'card_hover_padding', true ),
	...getBackgroundAttribute( 'wish_icon_background', true ),
	...globalAttributes,
};
export default attributes;
