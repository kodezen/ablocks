import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getBoxShadowCSS } from '@Controls/box-shadow/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getBuyButtonCSS = ( attributes, device = '' ) => {
	const css = {};
	css.color = attributes?.buttonColor ?? '#fff';
	css.background = attributes?.buttonBackground ?? '#008DFF';
	const typographyValue = parseArgs( attributes.btnTypography, {
		'font-weight': '400',
	} );

	const typographyGlobal = attributes?.btnTypographyGlobal
		? attributes?.btnTypographyGlobal
		: '';

	const buttonPaddingUnit = parseArgs( attributes?.buttonPadding, {
		unit: 'px',
	} );

	const buttonBorderUnit = parseArgs( attributes.buttonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const buttonWidth = {
		...getRangeCSS( {
			attributeValue: attributes?.buttonWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 100,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
	};

	return {
		...buttonWidth,
		...css,
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
	};
};

export const getAddButtonCSS = ( attributes, device = '' ) => {
	const css = {};

	css.color = attributes?.AddButtonColor ?? '#111';
	css.background = attributes?.AddButtonBackground ?? '#fff';
	const typographyValue = parseArgs( attributes.AddBtnTypography, {
		'font-weight': '400',
	} );

	const typographyGlobal = attributes?.AddBtnTypographyGlobal
		? attributes?.AddBtnTypographyGlobal
		: '';

	const buttonPaddingUnit = parseArgs( attributes?.AddButtonPadding, {
		unit: 'px',
	} );

	const buttonBorderUnit = parseArgs( attributes.AddButtonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const buttonWidth = {
		...getRangeCSS( {
			attributeValue: attributes?.AddButtonWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 100,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
	};
	return {
		...buttonWidth,
		...css,
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBorderCSS( buttonBorderUnit, device ),
	};
};

export const getProductTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.titleTypography, {
		'font-weight': '400',
	} );

	const typographyGlobal = attributes?.titleTypographyGlobal
		? attributes?.titleTypographyGlobal
		: '';

	return {
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		color: getTextColorCSS( attributes?.titleColor ),
	};
};

export const getProductPriceCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.ProductPriceTypography, {
		'font-weight': '400',
	} );
	const typographyGlobal = attributes?.ProductPriceTypographyGlobal
		? attributes?.ProductPriceTypographyGlobal
		: '';

	return {
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		color: getTextColorCSS( attributes?.productPriceColor ),
	};
};

export const getInputBoxCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.inputTextTypography, {
		'font-weight': '400',
	} );

	const typographyGlobal = attributes?.inputTextTypographyGlobal
		? attributes?.inputTextTypographyGlobal
		: '';

	const buttonPaddingUnit = parseArgs( attributes?.inputPadding, {
		unit: 'px',
	} );

	const buttonBorderUnit = parseArgs( attributes.inputBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		color: getTextColorCSS( attributes?.inputTextColor ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getRangeCSS( {
			attributeValue: attributes?.inputWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 50,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
	};
};
