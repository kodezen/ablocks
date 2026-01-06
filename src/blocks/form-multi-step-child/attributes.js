import globalAttributes from '@Global/AdvancedSettings/attributes';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	...globalAttributes,
};
export default attributes;
