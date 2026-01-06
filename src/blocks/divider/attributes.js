import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const width = getRangeAttributes( {
	attributeName: 'width',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const weight = getRangeAttributes( {
	attributeName: 'weight',
	isResponsive: false,
	defaultValue: 4,
	copyStyle: true,
} );

export const size = getRangeAttributes( {
	attributeName: 'size',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );

export const gap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
	copyStyle: true,
} );

export const elementTextSpacing = getRangeAttributes( {
	attributeName: 'elementTextSpacing',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const elementIconSpacing = getRangeAttributes( {
	attributeName: 'elementIconSpacing',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	defaultValueMobile: 0,
	defaultValueTablet: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const elementIconSize = getRangeAttributes( {
	attributeName: 'elementIconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 20,
	defaultValueMobile: 20,
	defaultValueTablet: 20,
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
	dividerPatternUrl: {
		type: 'string',
		default: 'solid',
		copyStyle: true,
	},
	dividerType: {
		type: 'string',
		default: 'css-style',
		copyStyle: true,
	},
	color: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	elementTextColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	...width,
	...weight,
	...size,
	...gap,

	// element text related attributes
	elementText: {
		type: 'string',
		default: 'Divider',
	},
	...typographyAttributes( 'elementTextTypography', true ),
	...textStrokeAttributes( 'elementTextStroke', true ),
	...elementTextSpacing,
	elementTextPosition: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},

	// element icon related attributes
	elementIconType: {
		type: 'string',
		default: 'default',
		copyStyle: true,
	},
	...elementIconSize,
	elementIconPosition: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},
	...elementIconSpacing,

	...iconPickerAttributes( 'icon', {
		path: 'M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z',
		viewBox: '0 0 576 512',
		className: 'far fa-star',
	} ),
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...buttonGroupAttributes( 'element', false, {
		value: 'none',
	} ),
	...globalAttributes,
};
export default attributes;
