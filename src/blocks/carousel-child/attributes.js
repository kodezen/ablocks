import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},

	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
};
export default attributes;
