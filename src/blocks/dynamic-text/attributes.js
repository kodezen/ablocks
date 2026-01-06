import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { postCountWidth } from '@Blocks/taxonomy-listing/attributes';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	metaKey: {
		type: 'string',
		default: '',
	},
	linkAdd: {
		type: 'boolean',
		default: false,
	},
	trimMode: {
		type: 'boolean',
		default: false,
	},
	dynamicTextColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	trimLimit: {
		type: 'number',
		default: 0,
	},
	trimEndSymbol: {
		type: 'string',
		default: '',
	},
	...getTypographyAttributes( 'dynamicTypography', true ),
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...globalAttributes,
};
export default attributes;
