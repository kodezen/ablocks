import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
export const filterButtonGap = getRangeAttributes( {
	attributeName: 'filterButtonGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	unitDefaultValue: 'px',
	hasUnit: false,
	copyStyle: true,
} );
export const loadMoreButtonGap = getRangeAttributes( {
	attributeName: 'loadMoreButtonGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	unitDefaultValue: 'px',
	hasUnit: false,
	copyStyle: true,
} );
export const itemGap = getRangeAttributes( {
	attributeName: 'itemGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	unitDefaultValue: 'px',
	defaultValue: 10,
	hasUnit: false,
	copyStyle: true,
} );
export const animationDuration = getRangeAttributes( {
	attributeName: 'animationDuration',
	isResponsive: false,
	defaultValue: 700,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	filterList: {
		type: 'array',
		default: [
			{
				id: 0,
				text: 'All',
				isActive: true,
			},
			{
				id: 1,
				text: 'Item 01',
				isActive: false,
			},
		],
	},
	filterableCardsNumbers: {
		type: 'number',
		default: '5',
		copyStyle: true,
	},
	enableFilter: {
		types: 'boolean',
		default: true,
		copyStyle: true,
	},
	layout: {
		type: 'string',
		default: 'filter',
	},
	searchNotFoundText: {
		type: 'string',
		default: 'No items Found',
	},
	animation: {
		type: 'string',
		default: 'fade-in',
	},
	filterButtonColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	filterButtonColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},

	...filterButtonGap,
	...itemGap,
	gridColumns: {
		types: 'number',
		default: '2',
	},
	gridStyle: {
		type: 'string',
		default: 'grid',
	},
	searchMenuColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	searchMenuColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	searchMenuBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	searchMenuBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	searchMenuTransition: {
		type: 'number',
		default: '',
	},
	searchPlaceHolder: {
		type: 'string',
		default: 'search...',
	},
	cardHeight: {
		type: 'number',
		default: '',
	},
	filterButtonBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	filterButtonBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	filterButtonTransition: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	itemShows: {
		type: 'number',
		default: 6,
		copyStyle: true,
	},
	activeClassColor: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	activeClassBackground: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},

	//button style load more
	loadMoreButton: {
		type: 'boolean',
		default: 'false',
		copyStyle: true,
	},
	moreButtonAlignment: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},
	loadMoreButtonText: {
		type: 'string',
		default: 'Show More',
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
	dataPerPageShow: {
		type: 'number',
		default: '6',
	},
	noMoreItemsText: {
		type: 'string',
		default: 'No More Items!',
	},

	...getAlignmentAttributes( 'filterAlignment', true, {
		value: 'Center',
	} ),

	...globalAttributes,
	...getTypographyAttributes( 'filterButtonTypography', true ),
	...getBorderAttributes( 'filterButtonBorder', true ),
	...getBorderAttributes( 'activeClassBorder', true ),
	...getDimensionsAttributes( 'filterButtonMargin', true ),
	...getDimensionsAttributes( 'filterButtonPadding', true ),
	...getDimensionsAttributes( 'searchMenuMargin', true ),
	...getDimensionsAttributes( 'searchMenuPadding', true ),
	...getBorderAttributes( 'searchMenuBorder', true ),
	//button
	...getTypographyAttributes( 'moreButtonTypography', true ),
	...getDimensionsAttributes( 'moreButtonPadding', true ),
	...getBorderAttributes( 'moreButtonBorder', true ),
	...getBoxShadowAttributes( 'moreButtonboxShadow' ),
};
export default attributes;
