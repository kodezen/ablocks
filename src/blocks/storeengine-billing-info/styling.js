import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getBillingHeadingCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.heading_typograhy, '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.heading_typograhyGlobal
		? attributes.heading_typograhyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.heading_color ),
		...getTypographyCSS(
			typographyValue,
			'',
			device,
			typographyValueGlobal
		),
	};
};
export const getBillingAddressCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.address_typograhy, '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.address_typograhyGlobal
		? attributes.address_typograhyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.address_color ),
		...getTypographyCSS(
			typographyValue,
			'',
			device,
			typographyValueGlobal
		),
	};
};
