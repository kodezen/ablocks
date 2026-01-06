import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
export const FilterBtnGap = getRangeAttributes( {
	attributeName: 'FilterBtnGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
	hasUnit: true,
	unitDefaultValue: 'px',
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	taxonomy: {
		type: 'string',
		default: 'category',
	},
	taxonomy_term_items: {
		type: 'array',
		default: [],
	},
	filterBtnTextColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	filterBtnBgColor: {
		type: 'string',
		default: '#F4F4F5',
		copyStyle: true,
	},
	activeBtnTextColor: {
		type: 'string',
		default: '#FFFFFF',
		copyStyle: true,
	},
	activeBtnBgColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	...buttonGroupAttributes( 'buttonAlignment', false, {
		value: 'row',
	} ),
	...alignmentAttributes( 'filterBtnAlignment', false, {
		value: 'center',
	} ),
	...alignmentAttributes( 'rowAlignBtn', false, {
		value: 'center',
	} ),
	...typographyAttributes( 'typography', true ),
	...FilterBtnGap,
	...globalAttributes,
	...getBorderAttributes( 'filterBtnBorder', true ),
	...getBorderAttributes( 'activeBtnBorder', true ),
	...getDimensionsAttributes( 'filterButtonMargin', true ),
	...getDimensionsAttributes( 'filterButtonPadding', true ),
};
export default attributes;
