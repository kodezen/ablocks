import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';

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
		default: 'Add Your Curvy Text Here',
	},
	pathType: {
		type: 'string',
		default: 'wave',
	},
	isShowIcon: {
		type: 'bool',
		default: true,
		copyStyle: true,
	},
	strokeColor: {
		type: 'string',
		default: 'blue',
		copyStyle: true,
	},
	textColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	textColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	textStrokeShow: {
		type: 'bool',
		default: false,
		copyStyle: true,
	},
	textStroke: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	strokeTextColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	offsetControl: {
		type: 'number',
		default: 0,
	},
	transition: {
		type: 'number',
		default: 1,
		copyStyle: true,
	},
	strokeWidth: {
		type: 'number',
		default: 1,
		copyStyle: true,
	},
	rotate: {
		type: 'number',
		default: 0,
		copyStyle: true,
	},
	iconSize: {
		type: 'number',
		default: 250,
	},
	iconSvgPath: {
		type: 'string',
		default: '',
	},
	iconSvgViewBox: {
		type: 'string',
		default: '',
	},
	iconClass: {
		type: 'string',
		default: '',
	},
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...getLinkAttributes( 'link', true ),
	...typographyAttributes( 'typography', true ),
	...textShadowAttributes( 'textShadow' ),
	...globalAttributes,
};
export default attributes;
