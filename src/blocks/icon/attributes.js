import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	...iconPickerAttributes(),
	...getLinkAttributes( 'link' ),
	...alignmentAttributes( 'alignment', true, {
		value: 'flex-start',
	} ),
	...globalAttributes,
};
export default attributes;
