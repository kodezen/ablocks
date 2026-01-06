import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBackgroundAttribute } from '@Controls/background/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

export const selectWidth = getRangeAttributes( {
	attributeName: 'selectWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 18,
	defaultValueTablet: 18,
	defaultValueMobile: 12,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	titleColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	titleColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	labelColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	labelColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
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
	buttonBackground: {
		type: 'string',
		default: '',
	},
	buttonBackgroundH: {
		type: 'string',
		default: '',
	},

	buttonColor: {
		type: 'string',
		default: '',
	},
	buttonColorH: {
		type: 'string',
		default: '',
	},
	...selectWidth,
	...getDimensionsAttributes( 'selectPadding', true ),
	...getBorderAttributes( 'selectBorder', true ),
	...typographyAttributes( 'selectTypography', true ),
	...typographyAttributes( 'buttonTypography', true ),
	...getDimensionsAttributes( 'padding', true ),
	...getBorderAttributes( 'inputBorder', true ),
	...typographyAttributes( 'titleTypography', true ),
	...typographyAttributes( 'labelTypography', true ),
	...globalAttributes,
};
export default attributes;
