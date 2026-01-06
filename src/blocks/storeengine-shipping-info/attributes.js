import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	shipping_heading_color: {
		type: 'string',
		default: '',
	},
	shipping_heading_hover_color: {
		type: 'string',
		default: '',
	},
	shipping_address_color: {
		type: 'string',
		default: '#000000',
	},
	shipping_address_hover_color: {
		type: 'string',
		default: '#000000',
	},
	...typographyAttributes( 'shipping_heading_typograhy', true ),
	...typographyAttributes( 'shipping_address_typograhy', true ),
	...globalAttributes,
};
export default attributes;
