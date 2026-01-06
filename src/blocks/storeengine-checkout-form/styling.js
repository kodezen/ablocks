import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getCheckoutFormCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.titleTypography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.titleTypographyGlobal
		? attributes.titleTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.titleColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getCheckoutFormLabelCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.labelTypography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.labelTypographyGlobal
		? attributes.labelTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.labelColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getCheckoutFormInputCSS = ( attributes, device = '' ) => {
	const buttonBorderUnit = parseArgs( attributes.inputBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const buttonPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	return {
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBorderCSS( buttonBorderUnit, device ),
	};
};

export const getCheckoutFormSelectCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.selectTypography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.selectTypographyGlobal
		? attributes.selectTypographyGlobal
		: '';
	const buttonBorderUnit = parseArgs( attributes.selectBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const buttonPaddingUnit = parseArgs( attributes?.selectPadding, {
		unit: 'px',
	} );

	return {
		color: getTextColorCSS( attributes?.selectTextcolor ),
		background: getTextColorCSS( attributes?.selectBackground ),
		...getRangeCSS( {
			attributeValue: attributes?.selectWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: 18,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
	};
};

export const getCheckoutFormButtonCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.buttonTypography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.buttonTypographyGlobal
		? attributes.buttonTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.buttonColor ),
		background: getTextColorCSS( attributes?.buttonBackground ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
