import globalAttributes from '@Global/AdvancedSettings/attributes';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	// Need to write custom attribute
	...globalAttributes,
};
export default attributes;
