import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

const iconAttributes = {
	//icon starts
	iconPrimaryColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	iconBackgroundColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	iconTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},

	// icon starts
	...iconPickerAttributes( 'icon', {
		color: '#000000',
		hasNoSelectorOrSource: true,
	} ),
	...getDimensionsAttributes( 'iconMargin', true ),
	...getLinkAttributes( 'iconLink' ),
	...alignmentAttributes( 'iconAlignment', true ),
};
export default iconAttributes;
