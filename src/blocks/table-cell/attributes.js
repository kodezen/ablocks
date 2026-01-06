import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	tagName: {
		type: 'string',
		default: 'td',
	},
	cellColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	cellColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	rowSpan: {
		type: 'string',
		default: '1',
	},
	colSpan: {
		type: 'string',
		default: '1',
	},
	...getAlignmentAttributes( 'textAlignment', true, {
		value: 'left',
	} ),
};
export default attributes;
