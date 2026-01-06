import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getBoxShadowCSS } from '@Controls/box-shadow/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getButtonCSS = ( attributes, device = '' ) => {
	const css = {};
	const alignmentCSS = {};
	const typographyValue = parseArgs( attributes.btn_typography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.btn_typographyGlobal
		? attributes.btn_typographyGlobal
		: '';

	const buttonPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );

	const buttonBorderUnit = parseArgs( attributes.buttonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const buttonWidth = {
		...getRangeCSS( {
			attributeValue: attributes?.button_width,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 100,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
	};

	alignmentCSS[ 'justify-content' ] =
		attributes?.buttonTextAlign[ `value${ device }` ] ?? [];

	return {
		...buttonWidth,
		...css,
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...alignmentCSS,
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
		color: getTextColorCSS( attributes?.button_color ),
		background: getTextColorCSS( attributes?.button_bg ),
	};
};

export const getButtonHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.button_hover_color ),
		background: getTextColorCSS( attributes?.button_bg_hover ),
	};
};

export const getButtonAlignmentCSS = ( attributes, device = '' ) => {
	const alignmentCSS = {};

	alignmentCSS[ 'justify-content' ] =
		attributes?.buttonAlign[ `value${ device }` ] ?? [];

	return alignmentCSS;
};

export const getPriceStyleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.priceTypography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.priceTypographyGlobal
		? attributes.priceTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		color: getTextColorCSS( attributes?.priceColor ),
	};
};

export const getPriceNameCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.priceNameTypography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.priceNameTypographyGlobal
		? attributes.priceNameTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		color: getTextColorCSS( attributes?.priceNameColor ),
	};
};

export const getBoxCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.boxWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 100,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
		background: getTextColorCSS( attributes?.boxBackground ),
	};
};
export const getRadioCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.radioWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 15,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.radioHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 15,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
};

export const getAlignmentCSS = ( attributes, device = '' ) => {
	const alignmentCSS = {};

	alignmentCSS[ 'justify-content' ] =
		attributes?.priceAlign[ `value${ device }` ] ?? [];

	return alignmentCSS;
};

export const getGapCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.elementGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 12,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
	};
};

export const getPriceBoxCSS = ( attributes, device = '' ) => {
	const buttonPaddingUnit = parseArgs( attributes?.boxPadding, {
		unit: 'px',
	} );

	const buttonBorderUnit = parseArgs( attributes.boxBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBorderCSS( buttonBorderUnit, device ),
	};
};
