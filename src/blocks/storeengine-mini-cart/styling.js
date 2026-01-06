import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';

export const getIconButtonCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.iconColor ),
	};
};

export const getIconTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.countTypography, {
		weight: '400',
	} );
	const typographyVlaueGlobal = attributes.countTypographyGlobal
		? attributes.countTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.countColor ),
		background: getTextColorCSS( attributes?.countBg ),
		...getTypographyCSS( typographyValue, device, typographyVlaueGlobal ),
	};
};
