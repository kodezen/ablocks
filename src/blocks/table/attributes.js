import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	tableCreated: {
		type: 'boolean',
		default: false,
	},
	isHeader: {
		type: 'boolean',
		default: '',
	},
	isFooter: {
		type: 'boolean',
		default: '',
	},
	rowOddColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	rowOddColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	rowEvenColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	rowEvenColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headerColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headerColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	bodyBg: {
		type: 'string',
		copyStyle: true,
	},
	bodyBgH: {
		type: 'string',
		copyStyle: true,
	},
	footerColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	footerColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	borderCollapse: {
		types: 'string',
		default: 'collapse',
	},

	...globalAttributes,
	...getBorderAttributes( 'border', true ),
};
export default attributes;
