import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as alignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';

export const sizeAttribute = getRangeAttributes( {
	attributeName: 'size',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 24,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const spacingAttribute = getRangeAttributes( {
	attributeName: 'spacing',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const ratingNumberGapAttribute = getRangeAttributes( {
	attributeName: 'ratingNumberGap',
	attributeObjectKey: 'value',
	defaultValue: 0,
	hasUnit: true,
	unitDefaultValue: 'px',
	isResponsive: true,
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
	scale: {
		type: 'number',
		default: 5,
	},
	ratingColor: {
		type: 'string',
		default: '#e99516',
		copyStyle: true,
	},
	ratingUnmarkedColor: {
		type: 'string',
		default: '#696969',
		copyStyle: true,
	},
	showCount: {
		type: 'bool',
		default: true,
	},
	showRatingNumber: {
		type: 'bool',
		default: true,
	},

	ratingNumberColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	ratingNumberPosition: {
		type: 'string',
		default: 'right',
		copyStyle: true,
	},
	rating: {
		type: 'number',
		default: 4,
		copyStyle: true,
	},
	...ratingNumberGapAttribute,
	...sizeAttribute,
	...spacingAttribute,
	...iconPickerAttributes( 'icon', {
		path: 'M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z',
		viewBox: '0 0 576 512',
		className: 'far fa-star',
	} ),
	...typographyAttributes( 'ratingNumberTypography', true ),
	...alignmentAttributes( 'alignment', true, {
		value: 'left',
	} ),
	...globalAttributes,
};
export default attributes;
