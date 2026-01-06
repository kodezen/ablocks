import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as groupButtonAttributes } from '@Controls/group-button/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const columnGap = getRangeAttributes( {
	attributeName: 'columnGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 20,
	defaultValueTablet: 20,
	defaultValueMobile: 10,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const width = getRangeAttributes( {
	attributeName: 'width',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	defaultValueTablet: 100,
	defaultValueMobile: 100,
	copyStyle: true,
} );

export const weight = getRangeAttributes( {
	attributeName: 'weight',
	isResponsive: false,
	defaultValue: 2,
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
	defaultValueMobile: 3,
	defaultValueTablet: 1,
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
	device: {
		type: 'string',
		default: '',
	},
	columnGap: {
		type: 'object',
		default: {
			value: 20,
			valueTablet: 20,
			valueMobile: 10,
		},
	},
	...columnGap,
	allowIcon: {
		type: 'boolean',
		default: true,
	},
	allowDescription: {
		type: 'boolean',
		default: true,
	},
	allowDivider: {
		type: 'boolean',
		default: true,
	},
	itemBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	itemBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	transition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	titleTag: {
		type: 'string',
		default: 'p',
	},
	titleColor: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	descriptionTag: {
		type: 'string',
		default: 'p',
	},
	descriptionColor: {
		type: 'string',
		default: '#595959',
		copyStyle: true,
	},
	// divider related attributes
	placeDivider: {
		type: 'string',
		default: 'near title',
		copyStyle: true,
	},
	dividerPatternUrl: {
		type: 'string',
		default: 'dashed',
		copyStyle: true,
	},
	dividerType: {
		type: 'string',
		default: 'css-style',
		copyStyle: true,
	},
	color: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	...width,
	...weight,
	...size,
	...gap,
	placePrice: {
		type: 'string',
		default: 'right',
		copyStyle: true,
	},
	priceTag: {
		type: 'string',
		default: 'p',
	},
	priceColor: {
		type: 'string',
		default: '#595959',
		copyStyle: true,
	},
	...groupButtonAttributes( 'itemsDirection', true, {
		value: 'row',
	} ),
	...alignmentAttributes( 'alignment', true, {
		value: 'flex-start',
	} ),
	...alignmentAttributes( 'titleAlignment', true, {
		value: 'left',
	} ),
	...alignmentAttributes( 'descriptionAlignment', true, {
		value: 'left',
	} ),
	...alignmentAttributes( 'priceAlignment', true, {
		value: 'left',
	} ),
	...iconPickerAttributes(),
	...typographyAttributes( 'titleTypography', true ),
	...textShadowAttributes( 'titleTextShadow' ),
	...textStrokeAttributes( 'titleTextStroke', true ),
	...typographyAttributes( 'descriptionTypography', true ),
	...textShadowAttributes( 'descriptionTextShadow' ),
	...textStrokeAttributes( 'descriptionTextStroke', true ),
	...typographyAttributes( 'priceTypography', true ),
	...textShadowAttributes( 'priceTextShadow' ),
	...textStrokeAttributes( 'priceTextStroke', true ),
	...getDimensionsAttributes( 'itemPadding', true ),
	...getBorderAttributes( 'itemBorder', true ),

	...typographyAttributes( 'typography', true ),
	...textShadowAttributes( 'textShadow' ),
	...textStrokeAttributes( 'textStroke', true ),
	...globalAttributes,
};
export default attributes;
