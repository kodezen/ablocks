import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const iconBackgroundSize = getRangeAttributes( {
	attributeName: 'iconBackgroundSize',
	isResponsive: false,
	defaultValue: 48,
	copyStyle: true,
} );
export const itemGap = getRangeAttributes( {
	attributeName: 'itemGap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
	hasUnit: true,
	unitDefaultValue: 'px',
} );
export const iconSize = getRangeAttributes( {
	attributeName: 'iconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 18,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const lineLeft = getRangeAttributes( {
	attributeName: 'lineLeft',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const lineRight = getRangeAttributes( {
	attributeName: 'lineRight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const thickness = getRangeAttributes( {
	attributeName: 'thickness',
	isResponsive: false,
	defaultValue: 3,
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
	iconColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	iconBackgroundColor: {
		type: 'string',
		default: '#eee',
		copyStyle: true,
	},
	thicknessColor: {
		type: 'string',
		default: '#eee',
		copyStyle: true,
	},
	showAnimation: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	connectorAnimationColor: {
		type: 'string',
		default: '#00ad6b',
		copyStyle: true,
	},
	contentBackgroundColor: {
		type: 'string',
		default: '#eee',
		copyStyle: true,
	},
	showDate: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	showDateTablet: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	showDateMobile: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	dateFormat: {
		type: 'string',
		default: 'F j, Y',
		copyStyle: true,
	},
	dateColor: {
		type: 'string',
		default: '#333333',
		copyStyle: true,
	},
	dateBackground: {
		type: 'string',
		default: '#eee',
		copyStyle: true,
	},
	...iconBackgroundSize,
	...itemGap,
	...thickness,
	...iconSize,
	...lineLeft,
	...lineRight,
	...iconPickerAttributes( 'contentTimeLineIcon', {
		path: 'M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z',
		viewBox: '0 0 512 512',
		className: 'far fa-arrow-alt-circle-up',
		hasNoSelectorOrSource: true,
	} ),
	...getAlignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...buttonGroupAttributes( 'arrowAlignment', false, {
		value: 'center',
	} ),
	...buttonGroupAttributes( 'dateAlign', false, {
		value: 'left',
	} ),
	...buttonGroupAttributes( 'contentPosition', false, {
		value: 'center',
	} ),
	...getTypographyAttributes( 'dateTypography', true ),
	...getDimensionsAttributes( 'contentPadding', true ),
	...getDimensionsAttributes( 'datePadding', true ),
	...getBorderAttributes( 'dateBorder', true ),
	...globalAttributes,
};

export default attributes;
