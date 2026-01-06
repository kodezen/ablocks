import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getWidthCSS } from '@Global/width/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const typographyGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: [];
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
	};
};

export const getListCSS = ( attributes, device = '' ) => {
	const css = {};
	const { spaceBetween, horizontalAlignment } = attributes;

	const stack = attributes[ `stack${ device }` ] || attributes.stack;
	const verticalAlignment =
		attributes[ `verticalAlignment${ device }` ] ||
		attributes.verticalAlignment;

	if (
		spaceBetween[ 'value' + device ] !== '' &&
		spaceBetween[ 'value' + device ] !== undefined
	) {
		css.gap = `${ spaceBetween[ 'value' + device ] }px`;
	}

	if ( stack === 'vertical' ) {
		css[ 'flex-direction' ] = 'column';
		if ( verticalAlignment ) {
			css[ 'align-items' ] = verticalAlignment;
		}
	} else if ( stack === 'horizontal' ) {
		css[ 'flex-direction' ] = 'row';
		if ( horizontalAlignment ) {
			css[ 'justify-content' ] = horizontalAlignment;
		}
	}
	return {
		...css,
		...getAlignmentCSS(
			attributes?.horizontalAlignment,
			'justify-content',
			device
		),
		...getWidthCSS(
			attributes[ `width${ device }` ] || attributes.width,
			'width',
			device
		),
	};
};

export const getListWrapperCSS = ( attributes, device = '' ) => {
	const { position, textIndent, markerType } = attributes;
	const css = {};

	if ( markerType === 'icon' ) {
		if (
			position[ 'value' + device ] !== '' &&
			position[ 'value' + device ] !== undefined
		) {
			css[ 'align-items' ] = position[ 'value' + device ];
		}
	}

	if (
		textIndent[ 'value' + device ] !== '' &&
		textIndent[ 'value' + device ] !== undefined
	) {
		css.gap = `${ textIndent[ 'value' + device ] }px`;
	}

	return css;
};

export const getDividerWrapperCSS = ( attributes, device = '' ) => {
	const { divider, dividerPatternUrl, weight, borderColor, width, stack } =
		attributes;
	const css = {};
	let widthCSS = {};
	let weightCSS = {};

	if ( divider && dividerPatternUrl ) {
		if ( stack === 'vertical' ) {
			weightCSS = {
				...getRangeCSS( {
					attributeValue: weight,
					attributeObjectKey: 'value',
					isResponsive: true,
					defaultValue: 100,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'border-bottom-width',
					device,
				} ),
			};
			css[ 'border-bottom-color' ] =
				getTextColorCSS( attributes?.borderColor ) || 'black';
			css[ 'border-bottom-style' ] = dividerPatternUrl;
		} else if ( stack === 'horizontal' ) {
			weightCSS = {
				...getRangeCSS( {
					attributeValue: weight,
					attributeObjectKey: 'value',
					isResponsive: true,
					defaultValue: 100,
					hasUnit: true,
					unitDefaultValue: 'px',
					property: 'border-right-width',
					device,
				} ),
			};
			css[ 'border-right-color' ] =
				getTextColorCSS( attributes?.borderColor ) || 'black';
			css[ 'border-right-style' ] = dividerPatternUrl;
		}
	}

	if ( stack === 'vertical' ) {
		widthCSS = {
			...getRangeCSS( {
				attributeValue: width,
				attributeObjectKey: 'value',
				isResponsive: true,
				defaultValue: 100,
				hasUnit: true,
				unitDefaultValue: 'px',
				property: 'width',
				device,
			} ),
		};
	}

	return {
		...css,
		...weightCSS,
		...widthCSS,
	};
};

export const getMarkerCSS = ( attributes, device ) => {
	const { markerColor, markerSize } = attributes;

	const css = {};

	if ( markerColor !== '' && markerColor !== undefined ) {
		css.background = getTextColorCSS( attributes?.markerColor );
	}

	if (
		markerSize[ 'value' + device ] !== '' &&
		markerSize[ 'value' + device ] !== undefined
	) {
		const size = `${ markerSize[ 'value' + device ] }px`;
		css[ 'max-width' ] = size;
		css[ 'max-height' ] = size;
		css[ 'min-width' ] = size;
		css[ 'min-height' ] = size;
	}

	return css;
};

export const getIconCSS = ( attributes, device = '' ) => {
	const {
		iconSize,
		iconColor,
		markerType,
		iconType,
		iconShape,
		iconBackgroundColor,
	} = attributes;
	const css = {};

	if ( markerType === 'icon' ) {
		if ( iconType === 'stacked' ) {
			css.background =
				getTextColorCSS( attributes?.iconBackgroundColor ) || '#ddd';
			css.padding = '.2em';
			css.color = getTextColorCSS( attributes?.iconColor ) || '#000000';

			if ( iconShape === 'circle' ) {
				css[ 'border-radius' ] = '50px';
			}
		} else if ( iconType === 'framed' ) {
			css.background =
				getTextColorCSS( attributes?.iconBackgroundColor ) ||
				'transparent';
			css.padding = '.2em';
			css.color = getTextColorCSS( attributes?.iconColor ) || '#69727d';
			css.border = `2px solid ${ iconColor || '#69727d' }`;

			if ( iconShape === 'circle' ) {
				css[ 'border-radius' ] = '50px';
			}
		}

		if (
			attributes[ 'iconColor' + device ] !== '' &&
			attributes.iconColor !== undefined
		) {
			css.color = getTextColorCSS( attributes?.iconColor );
			css.fill = getTextColorCSS( attributes?.iconColor );
		}
		if ( iconBackgroundColor !== '' && iconBackgroundColor !== undefined ) {
			css.background = getTextColorCSS( attributes?.iconBackgroundColor );
		}
	}
	const listPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	const listBorderUnit = parseArgs( attributes?.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...css,
		...getRangeCSS( {
			attributeValue: iconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 20,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
		...getBorderCSS( listBorderUnit, device ),
		...getDimensionCSS( listPaddingUnit, 'padding', device ),
	};
};

export const getIconHoverCSS = ( attributes, device = '' ) => {
	const listBorderHoberUnit = parseArgs( attributes?.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( listBorderHoberUnit, device ),
	};
};

export const getListTextCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.textColor ) };
};
