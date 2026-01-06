import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

const headingAttributes = {
	heading: {
		type: 'string',
		source: 'html',
		selector: '.ablocks-info-box-heading',
		default: 'Your Info Box Title',
	},
	headingTag: {
		type: 'string',
		default: 'h2',
	},
	headingTextColor: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	headingTextColorHover: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headingTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},

	// heading starts
	...typographyAttributes( 'headingTypography', true, {
		fontFamily: 'Roboto',
		weight: '600',
	} ),
	...getDimensionsAttributes( 'headingMargin', true ),
	...textShadowAttributes( 'headingTextShadow' ),
	...textStrokeAttributes( 'headingTextStroke', true ),
};
export default headingAttributes;
