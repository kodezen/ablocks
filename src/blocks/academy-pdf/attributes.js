import globalAttributes from '@Global/AdvancedSettings/attributes';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	src: {
		type: 'string',
		default: 'http://example.com/example.pdf',
	},
	width: {
		type: 'string',
		default: '100%',
	},
	height: {
		type: 'string',
		default: '500px',
	},

	...globalAttributes,
};
export default attributes;
