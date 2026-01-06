import globalAttributes from '@Global/AdvancedSettings/attributes';
import { getAttribute as getRangeAttributes } from '@Controls/range/helper';
import { getAttribute as getAlignmentAttributes } from '@Controls/alignment/helper';
import { getAttribute as typographyAttributes } from '@Controls/typography/helper';
import { getAttribute as getBorderAttributes } from '@Controls/border/helper';
import { getAttribute as textShadowAttributes } from '@Controls/textShadow/helper';
import { getAttribute as textStrokeAttributes } from '@Controls/textStroke/helper';
import { getAttribute as buttonGroupAttributes } from '@Components/button-group/helper';

export const avatarWidth = getRangeAttributes( {
	attributeName: 'avatarWidth',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	defaultValue: 40,
	copyStyle: true,
} );

export const avatarHeight = getRangeAttributes( {
	attributeName: 'avatarHeight',
	attributeObjectKey: 'value',
	isResponsive: true,
	hasUnit: true,
	unitDefaultValue: 'px',
	defaultValue: 40,
	copyStyle: true,
} );

const attributes = {
	block_id: {
		type: 'string',
	},
	blockVersion: {
		type: 'number',
		default: 2,
	},
	logoutRedirect: {
		type: 'string',
		default: 'current-url',
	},
	logoutCustomUrl: {
		type: 'string',
		default: '',
	},
	loginRedirect: {
		type: 'string',
		default: 'current-url',
	},
	loginCustomUrl: {
		type: 'string',
		default: '',
	},
	logOutLabel: {
		type: 'string',
		default: 'Logout',
	},
	logInLabel: {
		type: 'string',
		default: 'Login',
	},
	isRedirect: {
		type: 'boolean',
		default: true,
	},
	isShowAvatar: {
		type: 'boolean',
		default: false,
	},
	logOutLabelColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	logOutLabelBgColor: {
		type: 'string',
		default: '',
	},
	isShowName: {
		type: 'boolean',
		default: false,
	},
	nameColor: {
		type: 'string',
		default: '',
		copyStyle: true,
	},
	...avatarHeight,
	...avatarWidth,
	...globalAttributes,
	...getAlignmentAttributes( 'labelAlignment', true, {
		value: 'flex-start',
	} ),
	...buttonGroupAttributes( 'direction', true, {
		value: 'row',
	} ),
	...getBorderAttributes( 'avatarBorder', true ),
	...typographyAttributes( 'nameTypography', true ),
	...textShadowAttributes( 'nameTextShadow' ),
	...textStrokeAttributes( 'nameTextStroke', true ),
	...typographyAttributes( 'labelTypography', true ),
	...textShadowAttributes( 'labelTextShadow' ),
	...textStrokeAttributes( 'labelTextStroke', true ),
};
export default attributes;
