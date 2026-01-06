import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getKeyColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	const css = {};
	return {
		...css,
	};
};

export const getDynamicTextCSS = ( attributes, device = '' ) => {
	const css = {};
	const typographyValue = parseArgs( attributes.dynamicTypography, {
		weight: '500',
	} );
	if ( attributes?.dynamicTextColor ) {
		css.color = getKeyColorCSS( attributes?.dynamicTextColor );
	}
	return {
		...css,
		...getTypographyCSS( typographyValue, device ),
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};
