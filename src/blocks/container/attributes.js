import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBackgroundOverlayAttribute } from '@Controls/background/overlay/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import { getAttribute as linkAttributes } from '@Controls/link-control/helper';
export const minimumHeight = getRangeAttributes( {
	attributeName: 'minimumHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: null,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const containerWidth = getRangeAttributes( {
	attributeName: 'containerWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const containerContentWidth = getRangeAttributes( {
	attributeName: 'containerContentWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const columnGap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'columnGap',
	isResponsive: true,
	defaultValue: null,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const rowGap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'rowGap',
	isResponsive: true,
	defaultValue: null,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const gridColumn = getRangeAttributes( {
	attributeName: 'gridColumn',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	defaultValueTablet: 2,
	defaultValueMobile: 1,
	hasUnit: false,
	unitDefaultValue: '',
	copyStyle: true,
} );
export const gridRow = getRangeAttributes( {
	attributeName: 'gridRow',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: '',
	hasUnit: false,
	unitDefaultValue: '',
	copyStyle: true,
} );

export const shapeBottomHeight = getRangeAttributes( {
	attributeName: 'shapeBottomHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const shapeBottomWidth = getRangeAttributes( {
	attributeName: 'shapeBottomWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const shapeTopHeight = getRangeAttributes( {
	attributeName: 'shapeTopHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const shapeTopWidth = getRangeAttributes( {
	attributeName: 'shapeTopWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 100,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );

export const gap = {
	gap: {
		type: 'object',
		default: {
			...columnGap?.gap?.default,
			...rowGap?.gap?.default,
		},
		copyStyle: true,
	},
};

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	className: {
		type: 'string',
		default: '',
	},
	isRootContainer: {
		type: 'boolean',
		default: false,
	},
	variationSelected: {
		type: 'boolean',
		default: false,
	},
	...containerWidth,
	...containerContentWidth,
	...minimumHeight,
	// flex 'gap" start
	...gap,
	...buttonGroupAttributes( 'containerWidthType', false, {
		value: 'boxed',
	} ),
	...buttonGroupAttributes( 'overflow', false, {
		value: 'visible',
	} ),
	//
	direction: {
		type: 'string',
		default: 'column',
	},
	directionTablet: {
		type: 'string',
		default: '',
	},
	directionMobile: {
		type: 'string',
		default: '',
	},
	justify: {
		type: 'string',
		default: '',
	},
	justifyTablet: {
		type: 'string',
		default: '',
	},
	justifyMobile: {
		type: 'string',
		default: '',
	},
	align: {
		type: 'string',
		default: '',
	},
	alignTablet: {
		type: 'string',
		default: '',
	},
	alignMobile: {
		type: 'string',
		default: '',
	},
	wrap: {
		type: 'string',
		default: '',
	},
	wrapTablet: {
		type: 'string',
		default: '',
	},
	wrapMobile: {
		type: 'string',
		default: '',
	},
	layout: {
		type: 'string',
		default: '',
	},
	htmlTag: {
		type: 'string',
		default: '',
	},
	//shape divider
	shapeTop: {
		type: 'string',
		default: '',
	},
	shapeBottom: {
		type: 'string',
		default: '',
	},
	shapeTopColor: {
		type: 'string',
		default: '#61CE70',
	},
	shapeBottomColor: {
		type: 'string',
		default: '#61CE70',
	},
	bottomShapeBringToFront: {
		type: 'boolean',
		default: false,
	},
	topShapeBringToFront: {
		type: 'boolean',
		default: false,
	},
	topShapeFlip: {
		type: 'boolean',
		default: false,
	},
	bottomShapeFlip: {
		type: 'boolean',
		default: false,
	},
	...shapeTopHeight,
	...shapeTopWidth,
	...shapeBottomHeight,
	...shapeBottomWidth,
	...buttonGroupAttributes( 'dir', true, {
		value: 'column',
	} ),
	...buttonGroupAttributes( 'justification', true, {
		value: '',
	} ),
	...buttonGroupAttributes( 'alignment', true, {
		value: '',
	} ),
	...buttonGroupAttributes( 'wrapping', true, {
		value: '',
	} ),
	...linkAttributes( 'link' ),
	// added Background overlay in advanced settings
	...getBackgroundOverlayAttribute( '_backgroundOverlay', true ),
	...globalAttributes,
};
export default attributes;
