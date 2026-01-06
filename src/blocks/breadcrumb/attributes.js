import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { postCountWidth } from '@Blocks/taxonomy-listing/attributes';
export const breadcrumbSpaceBetween = getRangeAttributes( {
	attributeName: 'breadcrumbSpaceBetween',
	defaultValue: 10,
	copyStyle: true,
} );
export const breadcrumbseparsize = getRangeAttributes( {
	attributeName: 'breadcrumbseparsize',
	defaultValue: 20,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	homeBreadcrumbs: {
		type: 'string',
		default: '',
	},
	breadcrumbTitlecolor: {
		type: 'string',
		default: '',
	},
	SeparatorChange: {
		type: 'string',
		default: '',
	},
	beforeBreadcrumbTextImage: {
		type: 'string',
		default: '',
	},

	breadcrumbItemBackground: {
		type: 'string',
		default: '',
	},
	beforeBreadcrumbBackgroundcolor: {
		type: 'string',
		default: '',
	},
	beforeBreadcrumbImage: {
		type: 'object',
		default: '',
	},
	beforeBreadcrumbText: {
		type: 'string',
		default: '',
	},
	beforeSeparator: {
		type: 'boolean',
		default: false,
	},
	beforeTextImage: {
		type: 'boolean',
		default: false,
	},
	breadcrumbLinkcolor: {
		type: 'string',
		default: '',
	},
	breadcrumbHoverLinkcolor: {
		type: 'string',
		default: '',
	},
	breadcrumbseparatorcolor: {
		type: 'string',
		default: '',
	},
	positionBreadcrumb: {
		type: 'object',
		default: '',
	},
	...typographyAttributes( 'breadcrumbTitleTypography', true ),
	...getDimensionsAttributes( 'beforeBreadcrumbPaddingcolor', true ),
	...getDimensionsAttributes( 'breadcrumbItemPadding', true ),
	...getDimensionsAttributes( 'BreadcrumbBorderRadius', true ),
	...getDimensionsAttributes( 'beforeBreadcrumbBorderRadius', true ),

	...breadcrumbSpaceBetween,
	...breadcrumbseparsize,
	...globalAttributes,
};
export default attributes;
