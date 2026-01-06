import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

const desAttributes = {
	des: {
		type: 'string',
		source: 'html',
		selector: '.ablocks-info-box-text',
		default:
			'Showcase details with style and precision! Customize captivating visuals and text for an engaging, attention-grabbing display!',
	},
	desDropCaps: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	desDropCapsTextColor: {
		type: 'string',
		default: '#0f2aff',
		copyStyle: true,
	},
	desGraphSize: {
		type: 'string',
		default: 'sm',
		copyStyle: true,
	},
	desTextColor: {
		type: 'string',
		default: '#595959',
		copyStyle: true,
	},
	desTextColorHover: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	desTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},

	//paragraph starts
	...typographyAttributes( 'desTypography', true, {
		fontFamily: 'Roboto',
		weight: '400',
	} ),
	...getDimensionsAttributes( 'desMargin', true ),
	...textShadowAttributes( 'desTextShadow' ),
	...textStrokeAttributes( 'desTextStroke', true ),
};
export default desAttributes;
