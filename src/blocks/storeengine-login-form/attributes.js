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
	form_title: {
		type: 'string',
		default: 'Log In into your Account',
	},
	username_label: {
		type: 'string',
		default: 'Username or Email Address',
	},
	username_placeholder: {
		type: 'string',
		default: 'Username or Email Address',
	},
	password_label: {
		type: 'string',
		default: 'Password',
	},
	password_placeholder: {
		type: 'string',
		default: 'Password',
	},
	remember_label: {
		type: 'string',
		default: 'Remember me',
	},
	login_button_label: {
		type: 'string',
		default: 'Log In',
	},
	reset_password_label: {
		type: 'string',
		default: 'Reset password',
	},
	show_logged_in_message: {
		type: 'boolean',
		default: true,
	},
	customer_register_url: {
		type: 'string',
		default: '',
	},
	login_redirect_url: {
		type: 'string',
		default: '',
	},
	logout_redirect_url: {
		type: 'string',
		default: '',
	},
	login_btn_color: {
		type: 'string',
		default: '#fff',
	},
	login_btn_bg_color: {
		type: 'string',
		default: '#7B68EE',
	},
	login_btn_bg_hover_color: {
		type: 'string',
		default: '#6F5DD6',
	},
	login_btn_hover_color: {
		type: 'string',
		default: '#fff',
	},
	title_color: {
		type: 'string',
		default: '#000',
	},
	title_hover_color: {
		type: 'string',
		default: '#000',
	},
	input_field_label_color: {
		type: 'string',
		default: '#333',
	},
	input_field_label_hover_color: {
		type: 'string',
		default: '#333',
	},
	form_footer_title_color: {
		type: 'string',
		default: '#000',
	},
	inputFieldColor: {
		type: 'string',
		default: '#333',
	},
	inputFieldColorH: {
		type: 'string',
		default: '#333',
	},
	input_field_bg_color: {
		type: 'string',
		default: '#fff',
	},
	input_field_bg_hover_color: {
		type: 'string',
		default: '#fff',
	},

	...typographyAttributes( 'login_btn_typography', true ),
	...typographyAttributes( 'title_typography', true ),
	...typographyAttributes( 'input_field_label_typography', true ),
	...typographyAttributes( 'form_footer_title_typography', true ),
	...getBackgroundAttribute( 'form_bg_color', true ),
	...getBorderAttributes( 'input_field_border', true ),
	...getBorderAttributes( 'form_border', true ),
	...getDimensionsAttributes( 'input_field_padding', true ),
	...getDimensionsAttributes( 'form_padding', true ),
	...globalAttributes,
};
export default attributes;
