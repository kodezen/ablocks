import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getCSSFilterAttributes } from '@Controls/css-filter/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const iconFontSize = getRangeAttributes( {
	attributeName: 'iconFontSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 36,
	defaultValueTablet: 24,
	defaultValueMobile: 16,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const scrollHeight = getRangeAttributes( {
	attributeName: 'scrollHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 200,
	copyStyle: true,
} );
export const opacity = getRangeAttributes( {
	attributeName: 'opacity',
	defaultValue: 1,
	copyStyle: true,
} );
export const opacityH = getRangeAttributes( {
	attributeName: 'opacityH',
	defaultValue: '',
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
	imageDataAttribute: {
		type: 'object',
		default: {},
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
	...scrollHeight,
	...opacity,
	...opacityH,
	...iconFontSize,
	aspectRatio: {
		type: 'object',
		default: {
			value: 'original',
			valueTablet: '',
			valueMobile: '',
		},
		copyStyle: true,
	},
	imageScrollOption: {
		type: 'object',
		default: {
			value: 'mouse-scroll',
		},
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
	position: {
		type: 'string',
		default: 'below',
		copyStyle: true,
	},
	imgAltText: {
		type: 'string',
		default: '',
	},
	imgTitle: {
		type: 'string',
		default: '',
	},
	transitionTime: {
		type: 'number',
		default: 3,
	},
	showNotice: {
		type: 'boolean',
		default: false,
	},
	showOverlay: {
		type: 'boolean',
		default: false,
	},
	showIcon: {
		type: 'boolean',
		default: false,
	},
	overlayColor: {
		type: 'string',
		default: '#0202024C',
	},
	iconColor: {
		type: 'string',
		default: '',
	},
	...transitionDuration,
	...filterTransitionDuration,
	...getAlignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...getCSSFilterAttributes( 'cssFilter' ),
	...getCSSFilterAttributes( 'cssHoverFilter' ),
	...getBorderAttributes( 'border', true ),
	...globalAttributes,
};
export default attributes;
