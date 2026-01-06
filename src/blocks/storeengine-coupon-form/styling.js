import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getBoxShadowCSS } from '@Controls/box-shadow/helper';

export const getCouponFormCSS = ( attributes, device = '' ) => {
	const css = {};
	const { formAlignment } = attributes;

	if ( attributes.direction !== '' ) {
		css[ 'flex-direction' ] = attributes.direction;
	}
	if ( formAlignment[ `value${ device }` ] ) {
		css[ 'justify-content' ] = formAlignment[ `value${ device }` ];
	}

	return css;
};

export const getCouponFormInputCSS = ( attributes, device = '' ) => {
	const css = {};
	// css.width = `${attributes?.inputWidth?.[device] || attributes?.inputWidth}px`;

	const buttonBorderUnit = parseArgs( attributes.inputBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...getRangeCSS( {
			attributeValue: attributes?.inputWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: 18,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
		...css,
		...getBorderCSS( buttonBorderUnit, device ),
	};
};

export const getCouponFormButtonCSS = ( attributes, device = '' ) => {
	const productTitleTypography = parseArgs( attributes?.buttonTypography, {
		'font-weight': '400',
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
			property: 'width',
			defaultValue: 18,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};
