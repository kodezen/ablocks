import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	placeholder: {
		type: 'string',
		default: 'Search Course',
	},
	search_box_color: {
		type: 'string',
		default: '#000',
	},
	search_placeholder_color: {
		type: 'string',
		default: '#444',
	},
	search_icon_color: {
		type: 'string',
		default: '#333',
	},
	search_background_color: {
		type: 'string',
		default: '#fff',
	},

	...typographyAttributes( 'search_typography', true ),
	...getBorderAttributes( 'search_border', true ),
	...globalAttributes,
};
export default attributes;
