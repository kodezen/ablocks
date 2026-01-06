import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getTextShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const iconSpace = getRangeAttributes( {
	attributeName: 'iconSpace',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 10,
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
	text: {
		type: 'string',
		default: 'Click here',
	},
	buttonType: {
		type: 'string',
		default: '#ddd',
		copyStyle: true,
	},
	buttonSize: {
		type: 'string',
		default: 'small',
		copyStyle: true,
	},
	textColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	textColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	background: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	backgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	transition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	iconPosition: {
		type: 'string',
		default: 'left',
		copyStyle: true,
	},
	...iconSpace,
	showIcon: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	...iconPickerAttributes( 'icon', {
		size: 16,
	} ),
	...getLinkAttributes( 'link' ),
	...getAlignmentAttributes( 'position', true, {
		value: 'left',
	} ),
	...getAlignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...getTypographyAttributes( 'typography', true ),
	...getTextShadowAttributes( 'textShadow' ),
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'border', true ),
	...getBoxShadowAttributes( 'boxShadow' ),
	...globalAttributes,
};

export default attributes;
