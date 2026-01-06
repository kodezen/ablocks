import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	const alignmentMobileValue =
		device === 'Mobile'
			? attributes?.alignment?.valueMobile
			: attributes?.alignment?.value;

	let alignmentValue =
		device === 'Tablet'
			? attributes?.alignment?.valueTablet
			: alignmentMobileValue;

	alignmentValue = alignmentValue || 'center';
	let justifyContentValue;

	switch ( alignmentValue ) {
		case 'left':
			justifyContentValue = 'flex-start';
			break;
		case 'center':
			justifyContentValue = 'center';
			break;
		case 'right':
			justifyContentValue = 'flex-end';
			break;
		default:
			justifyContentValue = 'flex-start';
			break;
	}
	return {
		display: 'flex',
		'justify-content': justifyContentValue,
	};
};

// bar css
export const getProgressBarTrackCSS = ( attributes, device = '' ) => {
	const { barHeightSize } = attributes;
	const progressBorderUnit = parseArgs( attributes.barBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const progressBarTrackCSS = {
		background: getTextColorCSS( attributes?.barBackgroundColor ),
		...getRangeCSS( {
			attributeValue: barHeightSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 40,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
		...getBorderCSS( progressBorderUnit, device ),
	};
	return progressBarTrackCSS;
};

export const getProgressBarHoverCSS = ( attributes, device = '' ) => {
	const progressBorderHoverUnit = parseArgs( attributes?.barBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( progressBorderHoverUnit, device ),
	};
};

export const getProgressBarCSS = ( attributes ) => {
	const { direction } = attributes;
	const progressBarCSS = {};
	if ( direction === 'left' ) {
		progressBarCSS[ 'justify-content' ] = 'right';
	} else if ( direction === 'right' ) {
		progressBarCSS[ 'justify-content' ] = 'left';
	}
	return {
		background: getTextColorCSS( attributes?.barProgressColor ),
		...progressBarCSS,
	};
};

export const getProgressCircleCSS = ( attributes ) => {
	return { stroke: getTextColorCSS( attributes?.circleProgressColor ) };
};

export const getProgressCircleBgCSS = ( attributes ) => {
	const progressCircleBgCSS = {
		stroke: getTextColorCSS( attributes?.circleBackgroundColor ),
		...getRangeCSS( {
			attributeValue: attributes?.circleStrokeSize,
			attributeObjectKey: 'value',
			defaultValue: 10,
			unitDefaultValue: 'px',
			property: 'stroke-width',
		} ),
	};
	return progressCircleBgCSS;
};

export const getContentCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.contentTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.contentTypographyGlobal
		? attributes.contentTypographyGlobal
		: '';
	const contentCSS = {
		color: getTextColorCSS( attributes?.contentColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.contentTextStroke, device ),
		...getTextShadowCSS( attributes?.contentTextShadow ),
	};

	return contentCSS;
};
