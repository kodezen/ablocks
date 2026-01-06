import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getCartListTableCSS = ( attribute, device = '' ) => {
	return { background: getTextColorCSS( attribute?.tableBackground ) };
};
export const getCartListTableHeaderCSS = ( attribute, device = '' ) => {
	return { background: getTextColorCSS( attribute?.tableHeaderBackground ) };
};

export const getCartListTableHeaderTextCSS = ( attributes, device = '' ) => {
	const tableHeaderTypography = parseArgs(
		attributes?.tableHeaderTypography,
		{
			'font-weight': '400',
		}
	);
	const typographyValueGlobal = attributes.tableHeaderTypographyGlobal
		? attributes.tableHeaderTypographyGlobal
		: '';

	return {
		...getTypographyCSS(
			tableHeaderTypography,
			device,
			typographyValueGlobal
		),
	};
};

export const getCartListProductTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = attributes?.productTitleTypography
		? attributes?.productTitleTypography
		: [];
	const typographyValueGlobal = attributes.productTitleTypographyGlobal
		? attributes.productTitleTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		color: getTextColorCSS( attributes?.productTitleColor ),
	};
};

export const getCartListProductSubTitleCSS = ( attributes, device = '' ) => {
	const productsubTitleTypography = parseArgs(
		attributes?.productsubTitleTypography ?? '',
		{
			'font-weight': '400',
		}
	);
	const typographyValueGlobal = attributes.productsubTitleTypographyGlobal
		? attributes.productsubTitleTypographyGlobal
		: '';
	return {
		...getTypographyCSS(
			productsubTitleTypography,
			device,
			typographyValueGlobal
		),
		color: getTextColorCSS( attributes?.productSubTitleColor ),
	};
};

export const getCartListPoductPriceCSS = ( attributes, device = '' ) => {
	const productPriceTypography = parseArgs(
		attributes?.productPriceTypography,
		{
			'font-weight': '400',
		}
	);
	const typographyValueGlobal = attributes.productPriceTypographyGlobal
		? attributes.productPriceTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.productPriceColor ),
		...getTypographyCSS(
			productPriceTypography,
			device,
			typographyValueGlobal
		),
	};
};
