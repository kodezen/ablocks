import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getMarginCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getCounterCircleWrapperCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.alignment[ 'value' + device ] ) {
		css[ 'justify-content' ] = attributes?.alignment[ 'value' + device ];
		css[ 'align-items' ] = attributes?.alignment[ 'value' + device ];
	}
	return css;
};
export const getNumberWrapperCSS = ( attributes, device = '' ) => {
	const counterNumberWrapperCSS = {};

	const alignment = attributes?.alignment[ 'value' + device ];
	if ( alignment ) {
		counterNumberWrapperCSS[ 'justify-content' ] = alignment;

		if ( alignment === 'center' ) {
			counterNumberWrapperCSS[ 'text-align' ] = 'center';
		} else if ( alignment === 'flex-end' ) {
			counterNumberWrapperCSS[ 'text-align' ] = 'right';
		}
	}

	return counterNumberWrapperCSS;
};

export const getCounterBarCSS = ( attributes, device = '' ) => {
	const css = {};
	const alignment = attributes?.alignment || {};
	const deviceKey = 'value' + device;

	const alignmentValue = alignment[ deviceKey ] || alignment.value;

	if ( alignmentValue ) {
		css[ 'align-items' ] = alignmentValue;
	}
	return css;
};

export const getNumberTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.numberTypography, {
		weight: '400',
	} );
	const contentMarginUnit = parseArgs( attributes?.numberMargin, {
		unit: 'px',
	} );
	const typographyValueGlobal = attributes.numberTypographyGlobal
		? attributes.numberTypographyGlobal
		: '';
	const numberTextCSS = {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getMarginCSS( contentMarginUnit, 'margin', device ),
	};
	if ( attributes?.numberColor ) {
		numberTextCSS.color = getTextColorCSS( attributes?.numberColor );
	}
	if (
		attributes?.mediaPosition === 'leftOfNumber' ||
		attributes?.mediaPosition === 'rightOfNumber' ||
		attributes?.layout === 'bar'
	) {
		numberTextCSS.display = 'inline-flex';
		numberTextCSS[ 'align-items' ] = 'center';
		numberTextCSS[ 'justify-content' ] = 'center';
	} else {
		numberTextCSS.display = 'block';
	}
	return numberTextCSS;
};

export const getHeadingTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.headingTypography, {
		weight: '400',
	} );
	const contentMarginUnit = parseArgs( attributes?.headingMargin, {
		unit: 'px',
	} );
	const typographyValueGlobal = attributes.headingTypographyGlobal
		? attributes.headingTypographyGlobal
		: '';
	const HeadingTextCSS = {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getMarginCSS( contentMarginUnit, 'margin', device ),
	};
	if ( attributes?.headingColor ) {
		HeadingTextCSS.color = getTextColorCSS( attributes?.headingColor );
	}
	return HeadingTextCSS;
};

export const getCounterBarBgCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.barBackgroundColor ) };
};

export const getCounterBarProgressCSS = ( attributes, device = '' ) => {
	const { barHeadingPosition, barSize } = attributes;

	const counterBarProgressCSS = {
		...getRangeCSS( {
			attributeValue: barSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 40,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	if ( barHeadingPosition && barHeadingPosition === 'inner' ) {
		counterBarProgressCSS[ 'justify-content' ] = 'space-between';
	}
	if (
		barHeadingPosition &&
		( barHeadingPosition === 'top' || barHeadingPosition === 'bottom' )
	) {
		counterBarProgressCSS[ 'justify-content' ] = 'right';
	}
	return {
		background: getTextColorCSS( attributes?.barProgressColor ),
		...counterBarProgressCSS,
	};
};
export const getCounterCircleCSS = ( attributes, device = '' ) => {
	const counterCircleCSS = {
		// 'align-items': 'center',
	};
	if ( attributes?.alignment[ 'value' + device ] === 'center' ) {
		counterCircleCSS[ 'align-items' ] = 'center';
	} else if ( attributes?.alignment[ 'value' + device ] === 'left' ) {
		counterCircleCSS[ 'align-items' ] = 'flex-start';
	} else if ( attributes?.alignment[ 'value' + device ] === 'right' ) {
		counterCircleCSS[ 'align-items' ] = 'flex-end';
	}

	return counterCircleCSS;
};
export const getCounterCircleBgCSS = ( attributes ) => {
	return {
		stroke: getTextColorCSS( attributes?.circleBackgroundColor ),
		...getRangeCSS( {
			attributeValue: attributes?.circleStrokeSize,
			attributeObjectKey: 'value',
			defaultValue: 20,
			property: 'stroke-width',
		} ),
	};
};

export const getCounterCircleProgressCSS = ( attributes ) => {
	return {
		stroke: getTextColorCSS( attributes?.circleProgressColor ),
		...getRangeCSS( {
			attributeValue: attributes?.circleStrokeSize,
			attributeObjectKey: 'value',
			defaultValue: 20,
			property: 'stroke-width',
		} ),
	};
};
