import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';

export const getLogOutLabelColorCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.labelTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes.labelTypographyGlobal
		? attributes.labelTypographyGlobal
		: '';
	const logOutLabelColorCSS = {
		color: getTextColorCSS( attributes?.logOutLabelColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getTextStrokeCSS( attributes?.labelTextStroke, device ),
		...getTextShadowCSS( attributes?.labelTextShadow ),
	};
	return logOutLabelColorCSS;
};

export const getLogOutCSS = ( attributes, device = '' ) => {
	const logOutCSS = {};
	if ( attributes.direction[ 'value' + device ] ) {
		logOutCSS[ 'flex-direction' ] =
			attributes.direction[ 'value' + device ];
	}
	if ( attributes?.labelAlignment ) {
		logOutCSS[ 'justify-content' ] = attributes?.labelAlignment;
	}
	return {
		background: getTextColorCSS( attributes?.logOutLabelBgColor ),
		...logOutCSS,
		...getAlignmentCSS(
			attributes?.labelAlignment,
			'justify-content',
			device
		),
	};
};

export const getAvatarCSS = ( attributes, device = '' ) => {
	const avatarCSS = {
		...getRangeCSS( {
			attributeValue: attributes.avatarWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 40,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.avatarHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 40,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};

	const avatarBorderUnit = parseArgs( attributes.avatarBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...avatarCSS,
		...getBorderCSS( avatarBorderUnit, device ),
	};
};

export const getAvatarBorderCSS = ( attributes, device = '' ) => {
	const avatarBorderUnitH = parseArgs( attributes.avatarBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( avatarBorderUnitH, device ),
	};
};
export const getNameCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.nameTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes.nameTypographyGlobal
		? attributes.nameTypographyGlobal
		: '';
	const nameCSS = {
		color: getTextColorCSS( attributes?.nameColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getTextStrokeCSS( attributes?.nameTextStroke, device ),
		...getTextShadowCSS( attributes?.nameTextShadow ),
	};
	return nameCSS;
};
