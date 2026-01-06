import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBackgroundAttribute } from '@Controls/background/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	course_count: {
		type: 'number',
		default: 3,
	},
	course_columns: {
		type: 'number',
		default: 3,
		copyStyle: true,
	},
	show_pagination: {
		type: 'boolean',
		default: true,
	},
	difficulty_levels: {
		type: 'array',
		default: [],
	},
	price_types: {
		type: 'array',
		default: [],
	},
	order_by: {
		type: 'string',
		default: 'date',
	},
	course_order: {
		type: 'string',
		default: 'DESC',
	},
	course_ids: {
		type: 'array',
		default: [],
	},
	course_categories: {
		type: 'array',
		default: [],
	},
	course_tags: {
		type: 'array',
		default: [],
	},
	course_exclude_ids: {
		type: 'array',
		default: [],
	},
	course_exclude_categories: {
		type: 'array',
		default: [],
	},
	course_exclude_tags: {
		type: 'array',
		default: [],
	},
	category_color: {
		type: 'string',
		default: '#000',
		copyStyle: true,
	},
	category_hover_color: {
		type: 'string',
		default: '#000',
		copyStyle: true,
	},
	title_color: {
		type: 'string',
		default: '#333',
		copyStyle: true,
	},
	title_hover_color: {
		type: 'string',
		default: '#333',
		copyStyle: true,
	},
	author_color: {
		type: 'string',
		default: '#333',
		copyStyle: true,
	},
	author_hover_color: {
		type: 'string',
		default: '#333',
		copyStyle: true,
	},
	rating_color: {
		type: 'string',
		default: '#5a3d00',
		copyStyle: true,
	},
	rating_hover_color: {
		type: 'string',
		default: '#5a3d00',
		copyStyle: true,
	},
	price_color: {
		type: 'string',
		default: '#1a1a1a',
		copyStyle: true,
	},
	price_hover_color: {
		type: 'string',
		copyStyle: true,
		default: '#1a1a1a',
	},
	wish_icon_color: {
		type: 'string',
		copyStyle: true,
		default: '#999',
	},
	wish_icon_hover_color: {
		type: 'string',
		copyStyle: true,
		default: '#999',
	},
	...typographyAttributes( 'cat_typography', true ),
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
