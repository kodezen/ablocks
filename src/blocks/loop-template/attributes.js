import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as dimensionsAttributes } from '@Controls/dimensions/helper';
export const itemGap = getRangeAttributes( {
	attributeName: 'itemGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	unitDefaultValue: 'px',
	defaultValue: 20,
	hasUnit: false,
	copyStyle: true,
} );
export const templateGridColumns = getRangeAttributes( {
	attributeName: 'templateGridColumns',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 2,
	defaultValueTablet: 2,
	defaultValueMobile: 1,
	hasUnit: false,
	unitDefaultValue: '',
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
	},
	gridColumns: {
		type: 'number',
		default: 2,
	},
	...templateGridColumns,
	bgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...itemGap,
	gridStyle: {
		type: 'string',
		default: 'grid',
	},
	...getBorderAttributes( 'border', true ),
	...dimensionsAttributes( 'padding', false ),
};
export default attributes;
