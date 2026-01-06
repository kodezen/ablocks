import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},

	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...getTypographyAttributes( 'typography', true ),
	...globalAttributes,
};
export default attributes;
