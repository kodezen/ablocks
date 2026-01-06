import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getPinCSS = ( list, attributes ) => {
	return {
		left: `${ list.xAxis }%`,
		top: `${ list.yAxis }%`,
		'background-color':
			getTextColorCSS( list.pinColorEffect ) ||
			getTextColorCSS( attributes?.pinColorEffect ),
		width: `${ list.pinSize || attributes.pinSize }px`,
		height: `${ list.pinSize || attributes.pinSize }px`,
		transform: 'translate(-50%, -50%)',
	};
};

export const getPinEffectCSS = ( list, attributes ) => {
	return {
		'background-color':
			getTextColorCSS( list.pinColor ) ||
			getTextColorCSS( attributes?.pinColor ),
		width: `${ list.pinSize || attributes.pinSize }px`,
		height: `${ list.pinSize || attributes.pinSize }px`,
	};
};

export const getPinHoverCSS = ( list, attributes ) => {
	return {
		'background-color':
			getTextColorCSS( list.pinHoverColor ) ||
			getTextColorCSS( attributes?.pinHoverColor ),
		transform: 'translate(-50%, -50%)',
		'--ablocks-hotspot-effect-max-scale':
			list.pinHoverSize || attributes.pinHoverSize,
	};
};

export const getPinHoverEffectCSS = ( list, attributes ) => {
	return {
		'background-color':
			getTextColorCSS( list.pinHoverColor ) ||
			getTextColorCSS( attributes?.pinHoverColor ),
		'--ablocks-hotspot-effect-max-scale':
			list.pinHoverSize || attributes.pinHoverSize,
	};
};

export const getTooltipContentCSS = ( attributes, device = '' ) => {
	const { childWidth, contentPosition, contentAnimation } = attributes;
	// Set transform values for sliding animations
	let translateXStart = '0px';
	let translateYStart = '0px';
	let translateXEnd = '-50%';
	let translateYEnd = '0px';

	// Default transform for bottom position
	let contentTransform = {
		transform: 'translate(-50%, 40px)',
	};

	if ( contentPosition === 'top' ) {
		contentTransform = {
			transform: `translate(-50%, calc(-100% - 40px))`,
		};
	} else if ( contentPosition === 'left' ) {
		contentTransform = {
			transform: 'translate(calc(-100% - 40px), -50%)',
		};
	} else if ( contentPosition === 'right' ) {
		contentTransform = {
			transform: 'translate(40px, -50%)',
		};
	}

	// Set default animation duration and ease if not provided
	const animationDuration = '0.5s';
	const animationEase = 'ease';

	// Set animation style dynamically based on contentAnimation
	let animationStyle = '';
	if ( contentAnimation === 'ablocks-hotspot-fadeIn' ) {
		animationStyle = 'ablocks-hotspot-fadeIn 1.0s ease forwards';
	} else if ( contentAnimation === 'ablocks-hotspot-fadeGrow' ) {
		animationStyle = 'ablocks-hotspot-fadeGrow 0.5s ease';
		switch ( contentPosition ) {
			case 'top':
				translateXStart = translateXEnd = '-50%';
				translateYStart = translateYEnd = 'calc(-100% - 40px)';
				break;
			case 'bottom':
				translateXStart = translateXEnd = '-50%';
				translateYStart = translateYEnd = '40px';
				break;
			case 'left':
				translateXStart = translateXEnd = 'calc(-100% - 40px)';
				translateYStart = translateYEnd = '-50%';
				break;
			case 'right':
				translateXStart = translateXEnd = '40px';
				translateYStart = translateYEnd = '-50%';
				break;
			default:
				break;
		}
	} else if (
		[
			'ablocks-hotspot-slideInTop',
			'ablocks-hotspot-slideInBottom',
			'ablocks-hotspot-slideInLeft',
			'ablocks-hotspot-slideInRight',
		].includes( contentAnimation )
	) {
		animationStyle = `ablocks-hotspot-slideIn ${ animationDuration } ${ animationEase } forwards`;
	}

	let width = '';
	if ( childWidth.valueUnit === '%' ) {
		width = ` ${ childWidth[ 'value' + device ] }${
			childWidth[ 'valueUnit' + device ] || 'px'
		}`;
	}

	switch ( contentPosition ) {
		case 'top':
			translateXStart = '-50%';
			translateXEnd = '-50%';
			translateYStart = 'calc(-100% - 40px)';
			translateYEnd = 'calc(-100% - 40px)';

			switch ( contentAnimation ) {
				case 'ablocks-hotspot-slideInLeft':
					translateXStart = 'calc(-50% - 40px)';
					break;
				case 'ablocks-hotspot-slideInRight':
					translateXStart = 'calc(-50% + 40px)';
					break;
				case 'ablocks-hotspot-slideInTop':
					translateYStart = 'calc(-100% - 60px)';
					break;
				case 'ablocks-hotspot-slideInBottom':
					translateYStart = 'calc(-100% + 40px)';
					break;
				default:
					break;
			}
			break;
		case 'bottom':
			translateXStart = '-50%';
			translateXEnd = '-50%';
			translateYStart = '40px';
			translateYEnd = '40px';
			switch ( contentAnimation ) {
				case 'ablocks-hotspot-slideInLeft':
					translateXStart = 'calc(-50% - 40px)';
					break;
				case 'ablocks-hotspot-slideInRight':
					translateXStart = 'calc(-50% + 40px)';
					break;
				case 'ablocks-hotspot-slideInTop':
					translateYStart = 'calc(40px - 40px)';
					break;
				case 'ablocks-hotspot-slideInBottom':
					translateYStart = 'calc(40px + 40px)';
					break;
				default:
					break;
			}
			break;
		case 'left':
			translateXStart = 'calc(-100% - 40px)';
			translateXEnd = 'calc(-100% - 40px)';
			translateYStart = '-50%';
			translateYEnd = '-50%';
			switch ( contentAnimation ) {
				case 'ablocks-hotspot-slideInLeft':
					translateXStart = 'calc(-100% - 40px - 40px)';
					break;
				case 'ablocks-hotspot-slideInRight':
					translateXStart = 'calc(-100% - 40px + 40px)';
					break;
				case 'ablocks-hotspot-slideInTop':
					translateYStart = 'calc(-50% - 40px)';
					break;
				case 'ablocks-hotspot-slideInBottom':
					translateYStart = 'calc(-50% + 40px)';
					break;
				default:
					break;
			}
			break;
		case 'right':
			translateXStart = '40px';
			translateXEnd = '40px';
			translateYStart = '-50%';
			translateYEnd = '-50%';
			switch ( contentAnimation ) {
				case 'ablocks-hotspot-slideInLeft':
					translateXStart = 'calc(40px - 40px)';
					break;
				case 'ablocks-hotspot-slideInRight':
					translateXStart = 'calc(40px + 40px)';
					break;
				case 'ablocks-hotspot-slideInTop':
					translateYStart = 'calc(-50% - 40px)';
					break;
				case 'ablocks-hotspot-slideInBottom':
					translateYStart = 'calc(-50% + 40px)';
					break;
				default:
					break;
			}
			break;
		default:
			break;
	}

	return {
		animation: animationStyle,
		top: `${ attributes.lists[ attributes.activeIndex ]?.yAxis }%`,
		left: `${ attributes.lists[ attributes.activeIndex ]?.xAxis }%`,
		transform: contentTransform.transform,
		width,

		'--ablocks-hotspot-translateX-start': translateXStart,
		'--ablocks-hotspot-translateY-start': translateYStart,
		'--ablocks-hotspot-translateX-end': translateXEnd,
		'--ablocks-hotspot-translateY-end': translateYEnd,
	};
};

// child common style
export const getActiveContentCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.childWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 200,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
	};

	return {
		background: getTextColorCSS( attributes?.backgroundColor ),
		...css,
		...getBoxShadowCSS( attributes?.commonBoxShadow, 'box-shadow', device ),
	};
};

export const getActiveContentHoverCSS = ( attributes, device = '' ) => {
	const { commonBoxShadow } = attributes;

	return {
		...getBoxShadowHoverCSS( commonBoxShadow, 'box-shadow', device ),
	};
};
