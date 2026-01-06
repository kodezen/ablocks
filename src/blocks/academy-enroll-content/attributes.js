import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

export const contentTransition = getRangeAttributes( {
	attributeName: 'contentTransition',
	attributeObjectKey: 'value',
	isResponsive: false,
	hasUnit: false,
	defaultValue: 0,
	unitDefaultValue: 's',
} );

export const iconSizeAttribute = getRangeAttributes( {
	attributeName: 'iconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 14,
	unitDefaultValue: 'px',
} );
export const buttonIconAttribute = getRangeAttributes( {
	attributeName: 'buttonIconSize',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	defaultValue: 14,
	unitDefaultValue: 'px',
} );

const attributes = {
	block_id: {
		type: 'string',
		default: '',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	contentBg: {
		type: 'string',
		default: '#fff',
	},
	contentBgH: {
		type: 'string',
		default: '#fff',
	},
	iconColor: {
		type: 'string',
		default: '#595959',
	},
	iconColorH: {
		type: 'string',
		default: '#595959',
	},
	listColor: {
		type: 'string',
		default: '#111',
	},
	listColorH: {
		type: 'string',
		default: '#111',
	},
	shareColor: {
		type: 'string',
		default: '#111',
	},
	shareColorH: {
		type: 'string',
		default: '#111',
	},
	shareBg: {
		type: 'string',
		default: '#fff',
	},
	shareBgH: {
		type: 'string',
		default: '#fff',
	},
	wishlistColor: {
		type: 'string',
		default: '#fff',
	},
	wishlistColorH: {
		type: 'string',
		default: '#fff',
	},
	wishlistBg: {
		type: 'string',
		default: '#7b68ee',
	},
	wishlistBgH: {
		type: 'string',
		default: '#7b68ee',
	},
	...buttonIconAttribute,
	...iconSizeAttribute,
	...typographyAttributes( 'listTypography', true ),
	...typographyAttributes( 'shareTypography', true ),
	...getDimensionsAttributes( 'sharePadding', true ),
	...getBorderAttributes( 'shareBorder', true ),
	...globalAttributes,
};
export default attributes;
