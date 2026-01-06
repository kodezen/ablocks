import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getCartSubWrapperCSS = ( attributes, device = '' ) => {
	const css = {};

	css.width = `${ attributes?.tableWidth }%` ?? '';

	return {
		...css,
	};
};

export const getCartSubCSS = ( attributes, device = '' ) => {
	const { tableAlignment } = attributes;
	const alignmentCss = {};
	const css = {};

	css.display = 'flex';

	if ( tableAlignment[ `value${ device }` ] ) {
		alignmentCss[ 'justify-content' ] =
			tableAlignment[ `value${ device }` ];
	}

	return {
		...alignmentCss,
		...css,
	};
};

export const getCartSubTableRowCSS = ( attributes, device = '' ) => {
	return { background: getTextColorCSS( attributes?.tableBackground ) };
};

export const getCartSubTableRowTextCSS = ( attributes, device = '' ) => {
	const tablefirstTypography = parseArgs(
		attributes?.firstTableTypography ?? '',
		{
			'font-weight': '400',
		}
	);
	const typographyValueGlobal = attributes.firstTableTypographyGlobal
		? attributes.firstTableTypographyGlobal
		: '';
	return {
		...getTypographyCSS(
			tablefirstTypography,
			device,
			typographyValueGlobal
		),
		color: getTextColorCSS( attributes?.tableColor ),
	};
};
export const getCartSubTableRowLastCSS = ( attributes, device = '' ) => {
	return { background: getTextColorCSS( attributes?.tableLastBackground ) };
};
export const getCartSubTableRowLastTextCSS = ( attributes, device = '' ) => {
	const tablelastTypography = parseArgs(
		attributes?.lastTableTypography ?? '',
		{
			'font-weight': '400',
		}
	);
	const typographyValueGlobal = attributes.lastTableTypographyGlobal
		? attributes.lastTableTypographyGlobal
		: '';
	return {
		...getTypographyCSS(
			tablelastTypography,
			device,
			typographyValueGlobal
		),
		color: getTextColorCSS( attributes?.tableLastColor ),
	};
};
