import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as linkAttributes } from '@Controls/link-control/helper';
import { getAttribute as dimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

export const iconWidth = getRangeAttributes( {
	attributeName: 'iconWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 18,
	defaultValueTablet: 18,
	defaultValueMobile: 12,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const SearchBtnWidth = getRangeAttributes( {
	attributeName: 'searchBtnWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 70,
	defaultValueTablet: 70,
	defaultValueMobile: 70,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const gap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	defaultValueTablet: 0,
	defaultValueMobile: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const listWidth = getRangeAttributes( {
	attributeName: 'listWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const listGap = getRangeAttributes( {
	attributeName: 'listGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	defaultValueTablet: 0,
	defaultValueMobile: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const itemWidth = getRangeAttributes( {
	attributeName: 'itemWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const searchItemHeight = getRangeAttributes( {
	attributeName: 'searchItemHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 300,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const itemGap = getRangeAttributes( {
	attributeName: 'itemGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const horizontalOffset = getRangeAttributes( {
	attributeName: 'horizontalOffset',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 230,
	defaultValueTablet: 230,
	defaultValueMobile: 230,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const verticalOffset = getRangeAttributes( {
	attributeName: 'verticalOffset',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 230,
	defaultValueTablet: 230,
	defaultValueMobile: 230,
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
	source: {
		type: 'string',
		default: 'any',
	},
	currentPostID: {
		type: 'integer',
		default: '',
	},
	...gap,
	searchTerm: {
		type: 'string',
		default: '',
	},
	isIcon: {
		type: 'string',
		default: 'icon',
	},
	...iconWidth,
	...SearchBtnWidth,
	...listGap,
	...listWidth,
	...itemWidth,
	...searchItemHeight,
	...itemGap,
	...horizontalOffset,
	...verticalOffset,
	allowCollapse: {
		type: 'bool',
		default: false,
	},
	position: {
		type: 'string',
		default: 'default',
	},
	variant: {
		type: 'string',
		default: 'classic',
	},
	buttonText: {
		type: 'string',
		default: 'Search',
	},
	buttonBgColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonBgColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonTextColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},

	buttonTextColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	placeholder: {
		type: 'string',
		default: 'Write anything.......',
	},
	placeholderColor: {
		type: 'string',
		default: 'gray',
		copyStyle: true,
	},
	inputTextColor: {
		type: 'string',
		default: '#949494',
		copyStyle: true,
	},
	inputBgColor: {
		type: 'string',
		default: '#FFFFFF',
		copyStyle: true,
	},
	searchResTColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	loadingSpinnerColor: {
		type: 'string',
		default: '#fff',
		copyStyle: true,
	},

	...typographyAttributes( 'buttonTypography', true ),
	...textShadowAttributes( 'buttonTextShadow' ),
	...textStrokeAttributes( 'buttonTextStroke', true ),
	...typographyAttributes( 'buttonTypographyH', true ),
	...textShadowAttributes( 'buttonTextShadowH' ),
	...textStrokeAttributes( 'buttonTextStrokeH', true ),
	...typographyAttributes( 'inputTypography', true ),
	...textShadowAttributes( 'inputTextShadow' ),
	...textStrokeAttributes( 'inputTextStroke', true ),
	...alignmentAttributes( 'buttonAlignment', false, {
		value: 'left',
	} ),
	...alignmentAttributes( 'horizontalAlignment', false, {
		value: 'left',
	} ),
	...alignmentAttributes( 'verticalAlignment', false, {
		value: 'top',
	} ),
	...alignmentAttributes( 'fullscreenButtonAlignment', true, {
		value: 'center',
	} ),
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'typography', true ),
	...textShadowAttributes( 'textShadow' ),
	...linkAttributes( 'link' ),
	...textStrokeAttributes( 'textStroke', true ),
	...dimensionsAttributes( 'listPadding', false ),
	...getBorderAttributes( 'listBorder', true ),
	...dimensionsAttributes( 'itemPadding', false ),
	...getBorderAttributes( 'itemBorder', true ),
	...getBorderAttributes( 'searchBoxBorder', true ),
	...typographyAttributes( 'searchResTypography', true ),
	...globalAttributes,
};
export default attributes;
