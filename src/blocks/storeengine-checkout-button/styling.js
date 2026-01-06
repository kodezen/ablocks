import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getBoxShadowCSS } from '@Controls/box-shadow/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getCheckoutButtonWrapperCSS = ( attributes, device = '' ) => {
	const { buttonAlignment } = attributes;
	const alignmentCss = {};
	const css = {};

	css.width = '100%';
	css.display = 'flex';

	if ( buttonAlignment[ `value${ device }` ] ) {
		alignmentCss[ 'justify-content' ] =
			buttonAlignment[ `value${ device }` ];
	}

	return {
		...alignmentCss,
		...css,
	};
};

export const getCheckoutButtonCSS = ( attributes, device = '' ) => {
	const css = {};

	css.color = attributes?.buttonColor;
	css.background = attributes?.buttonBackground;
	// css.width = `${attributes?.buttonWidth}%`;

	const productTitleTypography = parseArgs( attributes?.buttonTypography, {
		'font-weight': '400',
	} );

	const typographyValueGlobal = attributes.buttonTypographyGlobal
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
		color: getTextColorCSS( attributes?.buttonColor ),
		background: getTextColorCSS( attributes?.buttonBackground ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getTypographyCSS(
			productTitleTypography,
			device,
			typographyValueGlobal
		),
		...css,
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
