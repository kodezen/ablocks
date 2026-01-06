import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
export const loadMoreButtonGap = getRangeAttributes( {
	attributeName: 'loadMoreButtonGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	unitDefaultValue: 'px',
	hasUnit: false,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
	},
	taxonomy: {
		type: 'string',
		default: 'category',
	},
	loadMoreButtonText: {
		type: 'string',
		default: 'Load More',
		copyStyle: true,
	},
	noMoreItemsText: {
		type: 'string',
		default: 'No More Items!',
	},
	moreButtonAlignment: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},
	loadMoreButtonTextColor: {
		type: 'string',
		default: '#fff',
		copyStyle: true,
	},
	loadMoreButtonTextColorH: {
		type: 'string',
		default: '#fff',
		copyStyle: true,
	},
	loadMoreButtonBackground: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	loadMoreButtonBackgroundH: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	loadMoreButtonTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	...loadMoreButtonGap,
	...getAlignmentAttributes( 'filterAlignment', true, {
		value: 'Center',
	} ),

	...globalAttributes,
	...getTypographyAttributes( 'moreButtonTypography', true ),
	...getDimensionsAttributes( 'moreButtonPadding', true ),
	...getBorderAttributes( 'moreButtonBorder', true ),
	...getBoxShadowAttributes( 'moreButtonboxShadow' ),
};
export default attributes;
