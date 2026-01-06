import globalAttributes from '@Global/AdvancedSettings/attributes';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	queryId: {
		type: 'number',
	},
	query: {
		type: 'object',
		default: {
			perPage: null,
			pages: 0,
			offset: 0,
			postType: 'post',
			order: 'desc',
			orderBy: 'date',
			author: '',
			search: '',
			exclude: [],
			sticky: '',
			inherit: false,
			taxQuery: null,
			parents: [],
			format: [],
		},
	},
	tagName: {
		type: 'string',
		default: 'div',
	},
	selectedVariation: {
		type: 'string',
		default: '',
	},
	showOffset: {
		type: 'boolean',
		default: false,
	},
	...globalAttributes,
};
export default attributes;
