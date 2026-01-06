import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getLinkAttributes } from '@Controls/link-control/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as dimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as borderAttributes } from '@Controls/border/helper';

const btnAttributes = {
	//button starts
	btnText: {
		type: 'string',
		default: 'Learn More',
	},
	btnSize: {
		type: 'string',
		default: 'sm',
		copyStyle: true,
	},
	btnTextColor: {
		type: 'string',
		default: '#FAFAFA',
		copyStyle: true,
	},
	btnTextColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	btnBackground: {
		type: 'string',
		default: '#13191B',
		copyStyle: true,
	},
	btnBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	btnTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	btnIconPosition: {
		type: 'string',
		default: 'right',
		copyStyle: true,
	},
	btnIconSpace: {
		type: 'number',
		default: 10,
		copyStyle: true,
	},
	btnShowIcon: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},

	//button starts
	...iconPickerAttributes( 'btnIcon', {
		size: 20,
		color: '#FAFAFA',
		path: 'M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z',
		viewBox: '0 0 448 512',
		className: 'fas fa-arrow-right',
		hasNoSelectorOrSource: true,
	} ),
	...getLinkAttributes( 'btnLink' ),
	...alignmentAttributes( 'btnAlignment', true, {
		value: 'center',
	} ),
	...typographyAttributes( 'btnTypography', true ),
	...textShadowAttributes( 'btnTextShadow' ),
	...dimensionsAttributes( 'btnPadding', true ),
	...dimensionsAttributes( 'btnMargin', true ),
	...borderAttributes( 'btnBorder', true ),
};
export default btnAttributes;
