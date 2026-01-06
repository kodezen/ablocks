import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
export const getVerificationIDCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	const css = {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	css.width = `100%`;
	css.display = `block`;
	return css;
};
