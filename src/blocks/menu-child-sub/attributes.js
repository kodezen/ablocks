import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const width = getRangeAttributes( {
	attributeName: 'width',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	...width,
	position: {
		type: 'string',
		default: 'top-right',
	},
	background: {
		type: 'string',
		default: 'white',
		copyStyle: true,
	},
	...getDimensionsAttributes( 'padding', true ),
	...getBoxShadowAttributes( 'boxShadow', true ),
	...getBorderAttributes( 'border', true ),

	//menu item attribute
	menuItemTextColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	menuItemTextColorH: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	menuItemBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuItemBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuItemTransition: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	menuItemAlign: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuItemAlignTablet: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuItemAlignMobile: {
		type: 'string',
		default: '',
		copyStyle: true,
	},

	menuItemDirection: {
		type: 'string',
		default: 'row',
		copyStyle: true,
	},
	menuItemDirectionTablet: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuItemDirectionMobile: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuItemJustify: {
		type: 'string',
		default: 'space-between',
		copyStyle: true,
	},
	menuItemJustifyTablet: {
		type: 'string',
		default: 'space-between',
		copyStyle: true,
	},
	menuItemJustifyMobile: {
		type: 'string',
		default: 'space-between',
		copyStyle: true,
	},

	...buttonGroupAttributes( 'menuItemJustification', true, {
		value: 'space-between',
	} ),
	...getTypographyAttributes( 'menuItemTypography', true ),
	...getDimensionsAttributes( 'menuItemPadding', true ),
	...getDimensionsAttributes( 'menuItemMargin', true ),
	...getBorderAttributes( 'menuItemBorder', true ),
};
export default attributes;
