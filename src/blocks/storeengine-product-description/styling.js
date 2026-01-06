import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';

export const getTitleCSS = ( attributes, device = '' ) => {
	const typographyGlobal = attributes?.titleTypographyGlobal
		? attributes?.titleTypographyGlobal
		: '';

	const typographyValue = parseArgs( attributes?.titleTypography, {
		'font-weight': '400',
	} );
	const buttonBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		color: getTextColorCSS( attributes?.titleColor ),
		...getBorderCSS( buttonBorderUnit, device ),
	};
};

export const getDescriptionCSS = ( attributes, device = '' ) => {
	const typographyGlobal = attributes?.descriptionTypographyGlobal
		? attributes?.descriptionTypographyGlobal
		: '';

	const typographyValue = parseArgs( attributes?.descriptionTypography, {
		'font-weight': '400',
	} );

	return {
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		color: getTextColorCSS( attributes?.descriptionColor ),
	};
};
