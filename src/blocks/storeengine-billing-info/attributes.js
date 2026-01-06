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
	address_color: {
		type: 'string',
		default: '',
	},
	address_hover_color: {
		type: 'string',
		default: '',
	},
	heading_color: {
		type: 'string',
		default: '',
	},
	heading_hover_color: {
		type: 'string',
		default: '',
	},
	...typographyAttributes( 'address_typograhy', true ),
	...typographyAttributes( 'heading_typograhy', true ),
	...globalAttributes,
};
export default attributes;
