import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBackgroundAttribute } from '@Controls/background/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	selectTextcolor: {
		type: 'string',
		default: 'black',
	},
	selectTextcolorH: {
		type: 'string',
		default: 'black',
	},
	selectBackground: {
		type: 'string',
		default: 'white',
	},
	selectBackgroundH: {
		type: 'string',
		default: 'white',
	},
	selectWidth: {
		type: 'number',
		default: 236,
	},

	...getDimensionsAttributes( 'selectPadding', true ),
	...getBorderAttributes( 'selectBorder', true ),
	...typographyAttributes( 'selectTypography', true ),
};
export default attributes;
