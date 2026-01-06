import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import globalAttributes from '@Global/AdvancedSettings/attributes';
export const hamburgerWidth = getRangeAttributes( {
	attributeName: 'hamburgerWidth',
	isResponsive: false,
	defaultValue: 30,
	copyStyle: true,
	hasUnit: true,
	unitDefaultValue: 'px',
} );
export const hamburgerHeight = getRangeAttributes( {
	attributeName: 'hamburgerHeight',
	isResponsive: false,
	defaultValue: 3,
	unitDefaultValue: 'px',
	hasUnit: true,
} );
export const subMenuWidth = getRangeAttributes( {
	attributeName: 'subMenuWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 250,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	// flex direction start
	alignment: {
		type: 'string',
		default: 'left',
		copyStyle: true,
	},
	...getDimensionsAttributes( 'padding', true ),
	...getBoxShadowAttributes( 'boxShadow', true ),
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
	menuItemDisplay: {
		type: 'string',
		default: 'inline',
	},
	sideBarMenuDevice: {
		type: 'string',
		default: 'mobile',
	},
	...hamburgerWidth,
	...hamburgerHeight,
	hamburgerAlignment: {
		type: 'string',
		default: 'left',
		copyStyle: true,
	},
	hamburgerColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	hamburgerBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	menuResponsiveBackground: {
		type: 'string',
		copyStyle: true,
	},
	menuResponsiveTextColor: {
		type: 'string',
		copyStyle: true,
	},
	subMenuResponsiveColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	subMenuResponsiveBg: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	subMenuItemTextColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	subMenuItemBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	subMenuItemTextColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	subMenuItemBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	subMenuItemTransition: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},

	...getDimensionsAttributes( 'hamburgerPadding', true ),
	...getTypographyAttributes( 'menuItemTypography', true ),
	...getDimensionsAttributes( 'menuItemPadding', true ),
	...getDimensionsAttributes( 'menuItemMargin', true ),
	...getBorderAttributes( 'menuItemBorder', true ),
	...getBorderAttributes( 'hamburgerBorder', true ),
	// subMenu style
	...getDimensionsAttributes( 'subMenuPadding', true ),
	...getBoxShadowAttributes( 'subMenuBoxShadow', true ),
	...getBorderAttributes( 'subMenuBorder', true ),

	...globalAttributes,
};
export default attributes;
