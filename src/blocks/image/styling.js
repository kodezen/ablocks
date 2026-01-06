import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
	getCSS as getCaptionBorderCSS,
	getHoverCSS as getCaptionBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getFilterCSS } from '@Controls/css-filter/helper';
import { parseArgs } from '@Utils/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	const imagePadding = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	return {
		...getDimensionCSS( imagePadding, 'padding', device ),
	};
};

export const getImageContainerCSS = ( attributes, device = '' ) => {
	const { alignment } = attributes;
	const css = {};

	if (
		alignment[ 'value' + device ] !== '' &&
		alignment[ 'value' + device ] !== undefined
	) {
		css.display = 'flex';
		css[ 'justify-content' ] = alignment[ 'value' + device ];
	}

	return css;
};

export const getImageCSS = ( attributes, device = '' ) => {
	const { opacity, onHoverImg } = attributes;
	const css = {};
	const ImageOpacity = {
		...getRangeCSS( {
			attributeValue: opacity,
			defaultValue: 1,
			property: 'opacity',
			unitDefaultValue: '',
			device,
		} ),
	};

	if ( attributes[ 'imgUrl' + device ] ) {
		css[ 'max-width' ] = '100%';
		// css['display'] = 'inline-block';
		css.transition = '0.3s ease';
		css[ 'box-sizing' ] = 'border-box';
		if (
			attributes?.objectFit[ 'value' + device ] !== '' &&
			attributes?.objectFit[ 'value' + device ] !== 'default'
		) {
			css[ 'object-fit' ] = attributes?.objectFit[ 'value' + device ];
		}
		if (
			attributes.aspectRatio &&
			typeof attributes.aspectRatio === 'object'
		) {
			const aspectRatioValue = attributes.aspectRatio[ 'value' + device ];

			if ( aspectRatioValue && aspectRatioValue !== 'original' ) {
				css[ 'aspect-ratio' ] = aspectRatioValue;
			}
		}
		if ( onHoverImg === 'slide' ) {
			css.transform = 'translate3d(-40px, 0, 0)';
			css.transition = `transform 0.3s`;
		}
	}
	const imageBorderUnit = parseArgs( attributes?.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...css,
		...ImageOpacity,
		...getBorderCSS( imageBorderUnit, device ),
		...getFilterCSS( attributes?.cssFilter, device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
	};
};

export const getImageHoverCSS = ( attributes, device = '' ) => {
	const { onHoverImg, opacityH } = attributes;
	const css = {};
	const ImageOpacityH = {
		...getRangeCSS( {
			attributeValue: opacityH,
			defaultValue: '',
			property: 'opacity',
			unitDefaultValue: '',
			device,
		} ),
	};
	const transitionDurationRange = {
		...getRangeCSS( {
			attributeValue: attributes.transitionDuration,
			defaultValue: 0.5,
			property: 'transitionDuration',
			unitDefaultValue: '',
			device,
		} ),
	};
	const filterTransitionDurationRange = {
		...getRangeCSS( {
			attributeValue: attributes.filterTransitionDuration,
			defaultValue: 0.5,
			property: 'filterTransitionDuration',
			unitDefaultValue: '',
			device,
		} ),
	};
	if ( attributes[ 'imgUrl' + device ] ) {
		if ( onHoverImg === 'zoomin' ) {
			css.transform = 'scale(1.1)';
			css.transition = `transform 0.3s`;
		} else if ( onHoverImg === 'grayscale' ) {
			css.filter = 'grayscale(100%)';
			css.transition = `transform 0.3s`;
		} else if ( onHoverImg === 'blur' ) {
			css.filter = 'blur(3px)';
			css.transition = `transform 0.3s`;
		} else if ( onHoverImg === 'slide' ) {
			css.transform = 'translate3d(0, 0, 0)';
			css.transition = `transform 0.3s`;
		}
		if ( opacityH !== '' && opacityH !== undefined ) {
			css.opacity = opacityH;
		}
		if (
			attributes.border?.transitionDuration ||
			attributes.boxShadow?.transitionDuration ||
			filterTransitionDurationRange.filterTransitionDuration ||
			transitionDurationRange.transitionDuration
		) {
			css.transition = `
				border ${
					attributes.border?.transitionDuration ||
					transitionDurationRange.transitionDuration
				}s, 
				box-shadow ${
					attributes.boxShadow?.transitionDuration ||
					transitionDurationRange.transitionDuration
				}s,
				opacity ${ filterTransitionDurationRange.filterTransitionDuration }s, 
				filter ${ filterTransitionDurationRange.filterTransitionDuration }s, 
				transform 0.3s
			`;
		}
	}
	const imageBorderHoverUnit = parseArgs( attributes?.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		...css,
		...ImageOpacityH,
		...getBorderHoverCSS( imageBorderHoverUnit, device ),
		...getFilterCSS( attributes?.cssHoverFilter, device ),
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
	};
};

export const getImageCaptionCSS = ( attributes, device = '' ) => {
	const {
		captionColor,
		captionBackground,
		captionPosition,
		captionPadding,
		captionAlignment,
		captionTypography,
		captionBorder,
	} = attributes;
	const css = {};

	if ( captionColor !== '' && captionColor !== undefined ) {
		css.color = getTextColorCSS( attributes?.captionColor );
	}
	if ( captionBackground !== '' && captionBackground !== undefined ) {
		css.background = getTextColorCSS( attributes?.captionBackground );
	}
	if ( captionPosition !== '' && captionPosition === 'overlap' ) {
		css.width = '100%';
		css.position = 'absolute';
		css.bottom = 0;
		css.left = 0;
	}
	const captionPaddingUnit = parseArgs( captionPadding, {
		unit: 'px',
	} );
	const captionBorderUnit = parseArgs( captionBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const typographyValue = parseArgs( captionTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes.captionTypographyGlobal
		? attributes.captionTypographyGlobal
		: [];
	return {
		...css,
		...getDimensionCSS( captionPaddingUnit, 'padding', device ),
		...getAlignmentCSS( captionAlignment, 'text-align', device ),
		...getCaptionBorderCSS( captionBorderUnit, device ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getCaptionBorderCSS( captionBorder, device ),
	};
};

export const getImageCaptionHoverCSS = ( attributes, device = '' ) => {
	const { captionBorder } = attributes;
	const captionBorderHoverUnit = parseArgs( captionBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getCaptionBorderHoverCSS( captionBorderHoverUnit, device ),
	};
};
