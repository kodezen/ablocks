import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as linkAttributes } from '@Controls/link-control/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const highlightStrokeWidth = getRangeAttributes( {
	attributeName: 'highlightStrokeWidth',
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
	isAnimated: {
		type: 'boolean',
		default: false,
	},
	heading: {
		type: 'string',
		source: 'html',
		selector: '.ablocks-heading-text',
	},
	headingTag: {
		type: 'string',
		default: 'h2',
	},
	textColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	titleSource: {
		type: 'string',
		default: '',
	},
	animationType: {
		type: 'string',
		default: 'highlighted',
	},
	animationStyle: {
		type: 'string',
		default: 'highlighter-circle',
	},
	startingText: {
		type: 'string',
		default: '',
	},
	animatedText: {
		type: 'string',
		default: 'Animated',
	},
	endingText: {
		type: 'string',
		default: '',
	},

	highlightColor: {
		type: 'string',
		default: '#ff000e',
	},
	highlightDuration: {
		type: 'number',
		default: 2000,
	},
	isInfiniteLoop: {
		type: 'boolean',
		default: true,
	},
	highlightDelay: {
		type: 'number',
		default: 1000,
	},
	animatedTextColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},

	...highlightStrokeWidth,
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'typography', true ),
	...textShadowAttributes( 'textShadow' ),
	...linkAttributes( 'link' ),
	...textStrokeAttributes( 'textStroke', true ),
	...globalAttributes,
};
export default attributes;
