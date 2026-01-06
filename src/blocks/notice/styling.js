import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';
export const getNoticeHeaderCSS = ( attributes, device = '' ) => {
	const css = {};
	return {
		background: getTextColorCSS( attributes?.backgroundColor ),
		...getPaddingCSS( attributes?.noticeHeaderPadding, 'padding', device ),
		...css,
	};
};

export const getNoticeHeaderTitleCSS = ( attributes, device = '' ) => {
	const css = {};
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.textColor ),
		...getAlignmentCSS( attributes?.alignment, 'justify-content', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.textStroke, device ),
		...getTextShadowCSS( attributes?.textShadow ),
		...css,
	};
};
