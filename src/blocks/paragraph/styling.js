import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};
export const getParagraphTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.textColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.textStroke, device ),
		...getTextShadowCSS( attributes?.textShadow ),
	};
};

export const getParagraphDropTextCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.dropCapsTextColor ) };
};
