import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
export const getStatusTitleCSS = ( attributes, device = '' ) => {
	const css = {};

	css.color = attributes?.titleContentColor ?? '';

	const typographyValue = parseArgs( attributes?.titleContentTypography, {
		'font-weight': '400',
	} );
	const typographyGlobal = attributes?.titleContentTypographyGlobal
		? attributes?.titleContentTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...css,
	};
};

export const getDetilsTitleCSS = ( attributes, device = '' ) => {
	const css = {};

	css.color = attributes?.detailsColor ?? '';

	const typographyValue = parseArgs( attributes?.detailsTypography, {
		'font-weight': '400',
	} );
	const typographyGlobal = attributes?.detailsTypographyGlobal
		? attributes?.detailsTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...css,
	};
};
export const getEmailCSS = ( attributes, device = '' ) => {
	const css = {};

	css.color = attributes?.emailColor ?? '';

	const typographyValue = parseArgs( attributes?.emailTypography, {
		'font-weight': '400',
	} );
	const typographyGlobal = attributes?.emailTypographyGlobal
		? attributes?.emailTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...css,
	};
};
