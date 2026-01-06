import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';

export const carouselHeight = getRangeAttributes( {
	attributeName: 'carouselHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	defaultValue: 300,
	defaultValueMobile: 300,
	defaultValueTablet: 300,
	copyStyle: true,
} );

export const paginationPositionY = getRangeAttributes( {
	attributeName: 'paginationPositionY',
	defaultValue: 100,
	attributeObjectKey: 'value',
	hasUnit: true,
	isResponsive: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const paginationPositionX = getRangeAttributes( {
	attributeName: 'paginationPositionX',
	defaultValue: 47,
	attributeObjectKey: 'value',
	hasUnit: true,
	isResponsive: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const paginationSize = getRangeAttributes( {
	attributeName: 'paginationSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const paginationHoverSize = getRangeAttributes( {
	attributeName: 'paginationHoverSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const paginationActiveSize = getRangeAttributes( {
	attributeName: 'paginationActiveSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );
export const paginationActiveHoverSize = getRangeAttributes( {
	attributeName: 'paginationActiveHoverSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 8,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const navigationIconSize = getRangeAttributes( {
	attributeName: 'navigationIconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 35,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const slidesPerView = getRangeAttributes( {
	attributeName: 'slidesPerView',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 1,
	defaultValueMobile: 1,
	defaultValueTablet: 1,
	copyStyle: true,
} );
export const gap = getRangeAttributes( {
	attributeName: 'gap',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 0,
	defaultValueMobile: 0,
	defaultValueTablet: 0,
	copyStyle: true,
} );

export const navigationIconPositionY = getRangeAttributes( {
	attributeName: 'navigationIconPositionY',
	defaultValue: 50,
	attributeObjectKey: 'value',
	hasUnit: true,
	isResponsive: true,
	unitDefaultValue: '%',
	copyStyle: true,
} );
export const navigationIconPositionNextX = getRangeAttributes( {
	attributeName: 'navigationIconPositionNextX',
	hasUnit: true,
	isResponsive: true,
	unitDefaultValue: '%',
	defaultValue: -3,
	copyStyle: true,
} );
export const navigationIconPositionPrevX = getRangeAttributes( {
	attributeName: 'navigationIconPositionPrevX',
	hasUnit: true,
	unitDefaultValue: '%',
	isResponsive: true,
	defaultValue: -3,
	copyStyle: true,
} );

const leftIcon = iconPickerAttributes( 'leftIcon', {
	path: 'M8 256c0 137 111 248 248 248s248-111 248-248S393 8 256 8 8 119 8 256zm448 0c0 110.5-89.5 200-200 200S56 366.5 56 256 145.5 56 256 56s200 89.5 200 200zm-72-20v40c0 6.6-5.4 12-12 12H256v67c0 10.7-12.9 16-20.5 8.5l-99-99c-4.7-4.7-4.7-12.3 0-17l99-99c7.6-7.6 20.5-2.2 20.5 8.5v67h116c6.6 0 12 5.4 12 12z',
	viewBox: '0 0 512 512',
	hasNoSelectorOrSource: true,
	className: 'far fa-arrow-alt-circle-left',
} );
const rightIcon = iconPickerAttributes( 'rightIcon', {
	path: 'M504 256C504 119 393 8 256 8S8 119 8 256s111 248 248 248 248-111 248-248zm-448 0c0-110.5 89.5-200 200-200s200 89.5 200 200-89.5 200-200 200S56 366.5 56 256zm72 20v-40c0-6.6 5.4-12 12-12h116v-67c0-10.7 12.9-16 20.5-8.5l99 99c4.7 4.7 4.7 12.3 0 17l-99 99c-7.6 7.6-20.5 2.2-20.5-8.5v-67H140c-6.6 0-12-5.4-12-12z',
	viewBox: '0 0 512 512',
	hasNoSelectorOrSource: true,
	className: 'far fa-arrow-alt-circle-right',
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
	carouselSlideLength: {
		type: 'number',
		default: 1,
	},
	...carouselHeight,
	effect: {
		type: 'string',
		default: 'slide',
		copyStyle: true,
	},
	reverseDirection: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	...slidesPerView,
	...gap,
	isLoop: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},

	autoplay: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	autoPlayReverse: {
		type: 'boolean',
		default: false,
		copyStyle: true,
	},
	autoplayDelay: {
		type: 'number',
		default: 3000,
		copyStyle: true,
	},
	autoplayPauseOnHover: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	speed: {
		type: 'number',
		default: 800,
		copyStyle: true,
	},
	paginationType: {
		type: 'string',
		default: 'default',
		copyStyle: true,
	},
	pagination: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	paginationClickable: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	...paginationPositionY,
	...paginationPositionX,
	...paginationSize,
	...paginationHoverSize,
	...paginationActiveSize,
	...paginationActiveHoverSize,
	navigation: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	...navigationIconSize,
	...navigationIconPositionNextX,
	...navigationIconPositionPrevX,
	...navigationIconPositionY,
	navigationIconColor: {
		type: 'string',
		default: '#686868',
		copyStyle: true,
	},
	navigationIconColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	navigationIconBgColor: {
		type: 'string',
		default: '#e4e4e4',
		copyStyle: true,
	},
	navigationIconBgColorH: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	navigationIconTransition: {
		type: 'number',
		default: '',
		copyStyle: true,
	},
	paginationColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	paginationHoverColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	paginationActiveColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	paginationActiveHoverColor: {
		type: 'string',
		default: 'black',
		copyStyle: true,
	},
	...leftIcon,
	...rightIcon,
	grabCursor: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	mousewheel: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	verticalAlignment: {
		type: 'string',
		default: 'center',
		copyStyle: true,
	},

	...buttonGroupAttributes( 'verticalAlign', true, {
		value: 'center',
	} ),
	...getDimensionsAttributes( 'navigationIconPadding', true ),

	...getBorderAttributes( 'navigationIconBorder', true ),

	...getBorderAttributes( 'paginationBorder', true ),
	...getBorderAttributes( 'activePaginationBorder', true ),
	...getBoxShadowAttributes( 'navigationIconBoxShadow', true ),

	...globalAttributes,
};
export default attributes;
