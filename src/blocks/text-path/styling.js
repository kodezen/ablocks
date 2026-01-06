import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getTextPathContainerCSS = ( attributes, device = '' ) => {
	const { alignment } = attributes;

	const textPathContainerCSS = {};

	const textPathCSS = {};

	if ( alignment[ `value${ device }` ] ) {
		textPathContainerCSS[ 'justify-content' ] =
			alignment[ `value${ device }` ];
	}

	// Combine and return the CSS
	return {
		...textPathContainerCSS,
		...textPathCSS,
	};
};

export const getTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.typography, {
		'font-weight': '400',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	const stockUnitValue = parseArgs( attributes.textStroke, {
		strokeWidthUnit: 'px',
	} );
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( stockUnitValue, device ),
		...getTextShadowCSS( attributes?.textShadow ),
	};
};

export const getTextPathCSS = ( attributes ) => {
	return {
		transform: `rotate(${ attributes?.rotate }deg)`,
		'--width': `${ attributes?.iconSize }px`,
	};
};

export const getTextHoverCSS = ( attributes, device = '' ) => {
	const css = {
		fill: getTextColorCSS( attributes?.textColorH ),
		...getRangeCSS( {
			attributeValue: attributes?.transition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
		} ),
	};
	return {
		...css,
	};
};
