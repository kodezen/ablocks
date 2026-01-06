import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const containerWidth = getRangeAttributes( {
	attributeName: 'containerWidth',
	defaultValue: 80,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	backgroundImage: {
		type: 'string',
		default: '',
	},
	pageSize: {
		type: 'string',
		default: 'A4',
	},
	pageOrientation: {
		type: 'string',
		default: 'L',
	},
	imageOptions: {
		type: 'array',
		default: [],
	},
	isCustomImage: {
		type: 'boolean',
		default: false,
	},
	...containerWidth,

	...getDimensionsAttributes( 'certificate_padding', true ),
	...globalAttributes,
};
export default attributes;
