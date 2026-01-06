import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getProductfilterSelectCSS = ( attributes, device = '' ) => {
	const css = {};
	css.width = `${
		attributes?.selectWidth?.[ device ] || attributes?.selectWidth
	}px`;
	const typographyValue = parseArgs( attributes.selectTypography, {
		'font-weight': '400',
	} );
	const typographyGlobal = attributes?.selectTypographyGlobal
		? attributes?.selectTypographyGlobal
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
		...css,
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
	};
};
