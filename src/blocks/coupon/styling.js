import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	const { position } = attributes;
	const css = {};

	if ( position[ 'value' + device ] !== 'stretch' ) {
		css[ 'justify-content' ] = position[ 'value' + device ] + ' !important';
	}

	return {
		...css,
	};
};

export const getButtonHoverCSS = ( attributes, device = '' ) => {
	const buttonBorderHoverUnit = parseArgs( attributes.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		color: getTextColorCSS( attributes?.textColorH ),
		background: getTextColorCSS( attributes?.backgroundH ),
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
	};
};

export const getCouponTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.couponTypography, {
		weight: '400',
	} );
	const couponBorderUnit = parseArgs( attributes.couponBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const couponPaddingUnit = parseArgs( attributes.couponPadding, {
		unit: 'px',
	} );
	const typographyValueGlobal = attributes.couponTypographyGlobal
		? attributes.couponTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.couponCodeColor ),
		background: getTextColorCSS( attributes?.couponCodeBgColor ),
		...getBorderCSS( couponBorderUnit, device ),
		...getPaddingCSS( couponPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextShadowCSS( attributes?.couponTextShadow ),
	};
};

export const getCouponTextHoverCSS = ( attributes, device = '' ) => {
	const couponBorderHoverUnit = parseArgs( attributes.couponBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( couponBorderHoverUnit, device ),
	};
};

export const getBtnTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.buttonTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.buttonTypographyGlobal
		? attributes.buttonTypographyGlobal
		: '';
	const buttonBorderUnit = parseArgs( attributes.buttonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const buttonPaddingUnit = parseArgs( attributes.buttonPadding, {
		unit: 'px',
	} );
	return {
		color: getTextColorCSS( attributes?.couponBtnTextColor ),
		background: getTextColorCSS( attributes?.couponBtnBgColor ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextShadowCSS( attributes?.buttonTextShadow ),
	};
};

export const getBtnTextHoverCSS = ( attributes, device = '' ) => {
	const buttonBorderHoverUnit = parseArgs( attributes.buttonBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
	};
};

export const getIconCSS = ( attributes ) => {
	return {
		transform: `rotate(${ attributes?.rotation }deg)`,
	};
};
