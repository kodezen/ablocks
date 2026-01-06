import globalAttributes from '@Global/AdvancedSettings/attributes';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	steps: {
		type: 'array',
		default: [
			{
				id: 1,
				value: 'Step One',
			},
		],
	},
	...globalAttributes,
};
export default attributes;
