import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const barHeightSize = getRangeAttributes( {
	attributeName: 'barHeightSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 40,
	defaultValueTablet: 30,
	defaultValueMobile: 30,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
	},
	blockVersion: {
		type: 'number',
		default: '',
	},
	progressValue: {
		type: 'number',
		default: 100,
	},
	maxValue: {
		type: 'number',
		default: 100,
	},
	barColor: {
		type: 'string',
		default: 'black',
	},
	trackColor: {
		type: 'string',
		default: 'red',
	},
	mediaPosition: {
		type: 'string',
		default: 'top',
	},
	isShowPercentage: {
		type: 'boolean',
		default: true,
	},
	direction: {
		type: 'string',
		default: 'left',
	},
	progressRelative: {
		type: 'string',
		default: 'entire_page',
	},
	progressRelativeSelector: {
		type: 'string',
		default: '',
	},

	// progress bar attributes
	barProgressColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	barBackgroundColor: {
		type: 'string',
		default: '#DDDDDF',
		copyStyle: true,
	},
	...barHeightSize,
	// circle
	circleProgressColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	circleBackgroundColor: {
		type: 'string',
		default: '#dadada',
		copyStyle: true,
	},
	circleSize: {
		type: 'number',
		default: 110,
		copyStyle: true,
	},
	circleStrokeSize: {
		type: 'number',
		default: 10,
		copyStyle: true,
	},
	// content attributes
	contentColor: {
		type: 'string',
		default: '#ffffff',
	},

	...alignmentAttributes( 'alignment', true, {
		value: 'center',
		valueTablet: '',
		valueMobile: '',
	} ),
	...buttonGroupAttributes( 'layout', false, {
		value: 'bar',
	} ),
	...typographyAttributes( 'contentTypography', true ),
	...textShadowAttributes( 'contentTextShadow' ),
	...textStrokeAttributes( 'contentTextStroke', true ),
	...getBorderAttributes( 'barBorder', true ),
	...globalAttributes,
};
export default attributes;
