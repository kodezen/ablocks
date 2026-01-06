import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { getCSS as getFilterCSS } from '@Controls/css-filter/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	const imagePadding = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	const imageBorderUnit = parseArgs( attributes?.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...getDimensionCSS( imagePadding, 'padding', device ),
		...getBorderCSS( imageBorderUnit, device ),
	};
};
export const getWrapperHoverCSS = ( attributes, device = '' ) => {
	const imageBorderHoverUnit = parseArgs( attributes?.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( imageBorderHoverUnit, device ),
	};
};

export const getImageContainerCSS = ( attributes, device = '' ) => {
	const { alignment } = attributes;
	const css = {};
	const topDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.topWidth );
	const bottomDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.bottomWidth );
	const leftDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.leftWidth );
	const rightDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.rightWidth );

	//radius of diff
	const topRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.topRadius );
	const leftRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.leftRadius );
	const rightRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.rightRadius );
	const bottomRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.bottomRadius );

	css[ 'border-top-left-radius' ] = `${ topRadiusValue - topDiff }px`;
	css[ 'border-top-right-radius' ] = `${ rightRadiusValue - rightDiff }px`;
	css[ 'border-bottom-left-radius' ] = `${
		bottomRadiusValue - bottomDiff
	}px`;
	css[ 'border-bottom-right-radius' ] = `${ leftRadiusValue - leftDiff }px`;
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
	const { opacity } = attributes;
	const { imageScrollOption } = attributes;
	const checkHorizontalOption =
		imageScrollOption.value === 'horizontal-scroll' ||
		imageScrollOption.value === 'left-to-right' ||
		imageScrollOption.value === 'right-to-left';

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
		if ( checkHorizontalOption ) {
			css[ 'max-width' ] = 'none';
			css.height = '100%';
		}
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
	}

	return {
		...css,
		...ImageOpacity,
		...getFilterCSS( attributes?.cssFilter, device ),
	};
};

export const getImageHoverCSS = ( attributes, device = '' ) => {
	const { opacityH } = attributes;
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

	return {
		...css,
		...ImageOpacityH,
		...getFilterCSS( attributes?.cssHoverFilter, device ),
	};
};

export const getScrollCSS = ( attributes, device = '' ) => {
	const { scrollHeight } = attributes;
	const css = {};
	const height = {
		...getRangeCSS( {
			attributeValue: scrollHeight,
			isResponsive: true,
			property: 'height',
			defaultValue: 200,
			device,
		} ),
	};
	css.width = '100%';
	return {
		...height,
		...css,
	};
};
export const getScrollOptionCSS = ( attributes ) => {
	const { imageScrollOption } = attributes;
	const css = {};
	if ( imageScrollOption.value === 'mouse-scroll' ) {
		css.position = 'static';
		css[ 'overflow-y' ] = 'scroll';
		css[ 'overflow-x' ] = 'hidden';
	} else if ( imageScrollOption.value === 'top-to-bottom' ) {
		css.position = 'static';
		css.overflow = 'hidden';
	} else if ( imageScrollOption.value === 'bottom-to-top' ) {
		css.position = 'static';
		css.overflow = 'hidden';
	} else if ( imageScrollOption.value === 'horizontal-scroll' ) {
		css.position = 'static';
		css[ 'overflow-y' ] = 'hidden';
		css[ 'overflow-x' ] = 'scroll';
	} else if ( imageScrollOption.value === 'left-to-right' ) {
		css.position = 'static';
		css.overflow = 'hidden';
	} else if ( imageScrollOption.value === 'right-to-left' ) {
		css.position = 'static';
		css.overflow = 'hidden';
	}
	return css;
};

export const getImageFigureCSS = () => {
	const css = {};
	css.position = 'static !important';
	css.width = '100% !important';
	return css;
};
export const getImageOverlayCSS = ( attributes ) => {
	const css = {};
	const topDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.topWidth );
	const bottomDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.bottomWidth );
	const leftDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.leftWidth );
	const rightDiff = attributes?.border?.commonWidth
		? parseInt( attributes?.border?.commonWidth )
		: parseInt( attributes?.border?.rightWidth );

	//radius of diff
	const topRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.topRadius );
	const leftRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.leftRadius );
	const rightRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.rightRadius );
	const bottomRadiusValue = attributes?.border?.commonRadius
		? parseInt( attributes?.border?.commonRadius )
		: parseInt( attributes?.border?.bottomRadius );

	css[ 'border-top-left-radius' ] = `${ topRadiusValue - topDiff }px`;
	css[ 'border-top-right-radius' ] = `${ rightRadiusValue - rightDiff }px`;
	css[ 'border-bottom-left-radius' ] = `${
		bottomRadiusValue - bottomDiff
	}px`;
	css[ 'border-bottom-right-radius' ] = `${ leftRadiusValue - leftDiff }px`;
	css[ 'background-color' ] = getTextColorCSS( attributes?.overlayColor );
	css.position = 'absolute';
	css.top = '0';
	css.left = '0';
	css.right = '0';
	css.bottom = '0';
	// css['height']=`${attributes.overlayHeight}px`;
	css[ 'z-index' ] = 4;
	css.display = 'block';
	return css;
};
export const getImageOverlayHoverCSS = () => {
	const css = {};
	css.display = 'none';
	return css;
};
export const getIconWrapperCSS = ( attributes, device = '' ) => {
	const css = {};
	css.position = 'absolute';
	css.top = '45%';
	css.left = '50%';
	css[ 'z-index' ] = '5';
	css.opacity = '1';
	return {
		color: getTextColorCSS( attributes?.iconColor ) || 'black',
		...css,
		...getRangeCSS( {
			attributeValue: attributes?.iconFontSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 36,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
};
export const getIconWrapperHoverCSS = () => {
	const cssHover = {};
	cssHover.opacity = '0';
	return cssHover;
};
