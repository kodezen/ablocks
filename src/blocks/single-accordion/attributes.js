import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
export const iconSize = getRangeAttributes( {
	attributeName: 'iconSize',
	isResponsive: false,
	copyStyle: true,
	attributeObjectKey: 'value',
} );
export const itemSpace = getRangeAttributes( {
	attributeName: 'itemSpace',
	isResponsive: false,
	copyStyle: true,
	attributeObjectKey: 'value',
	hasUnit: false,
	unitDefaultValue: 'px',
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	accordionId: {
		type: 'number',
		default: 0,
	},
	accordionTitle: {
		type: 'string',
		default: 'Accordion Title 1',
	},
	headerTextColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headerTextColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headerTextActiveColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headerBackgroundActiveColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headerBackgroundColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	headerBackgroundColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...itemSpace,
	...iconSize,
	iconColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	iconColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	bodyBackgroundH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	bodyBackground: {
		type: 'string',
		default: '',
		copyStyle: true,
	},

	parentAttributes: {
		type: 'object',
		default: {
			iconPosition: 'right',
			headingTag: 'p',
			showIcon: true,
			leftCloseIconClass: 'far fa-arrow-alt-circle-up',
			leftActiveIconClass: 'far fa-arrow-alt-circle-down',
			rightActiveIconClass: 'fas fa-minus',
			rightCloseIconClass: 'fas fa-plus',
		},
	},
	...typographyAttributes( 'headerTypography', true, {
		weight: '',
	} ),
	...iconPickerAttributes( 'leftCloseIcon', {
		path: 'M256 504c137 0 248-111 248-248S393 8 256 8 8 119 8 256s111 248 248 248zm0-448c110.5 0 200 89.5 200 200s-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56zm20 328h-40c-6.6 0-12-5.4-12-12V256h-67c-10.7 0-16-12.9-8.5-20.5l99-99c4.7-4.7 12.3-4.7 17 0l99 99c7.6 7.6 2.2 20.5-8.5 20.5h-67v116c0 6.6-5.4 12-12 12z',
		viewBox: '0 0 512 512',
		className: 'far fa-arrow-alt-circle-up',
		hasNoSelectorOrSource: true,
	} ),
	...iconPickerAttributes( 'leftActiveIcon', {
		path: 'M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm-32-316v116h-67c-10.7 0-16 12.9-8.5 20.5l99 99c4.7 4.7 12.3 4.7 17 0l99-99c7.6-7.6 2.2-20.5-8.5-20.5h-67V140c0-6.6-5.4-12-12-12h-40c-6.6 0-12 5.4-12 12z',
		viewBox: '0 0 512 512',
		className: 'far fa-arrow-alt-circle-down',
		hasNoSelectorOrSource: true,
	} ),
	...iconPickerAttributes( 'rightCloseIcon', {
		path: 'M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z',
		viewBox: '0 0 448 512',
		className: 'fas fa-plus',
		hasNoSelectorOrSource: true,
	} ),
	...iconPickerAttributes( 'rightActiveIcon', {
		path: 'M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z',
		viewBox: '0 0 448 512',
		className: 'fas fa-minus',
		hasNoSelectorOrSource: true,
	} ),
	...textShadowAttributes( 'headerTextShadow' ),
	...textStrokeAttributes( 'headerTextStroke', true ),
	...getBorderAttributes( 'itemBorder', true ),
	...getDimensionsAttributes( 'headerPadding', true ),
	...getDimensionsAttributes( 'bodyPadding', true ),
	...getBorderAttributes( 'headerBorder', true ),
	...globalAttributes,
};
export default attributes;
