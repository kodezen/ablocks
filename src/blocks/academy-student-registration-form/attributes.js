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
	input_label_color: {
		type: 'string',
		default: '#000',
	},
	input_label_hover_color: {
		type: 'string',
		default: '#000',
	},
	input_field_color: {
		type: 'string',
		default: '#333',
	},
	input_field_placeholder_color: {
		type: 'string',
		default: '#333',
	},
	input_field_bg_color: {
		type: 'string',
		default: '#fff',
	},
	form_button_color: {
		type: 'string',
		default: '#fff',
	},
	form_button_hover_color: {
		type: 'string',
		default: '#fff',
	},
	form_button_background: {
		type: 'string',
		default: '#7B68EE',
	},
	form_button_hover_background: {
		type: 'string',
		default: '#6F5DD6',
	},

	...typographyAttributes( 'input_label_typhography', true ),
	...typographyAttributes( 'form_button_typhography', true ),
	...getBorderAttributes( 'form_field_border', true ),
	...getBorderAttributes( 'form_button_border', true ),
	...getBorderAttributes( 'form_border', true ),
	...getDimensionsAttributes( 'form_button_padding', true ),
	...getDimensionsAttributes( 'form_padding', true ),
	...getBackgroundAttribute( 'form_background', true ),
	...globalAttributes,
};
export default attributes;
