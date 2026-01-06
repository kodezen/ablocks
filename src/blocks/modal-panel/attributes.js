import globalAttributes from '@Global/AdvancedSettings/attributes';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	noCloseButton: {
		type: 'boolean',
		default: false,
	},

	...globalAttributes,
};

export default attributes;
