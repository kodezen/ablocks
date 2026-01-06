import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as getBoxShadowAttributes } from '@Controls/box-shadow/helper';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';

export const iconSize = getRangeAttributes( {
	attributeName: 'iconSize',
	isResponsive: false,
	defaultValue: 20,
	copyStyle: true,
} );

export const listItemGap = getRangeAttributes( {
	attributeName: 'listItemGap',
	isResponsive: false,
	defaultValue: 30,
	copyStyle: true,
	hasUnit: true,
	unitDefaultValue: 'px',
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
	tocTableTitle: {
		type: 'string',
		default: 'Table Of Content',
	},
	...iconSize,
	H1: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	H2: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	H3: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	H4: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	H5: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	H6: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	hideTitle: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	collapSible: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	isCollapsed: {
		type: 'boolean',
		default: true,
		copyStyle: true,
	},
	markerView: {
		type: 'string',
		default: 'disc',
	},
	titleColor: {
		type: 'string',
		default: '#000',
		copyStyle: true,
	},
	...listItemGap,
	itemColor: {
		type: 'string',
		default: '#333',
		copyStyle: true,
	},
	iconColor: {
		type: 'string',
		copyStyle: true,
	},
	headerBG: {
		type: 'string',
		default: '#ddd',
		copyStyle: true,
	},
	bodyBG: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	activeColor: {
		type: 'string',
		default: '#2763f3',
		copyStyle: true,
	},
	search_background_color: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...iconPickerAttributes( 'openIcon', {
		path: 'M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z',
		viewBox: '0 0 448 512',
		className: 'fas fa-chevron-down',
		hasNoSelectorOrSource: true,
	} ),
	...iconPickerAttributes( 'closeIcon', {
		path: 'M240.971 130.524l194.343 194.343c9.373 9.373 9.373 24.569 0 33.941l-22.667 22.667c-9.357 9.357-24.522 9.375-33.901.04L224 227.495 69.255 381.516c-9.379 9.335-24.544 9.317-33.901-.04l-22.667-22.667c-9.373-9.373-9.373-24.569 0-33.941L207.03 130.525c9.372-9.373 24.568-9.373 33.941-.001z',
		viewBox: '0 0 448 512',
		className: 'fas fa-chevron-up',
		hasNoSelectorOrSource: true,
	} ),
	...getBorderAttributes( 'headerBorder', true ),
	...getBorderAttributes( 'iconBorder', true ),
	...getBoxShadowAttributes( 'iconBoxShadow', true ),
	...getDimensionsAttributes( 'header_padding', true ),
	...getDimensionsAttributes( 'list_padding', true ),
	...getDimensionsAttributes( 'icon_padding', true ),
	...typographyAttributes( 'titleTypography', true ),
	...typographyAttributes( 'contentTypography', true ),
	...globalAttributes,
};
export default attributes;
