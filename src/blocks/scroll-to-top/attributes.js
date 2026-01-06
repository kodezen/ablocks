import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
export const strokeSize = getRangeAttributes( {
	attributeName: 'strokeSize',
	attributeObjectKey: 'value',
	isResponsive: false,
	defaultValue: 3,
	hasUnit: false,
	copyStyle: true,
} );
export const positionBottom = getRangeAttributes( {
	attributeName: 'positionBottom',
	attributeObjectKey: 'value',
	isResponsive: true,
	unitDefaultValue: 'px',
	defaultValue: 20,
	hasUnit: true,
	copyStyle: true,
} );
export const positionRight = getRangeAttributes( {
	attributeName: 'positionRight',
	attributeObjectKey: 'value',
	isResponsive: true,
	unitDefaultValue: 'px',
	defaultValue: 20,
	hasUnit: true,
	copyStyle: true,
} );
export const positionLeft = getRangeAttributes( {
	attributeName: 'positionLeft',
	attributeObjectKey: 'value',
	isResponsive: true,
	unitDefaultValue: 'px',
	defaultValue: 20,
	hasUnit: true,
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
	appearance: {
		type: 'string',
		default: 'icon',
		copyStyle: true,
	},
	buttonText: {
		type: 'string',
		default: 'Top',
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
	buttonTextColorBg: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	buttonTextColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	progressColor: {
		type: 'string',
		default: 'red',
		copyStyle: true,
	},
	progressColorBg: {
		type: 'string',
		default: '#EEEEEE',
		copyStyle: true,
	},
	...iconPickerAttributes( 'icon', {
		path: 'M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z',
		viewBox: '0 0 448 512',
		className: 'far arrow-up',
		size: 40,
	} ),
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...buttonGroupAttributes( 'position', false ),
	...buttonGroupAttributes( 'visibleControl', false, {
		value: 'visible',
	} ),
	...getBorderAttributes( 'border', true ),
	...typographyAttributes( 'typography', true ),
	...textShadowAttributes( 'textShadow' ),
	...textStrokeAttributes( 'textStroke', true ),
	...getDimensionsAttributes( 'padding', true ),

	...globalAttributes,
};
export default attributes;
