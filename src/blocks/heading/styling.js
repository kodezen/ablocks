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
export const getHeadingTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const stockUnitValue = parseArgs( attributes.textStroke, {
		strokeWidthUnit: 'px',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.textColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( stockUnitValue, device ),
		...getTextShadowCSS( attributes?.textShadow ),
	};
};

export const getHeadingatagCSS = ( attributes ) => {
	const decoration = attributes?.typography?.decoration;
	return decoration ? { 'text-decoration': decoration } : {};
};

export const getSvgPathCSS = ( attributes, device = '' ) => {
	const {
		highlightColor,
		highlightStrokeWidth = {},
		highlightDuration,
		highlightDelay,
		isInfiniteLoop,
	} = attributes;

	const count = isInfiniteLoop ? 'infinite' : 1;
	const valueKey = device ? 'value' + device : 'value';
	const unitKey = device ? 'valueUnit' + device : 'valueUnit';
	const strokeWidthValue = highlightStrokeWidth[ valueKey ] ?? 0;
	const strokeWidthUnit = highlightStrokeWidth[ unitKey ] ?? 'px';
	const totalDuration =
		parseInt( highlightDuration ) + parseInt( highlightDelay );

	return {
		stroke: getTextColorCSS( highlightColor ),
		'stroke-width': strokeWidthValue + strokeWidthUnit,
		animation: `draw-auto ${ totalDuration }ms forwards ${ count }`,
	};
};

export const getHeadingGeneralCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const stockUnitValue = parseArgs( attributes.textStroke, {
		strokeWidthUnit: 'px',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.textColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( stockUnitValue, device ),
		...getTextShadowCSS( attributes?.textShadow ),
	};
};
export const getHeadingAnimatedCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.animatedTypography, {
		weight: '400',
	} );
	const stockUnitValue = parseArgs( attributes.animatedTextStroke, {
		strokeWidthUnit: 'px',
	} );
	return {
		color: getTextColorCSS( attributes?.animatedTextColor ),
		...getTypographyCSS( typographyValue, device ),
		...getTextStrokeCSS( stockUnitValue, device ),
		...getTextShadowCSS( attributes?.animatedTextShadow ),
	};
};
