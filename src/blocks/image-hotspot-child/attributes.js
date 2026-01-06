import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const contentWidth = getRangeAttributes( {
	attributeName: 'contentWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
	},
	hotspotId: {
		type: 'number',
		default: 0,
	},
	backgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...contentWidth,
	...getDimensionsAttributes( 'contentPadding', true ),
	...getBorderAttributes( 'contentBorder', true ),
};

export default attributes;
