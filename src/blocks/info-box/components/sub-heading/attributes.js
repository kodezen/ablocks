import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

const subHeadingAttributes = {
	// sub heading starts
	subHeading: {
		type: 'string',
		source: 'html',
		selector: '.ablocks-info-box-sub-heading',
		default: 'Your Info Box Sub Title',
	},
	subHeadingTag: {
		type: 'string',
		default: 'h3',
	},
	subHeadingTextColor: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	subHeadingTextColorHover: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	subHeadingTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},

	// subHeading starts
	...typographyAttributes( 'subHeadingTypography', true, {
		fontFamily: 'Roboto',
		weight: '500',
	} ),
	...getDimensionsAttributes( 'subHeadingMargin', true ),
	...textShadowAttributes( 'subHeadingTextShadow' ),
	...textStrokeAttributes( 'subHeadingTextStroke', true ),
};
export default subHeadingAttributes;
