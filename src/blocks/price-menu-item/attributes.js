import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as groupButtonAttributes } from '@Controls/group-button/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const width = getRangeAttributes( {
	attributeName: 'width',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: null,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const weight = getRangeAttributes( {
	attributeName: 'weight',
	isResponsive: false,
	defaultValue: null,
	copyStyle: true,
} );

export const size = getRangeAttributes( {
	attributeName: 'size',
	isResponsive: false,
	defaultValue: null,
	copyStyle: true,
} );

export const gap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'value',
	isResponsive: false,
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
	device: {
		type: 'string',
		default: '',
	},
	itemsDirection: {
		type: 'string',
		default: {
			value: 'row',
			valueTablet: 'row',
			valueMobile: 'row',
		},
		copyStyle: true,
	},
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
	title: {
		type: 'string',
		default: 'Sushi Roll...',
	},
	titleTag: {
		type: 'string',
		default: 'p',
	},
	titleColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	description: {
		type: 'string',
		default:
			'Lorem ipsum dolor sit amet consectetur adipiscing, elit praesent. Sed do eiusmod tempor incididunt aliqua.',
	},
	descriptionTag: {
		type: 'string',
		default: 'p',
	},
	descriptionColor: {
		type: 'string',
		default: '',
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
		default: '',
		copyStyle: true,
	},
	dividerType: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	color: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...width,
	...weight,
	...size,
	...gap,
	price: {
		type: 'string',
		default: '$15.00',
	},
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
		default: '',
		copyStyle: true,
	},
	...groupButtonAttributes( 'itemsDirection', true, {
		value: 'row',
	} ),
	...alignmentAttributes( 'alignment', true, {
		value: '',
	} ),
	...alignmentAttributes( 'titleAlignment', true, {
		value: '',
	} ),
	...alignmentAttributes( 'descriptionAlignment', true, {
		value: '',
	} ),
	...alignmentAttributes( 'priceAlignment', true, {
		value: '',
	} ),
	...iconPickerAttributes( 'icon', {
		className: 'far fa-image',
		path: 'M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm-6 336H54a6 6 0 0 1-6-6V118a6 6 0 0 1 6-6h404a6 6 0 0 1 6 6v276a6 6 0 0 1-6 6zM128 152c-22.091 0-40 17.909-40 40s17.909 40 40 40 40-17.909 40-40-17.909-40-40-40zM96 352h320v-80l-87.515-87.515c-4.686-4.686-12.284-4.686-16.971 0L192 304l-39.515-39.515c-4.686-4.686-12.284-4.686-16.971 0L96 304v48z',
		viewBox: '0 0 512 512',
		size: '40',
		iconType: 'stacked',
		iconShape: 'square',
	} ),
	...typographyAttributes( 'titleTypography', true ),
	...textShadowAttributes( 'titleTextShadow' ),
	...textStrokeAttributes( 'titleTextStroke', true ),
	...typographyAttributes( 'descriptionTypography', true ),
	...textShadowAttributes( 'descriptionTextShadow' ),
	...textStrokeAttributes( 'descriptionTextStroke', true ),
	...typographyAttributes( 'priceTypography', true ),
	...textShadowAttributes( 'priceTextShadow' ),
	...textStrokeAttributes( 'priceTextStroke', true ),
	...globalAttributes,
};
export default attributes;
