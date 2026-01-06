import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getCSSFilterAttributes } from '@Controls/css-filter/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const opacity = getRangeAttributes( {
	attributeName: 'opacity',
	defaultValue: 1,
	copyStyle: true,
} );
export const opacityH = getRangeAttributes( {
	attributeName: 'opacityH',
	defaultValue: 1,
	copyStyle: true,
} );

export const transitionDuration = getRangeAttributes( {
	attributeName: 'transitionDuration',
	defaultValue: 0.5,
	copyStyle: true,
} );
export const filterTransitionDuration = getRangeAttributes( {
	attributeName: 'filterTransitionDuration',
	defaultValue: 0.5,
	copyStyle: true,
} );

export const defaultWidthAndHeight = {
	imgNaturalWidth: '',
	imgNaturalWidthTablet: '',
	imgNaturalWidthMobile: '',
	imgNaturalHeight: '',
	imgNaturalHeightTablet: '',
	imgNaturalHeightMobile: '',
	width: '',
	widthTablet: '',
	widthMobile: '',
	height: '',
	heightTablet: '',
	heightMobile: '',
	customHeight: false,
	customHeightTablet: false,
	customHeightMobile: false,
};

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	imgId: {
		type: 'number',
		default: '',
	},
	imgIdTablet: {
		type: 'number',
		default: '',
	},
	imgIdMobile: {
		type: 'number',
		default: '',
	},
	imgUrl: {
		type: 'string',
		source: 'attribute',
		selector: '.ablocks-image',
		attribute: 'srcset',
	},
	imgUrlTablet: {
		type: 'string',
		source: 'attribute',
		selector: '.ablocks-image-tablet',
		attribute: 'srcset',
	},
	imgUrlMobile: {
		type: 'string',
		source: 'attribute',
		selector: '.ablocks-image-mobile',
		attribute: 'src',
	},
	imgSize: {
		type: 'object',
		default: {
			value: 'large',
			valueTablet: '',
			valueMobile: '',
		},
		copyStyle: true,
	},
	imgLink: {
		type: 'object',
		default: {
			linkDestination: '',
			href: '',
			lightbox: '',
			linkTarget: '',
			rel: '',
			linkClass: '',
		},
	},
	...opacity,
	...opacityH,
	aspectRatio: {
		type: 'object',
		default: {
			value: 'original',
			valueTablet: '',
			valueMobile: '',
		},
		copyStyle: true,
	},
	widthHeightWidget: {
		type: 'object',
		default: defaultWidthAndHeight,
		copyStyle: true,
	},
	objectFit: {
		type: 'object',
		default: {
			value: 'default',
			valueTablet: '',
			valueMobile: '',
		},
		copyStyle: true,
	},
	imgCaption: {
		type: 'boolean',
		default: false,
	},
	position: {
		type: 'string',
		default: 'below',
		copyStyle: true,
	},
	imgAltText: {
		type: 'string',
		default: '',
	},
	onHoverImg: {
		type: 'string',
		default: 'static',
		copyStyle: true,
	},
	imgTitle: {
		type: 'string',
		default: '',
	},
	showNotice: {
		type: 'boolean',
		default: false,
	},
	...transitionDuration,
	...filterTransitionDuration,
	...getAlignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...getAlignmentAttributes( 'captionAlignment', true, {
		value: 'left',
	} ),
	...getCSSFilterAttributes( 'cssFilter' ),
	...getCSSFilterAttributes( 'cssHoverFilter' ),
	...getBoxShadowAttributes( 'boxShadow' ),
	...getTypographyAttributes( 'captionTypography', true ),
	...getAlignmentAttributes( 'captionPosition', true ),
	...getDimensionsAttributes( 'captionPadding', true ),
	...getBorderAttributes( 'captionBorder', true ),
	...getBorderAttributes( 'border', true ),
	...globalAttributes,
};
export default attributes;
