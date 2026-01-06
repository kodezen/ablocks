import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as groupButtonAttributes } from '@Controls/group-button/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const markerSize = getRangeAttributes( {
	attributeName: 'markerSize',
	attributeObjectKey: 'value',
	defaultValue: 10,
	copyStyle: true,
} );
export const innerGap = getRangeAttributes( {
	attributeName: 'innerGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 6,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
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

export const shapeSize = getRangeAttributes( {
	attributeName: 'shapeSize',
	isResponsive: true,
	defaultValue: 14,
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	changedAttributes: {
		type: 'array',
		default: [],
	},
	device: {
		type: 'string',
		default: '',
	},
	markerType: {
		type: 'string',
		default: 'Icon',
		copyStyle: true,
	},
	...innerGap,
	shapeType: {
		type: 'string',
		default: 'dotted',
		copyStyle: true,
	},
	shapeColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	...shapeSize,
	markerColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...markerSize,
	allowDivider: {
		type: 'boolean',
		default: false,
	},
	isLastChild: {
		type: 'boolean',
		default: false,
	},
	emoji: {
		type: 'string',
		default: '👍',
		copyStyle: true,
	},
	//Text
	advanceListItemText: {
		type: 'string',
		source: 'html',
		selector: '.ablocks-advance-list-item-text',
		default: 'Task Checklist',
	},
	advanceListItemTextTag: {
		type: 'string',
		default: 'p',
	},
	dropCaps: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	dropCapsTextColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	advanceListItemTextSize: {
		type: 'string',
		default: 'md',
		copyStyle: true,
	},
	textColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	// divider related attributes
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
	...iconPickerAttributes( 'icon', {
		className: 'fas fa-check',
		path: 'M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z',
		viewBox: '0 0 512 512',
		size: '20',
		color: '#000',
	} ),
	...alignmentAttributes( 'iconAlignment', true, {
		value: 'row',
	} ),
	...alignmentAttributes( 'alignment', true, {
		value: '',
	} ),
	...groupButtonAttributes( 'listsDirection', true, {
		value: 'column',
	} ),
	...typographyAttributes( 'listTypography', true ),
	...textShadowAttributes( 'listTextShadow' ),
	...textStrokeAttributes( 'listTextStroke', true ),
	...globalAttributes,
};
export default attributes;
