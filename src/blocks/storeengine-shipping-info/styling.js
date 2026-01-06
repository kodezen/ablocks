import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getShippingHeadingCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs(
		attributes?.shipping_heading_typograhy,
		'',
		{
			weight: '400',
		}
	);
	const typographyValueGlobal = attributes.shipping_heading_typograhyGlobal
		? attributes.shipping_heading_typograhyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.shipping_heading_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getShippingAddressCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs(
		attributes?.shipping_address_typograhy,
		'',
		{
			weight: '400',
		}
	);
	const typographyValueGlobal = attributes.shipping_address_typograhyGlobal
		? attributes.shipping_address_typograhyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.shipping_address_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
