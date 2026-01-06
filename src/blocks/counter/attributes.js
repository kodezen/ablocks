import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const duration = getRangeAttributes( {
	attributeName: 'duration',
	isResponsive: false,
	defaultValue: 1000,
	copyStyle: true,
} );

export const circleSize = getRangeAttributes( {
	attributeName: 'circleSize',
	isResponsive: false,
	defaultValue: 220,
	copyStyle: true,
} );
export const circleStrokeSize = getRangeAttributes( {
	attributeName: 'circleStrokeSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );
export const barSize = getRangeAttributes( {
	attributeName: 'barSize',
	isResponsive: true,
	defaultValue: 30,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const iconSize = getRangeAttributes( {
	attributeName: 'iconSize',
	isResponsive: true,
	defaultValue: 30,
	copyStyle: true,
} );
export const iconRotate = getRangeAttributes( {
	attributeName: 'iconRotate',
	isResponsive: false,
	defaultValue: 0,
	copyStyle: true,
} );
export const decimalPlaces = getRangeAttributes( {
	attributeName: 'decimalPlaces',
	isResponsive: false,
	defaultValue: 0,
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
	isShowIcon: {
		type: 'bool',
		default: true,
	},
	mediaPosition: {
		type: 'string',
		default: 'top',
	},

	// animation
	...duration,
	animationRepeat: {
		type: 'bool',
		default: false,
	},

	counterPrefix: {
		type: 'string',
		default: '',
	},
	counterSuffix: {
		type: 'string',
		default: '%',
	},

	counterTitle: {
		type: 'string',
		default: 'Enter your heading',
	},

	// number attributes
	numberColor: {
		type: 'string',
		default: '#08fd00ff',
		copyStyle: true,
	},
	startNumber: {
		type: 'number',
		default: 0,
	},
	endNumber: {
		type: 'number',
		default: 80,
	},
	totalNumber: {
		type: 'number',
		default: 100,
	},
	...decimalPlaces,
	separator: {
		type: 'string',
		default: ',',
	},

	...typographyAttributes( 'numberTypography', true ),
	...getDimensionsAttributes( 'numberMargin', true ),
	...buttonGroupAttributes( 'layout', false, {
		value: 'number',
	} ),

	// headline attributes
	headingColor: {
		type: 'string',
		default: '#4B4F58',
		copyStyle: true,
	},
	...typographyAttributes( 'headingTypography', true ),
	...getDimensionsAttributes( 'headingMargin', true ),
	barHeadingPosition: {
		type: 'string',
		default: 'top',
		copyStyle: true,
	},
	// circle attributes
	circleProgressColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	circleBackgroundColor: {
		type: 'string',
		default: '#dadada',
		copyStyle: true,
	},
	...circleSize,
	...circleStrokeSize,

	// progress bar attributes
	barProgressColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	barBackgroundColor: {
		type: 'string',
		default: '#dadada',
		copyStyle: true,
	},
	...barSize,

	//icon  attribute
	iconType: {
		type: 'string',
		default: 'default',
	},
	iconShape: {
		type: 'string',
		default: 'circle',
	},
	...iconSize,
	...iconRotate,
	iconPrimaryColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	iconBackgroundColor: {
		type: 'string',
		default: '#e8e8e8',
		copyStyle: true,
	},

	...iconPickerAttributes( 'icon', {
		path: 'M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z',
		viewBox: '0 0 576 512',
		className: 'far fa-star',
	} ),

	...alignmentAttributes( 'alignment', true, {
		value: 'center',
	} ),

	...globalAttributes,
};
export default attributes;
