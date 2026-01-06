import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	paragraph: {
		type: 'string',
		source: 'html',
		selector: '.ablocks-paragraph-text',
		// default: 'Add Your Paragraph Text ...',
	},
	dropCaps: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	dropCapsTextColor: {
		type: 'string',
		default: '#0f2aff',
		copyStyle: true,
	},
	paragraphSize: {
		type: 'string',
		default: 'md',
		copyStyle: true,
	},
	textColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...typographyAttributes( 'typography', true ),
	...textShadowAttributes( 'textShadow' ),
	...textStrokeAttributes( 'textStroke', true ),
	...globalAttributes,
};
export default attributes;
