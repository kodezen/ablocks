import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as linkAttributes } from '@Controls/link-control/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	heading: {
		type: 'string',
		source: 'html',
		selector: '.ablocks-block--certificate__heading-text',
		default: 'Add Your Heading Text Here',
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
