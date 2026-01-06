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
	form_title: {
		type: 'string',
		default: 'RESET YOUR PASSWORD',
	},
	username_label: {
		type: 'string',
		default: 'Username or Email Address',
	},
	reset_button_label: {
		type: 'string',
		default: 'Get New Password',
	},
	login_button_label: {
		type: 'string',
		default: 'Back To Login',
	},
	show_logged_in_message: {
		type: 'boolean',
		default: true,
	},
	form_background_color: {
		type: 'string',
		default: '#fff',
	},
	form_background_hover_color: {
		type: 'string',
		default: '#fff',
	},
	label_color: {
		type: 'string',
		default: '#000',
	},
	input_field_color: {
		type: 'string',
		default: '#fff',
	},
	button_color: {
		type: 'string',
		default: '#fff',
	},
	button_hover_color: {
		type: 'string',
		default: '#fff',
	},
	button_background_color: {
		type: 'string',
		default: '#7B68EE',
	},
	button_background_hover_color: {
		type: 'string',
		default: '#6F5DD6',
	},
	form_title_color: {
		type: 'string',
		default: '#333',
	},
	form_footer_title_color: {
		type: 'string',
		default: '#333',
	},
	...typographyAttributes( 'label_typography', true ),
	...typographyAttributes( 'input_field_typography', true ),
	...typographyAttributes( 'button_typography', true ),
	...typographyAttributes( 'form_title_typography', true ),
	...typographyAttributes( 'form_footer_title_typography', true ),
	...getBackgroundAttribute( 'card_background', true ),
	...getBorderAttributes( 'form_border', true ),
	...getBorderAttributes( 'input_border', true ),
	...getBorderAttributes( 'button_border', true ),
	...getDimensionsAttributes( 'card_margin', true ),
	...getDimensionsAttributes( 'button_padding', true ),
	...getDimensionsAttributes( 'form_padding', true ),
	...getDimensionsAttributes( 'input_padding', true ),
	...getBackgroundAttribute( 'wish_icon_background', true ),
	...globalAttributes,
};
export default attributes;
