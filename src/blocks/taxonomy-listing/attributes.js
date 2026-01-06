import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

export const postCountWidth = getRangeAttributes( {
	attributeName: 'postCountWidth',
	defaultValue: 40,
	copyStyle: true,
} );
export const iconsSize = getRangeAttributes( {
	attributeName: 'iconsSize',
	defaultValue: 30,
	copyStyle: true,
} );
const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	selectedPostType: {
		type: 'string',
		default: '',
	},
	selectedPostId: {
		type: 'number',
		default: 0,
	},
	selectedPostTitle: {
		type: 'string',
		default: '',
		source: 'html',
	},
	selectedPostExcerpt: {
		type: 'string',
		default: '',
		source: 'html',
	},
	taxonomyTitlecolor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	excerptPostColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	selectedTaxonomies: {
		type: 'array',
		default: [],
	},
	taxonomyQuery: {
		type: 'object',
		default: {},
	},
	selectedTerms: {
		type: 'object',
		default: {},
	},
	activeTaxonomy: {
		type: 'array',
		default: [],
	},
	enableReloadButton: {
		type: 'boolean',
		default: false,
	},
	showTermCount: {
		type: 'boolean',
		default: true,
	},
	taxonomyLayout: {
		type: 'string',
		default: 'list', // or 'flex'
	},
	pageLinks: {
		type: 'string',
		default: 'archivePagelink', // or 'flex'
	},
	itemsPerRow: {
		type: 'number',
		default: 3,
	},
	postOrderBy: {
		type: 'string',
		default: 'date',
	},
	postOrder: {
		type: 'string',
		default: 'desc',
	},

	numberOfPosts: {
		type: 'number',
		default: 6,
	},
	allowIcon: {
		type: 'boolean',
		default: false,
	},
	postCountBorder: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	postCountBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	postCountColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	taxonomyTitlePadding: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	taxonomyTitletBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	taxonomyTitleDirection: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	taxonomyTitlePosition: {
		type: 'object',
		default: 'space-between',
		copyStyle: true,
	},
	taxonomyTitleBorder: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	postTitleColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	postTitleHoverColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	postTitleTypography: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	buttonPadding: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	buttonBorder: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	butttonColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonHoverBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonHoverColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonTypography: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	buttonPosition: {
		type: 'object',
		default: 'block',
		copyStyle: true,
	},
	cardBgColor: {
		type: 'string',
		default: 'block',
		copyStyle: true,
	},
	cardPadding: {
		type: 'object',
		default: 'block',
		copyStyle: true,
	},

	icon: {
		type: 'object',
		default: 'block',
		copyStyle: true,
	},
	buttonText: {
		type: 'string',
		default: 'View More',
		copyStyle: true,
	},

	showTab: {
		type: 'boolean',
		default: false,
	},
	showTabScrolling: {
		type: 'boolean',
		default: false,
	},
	iconsSize: {
		type: 'number',
		default: 25,
		copyStyle: true,
	},
	postPadding: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	hoverPostBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	activePostBackgroundColor: {
		type: 'string',
		copyStyle: true,
	},
	postTitleActiveColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	activePostBorder: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	postBorder: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	postBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	showPost: {
		type: 'boolean',
		default: true,
	},
	cardBgHoverColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	showPostLink: {
		type: 'boolean',
		default: false,
	},
	showTermCountPrefix: {
		type: 'boolean',
		default: false,
	},
	countPrefixText: {
		type: 'string',
		default: 'Items',
		copyStyle: true,
	},
	iconColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	iconBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	showIconDffent: {
		type: 'boolean',
		default: '',
		copyStyle: false,
	},
	iconPadding: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	iconBorderRadius: {
		type: 'object',
		default: '',
		copyStyle: true,
	},
	...iconPickerAttributes( 'icon', {
		size: 16,
	} ),
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'taxonomyTitleTypography', true, {
		weight: '500',
	} ),
	...typographyAttributes( 'postCountTypography', true, {
		weight: '500',
	} ),
	...postCountWidth,
	...iconsSize,
	...getBoxShadowAttributes( 'cardBoxShadow' ),
	...globalAttributes,
	...getBorderAttributes( 'cardBorder', true ),
};

export default attributes;
