import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getBoxShadowCSS } from '@Controls/box-shadow/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getCountinueButtonWrapperCSS = ( attributes, device = '' ) => {
	const { buttonAlignment } = attributes;
	const alignmentCss = {};

	if ( buttonAlignment[ `value${ device }` ] ) {
		alignmentCss[ 'justify-content' ] =
			buttonAlignment[ `value${ device }` ];
	}

	return alignmentCss;
};

export const getContinueButtonCSS = ( attributes, device = '' ) => {
	const css = {};

	css.color = attributes?.buttonColor ?? '';
	css.background = attributes?.buttonBackground ?? '';
	// css.width = `${attributes?.buttonWidth}%`;

	const productTitleTypography = parseArgs( attributes?.buttonTypography, {
		weight: '400',
	} );
	const productTitleTypographyGlobal = attributes.buttonTypographyGlobal
		? attributes.buttonTypographyGlobal
		: '';
	const buttonBorderUnit = parseArgs( attributes.buttonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const buttonPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );

	return {
		...css,
		color: getTextColorCSS( attributes?.buttonColor ),
		background: getTextColorCSS( attributes?.buttonBackground ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getTypographyCSS(
			productTitleTypography,
			device,
			productTitleTypographyGlobal
		),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
		...getRangeCSS( {
			attributeValue: attributes?.buttonWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			property: 'width',
			unitDefaultValue: '%',
			device,
		} ),
	};
};
