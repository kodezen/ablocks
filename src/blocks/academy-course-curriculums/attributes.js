import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';

export const lockIconSize = getRangeAttributes( {
	attributeName: 'lock_icon_size',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 16,
	defaultValueTablet: 16,
	defaultValueMobile: 16,
	hasUnit: true,
	unitDefaultValue: 'px',
	copyStyle: true,
} );

export const readIconSize = getRangeAttributes( {
	attributeName: 'readIconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	defaultValue: 16,
	defaultValueTablet: 16,
	defaultValueMobile: 12,
	hasUnit: true,
	unitDefaultValue: 'px',
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	course_id: {
		type: 'number',
		default: 0,
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	heading_color_hover: {
		type: 'string',
		default: '#000',
	},
	heading_color: {
		type: 'string',
		default: '#000',
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
		default: '#000',
	},
	contentColor: {
		type: 'string',
		default: '#000',
	},
	contentColorH: {
		type: 'string',
		default: '#000',
	},
	title_color: {
		type: 'string',
		default: '#000',
	},
	title_color_hover: {
		type: 'string',
		default: '#000',
	},
	lesson_list_bg: {
		type: 'string',
		default: '#fff',
	},
	lesson_list_hover: {
		type: 'string',
		default: '#fff',
	},
	lock_icon_color: {
		type: 'string',
		default: '#000',
	},
	lock_icon_hover: {
		type: 'string',
		default: '#000',
	},
	read_icon_color: {
		type: 'string',
		default: '#e12a2a',
	},
	read_icon_hover: {
		type: 'string',
		default: '#e12a2a',
	},
	...lockIconSize,
	...readIconSize,
	...globalAttributes,
	...typographyAttributes( 'buttonTypography', true ),
	...typographyAttributes( 'heading_typography', true ),
	...typographyAttributes( 'title_typography', true ),
	...typographyAttributes( 'contentTypography', true ),
};
export default attributes;
