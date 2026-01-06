import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const bothGap = getRangeAttributes( {
	attributeName: 'bothGap',
	defaultValue: 30,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	dashboard_page: {
		type: 'string',
		default: '',
	},
	sidebarBackground: {
		type: 'object',
		default: '',
	},
	contentBackground: {
		type: 'object',
		default: '',
	},
	menuListActiveBackground: {
		type: 'string',
		default: '',
	},
	menuListActiveTextColor: {
		type: 'string',
		default: '',
	},
	menuListHoverBackground: {
		type: 'string',
		default: '',
	},
	menuListHoverTextColor: {
		type: 'string',
		default: '',
	},
	breadcrumbColor: {
		type: 'string',
		default: '',
	},
	menuListBackground: {
		type: 'string',
		default: '',
	},
	menuListTextColor: {
		type: 'string',
		default: '',
	},
	sidebarUserBackground: {
		type: 'string',
		default: '',
	},
	...bothGap,
	...getBorderAttributes( 'sidebarBorder', true ),
	...getBorderAttributes( 'userSidebarBorder', true ),
	...getBorderAttributes( 'menuListBorder', true ),
	...getBorderAttributes( 'contentBorder', true ),
	...getTypographyAttributes( 'userTypography', true ),
	...getTypographyAttributes( 'breadcrumbtTypography', true ),
	...getTypographyAttributes( 'menuListTypography', true ),
	...getDimensionsAttributes( 'menuListPadding', true ),
	...getDimensionsAttributes( 'contentPadding', true ),
	...globalAttributes,
};
export default attributes;
