import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as iconPickerAttributes } from '@Controls/icon-upload/helper';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';

import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as getTypographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getTextShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as getDimensionsAttributes } from '@Controls/dimensions/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';

export const iconSize = getRangeAttributes( {
	attributeName: 'iconSize',
	isResponsive: true,
	defaultValue: 20,
	copyStyle: true,
} );
export const iconRotate = getRangeAttributes( {
	attributeName: 'iconRotate',
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
	couponStyle: {
		type: 'string',
		default: 'default',
		copyStyle: true,
	},
	couponCode: {
		type: 'string',
		default: 'KODEZEN50',
	},
	couponBtnText: {
		type: 'string',
		default: 'Copy',
	},
	couponBtnAfterCopyText: {
		type: 'string',
		default: 'Copied!',
	},

	couponCodeColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},
	couponCodeBgColor: {
		type: 'string',
		default: '#ffffff',
		copyStyle: true,
	},
	couponBtnTextColor: {
		type: 'string',
		default: '#ffffff',
		copyStyle: true,
	},
	couponBtnBgColor: {
		type: 'string',
		default: '#000000',
		copyStyle: true,
	},

	//icon  attribute
	isShowIcon: {
		type: 'bool',
		default: true,
	},
	iconType: {
		type: 'string',
		default: 'default',
		copyStyle: true,
	},
	iconShape: {
		type: 'string',
		default: 'circle',
		copyStyle: true,
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
		path: 'M320 448v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24V120c0-13.255 10.745-24 24-24h72v296c0 30.879 25.121 56 56 56h168zm0-344V0H152c-13.255 0-24 10.745-24 24v368c0 13.255 10.745 24 24 24h272c13.255 0 24-10.745 24-24V128H344c-13.2 0-24-10.8-24-24zm120.971-31.029L375.029 7.029A24 24 0 0 0 358.059 0H352v96h96v-6.059a24 24 0 0 0-7.029-16.97z',
		viewBox: '0 0 448 512',
		className: 'fas fa-copy',
		size: 20,
	} ),

	...getAlignmentAttributes( 'position', true, {
		value: 'left',
	} ),
	...getTypographyAttributes( 'couponTypography', true ),
	...getTextShadowAttributes( 'couponTextShadow' ),
	...getTypographyAttributes( 'buttonTypography', true ),
	...getTextShadowAttributes( 'buttonTextShadow' ),
	...getDimensionsAttributes( 'couponPadding', true ),
	...getDimensionsAttributes( 'buttonPadding', true ),
	...getBorderAttributes( 'couponBorder', true ),
	...getBorderAttributes( 'buttonBorder', true ),
	...globalAttributes,
};
export default attributes;
