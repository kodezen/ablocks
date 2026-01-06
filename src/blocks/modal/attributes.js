import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionAttribute } from '@Controls/dimensions/helper';
import { getAttribute as getBackgroundAttribute } from '@Controls/background/helper';
import { getAttribute as getBorderAttribute } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const popupTopOffset = getRangeAttributes( {
	attributeName: 'popupTopOffset',
	isResponsive: false,
	defaultValue: 0,
	copyStyle: true,
} );

export const panelWidth = getRangeAttributes( {
	attributeName: 'panelWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 50,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );

export const panelHeight = getRangeAttributes( {
	attributeName: 'panelHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 50,
	hasUnit: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );

export const autoTriggerTime = getRangeAttributes( {
	attributeName: 'autoTriggerTime',
	isResponsive: false,
	defaultValue: 0,
	copyStyle: true,
} );

export const closeBtnTopOffset = getRangeAttributes( {
	attributeName: 'closeBtnTop',
	isResponsive: false,
	defaultValue: 5,
	hasUnit: false,
	copyStyle: true,
} );

export const closeBtnSideOffset = getRangeAttributes( {
	attributeName: 'closeBtnSide',
	isResponsive: false,
	defaultValue: 5,
	hasUnit: false,
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
	popupOnTop: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	disableCloseButton: {
		type: 'boolean',
		default: false,
	},
	useHoverTrigger: {
		type: 'boolean',
		default: false,
	},
	enableAutoTriggerTimer: {
		type: 'boolean',
		default: false,
	},
	showAutoOnce: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	showOnMouseOutOfWindow: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	backdropColor: {
		type: 'string',
		default: '#000000b3',
		copyStyle: true,
	},
	closeBtnBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	closeBtnColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	noTrigger: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	...autoTriggerTime,
	...popupTopOffset,
	...panelWidth,
	...panelHeight,
	...closeBtnTopOffset,
	...closeBtnSideOffset,

	...buttonGroupAttributes( 'openPanel', false, {
		value: 'close',
	} ),
	...buttonGroupAttributes( 'popupPosition', false, {
		value: 'popup',
	} ),
	...buttonGroupAttributes( 'panelBlockPosition', false, {
		value: 'bottom',
	} ),
	...buttonGroupAttributes( 'panelContentPosition', false, {
		value: 'auto',
	} ),
	...buttonGroupAttributes( 'closePosition', false, {
		value: 'right',
	} ),
	...getDimensionAttribute( 'panelPadding', true ),
	...getBackgroundAttribute( 'panelBackground' ),
	...getBorderAttribute( 'panelBorder', true ),
	...getBoxShadowAttributes( 'panelShadow', true ),

	...globalAttributes,
};
export default attributes;
