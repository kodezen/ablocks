import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getMarginCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';

export const get_info_box = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.iconGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 16,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
	};

	if ( attributes.iconPlacement[ 'value' + device ] ) {
		css.display = 'flex';
		css[ 'flex-direction' ] = attributes.iconPlacement[ 'value' + device ];
	}

	if ( attributes.iconAlignment[ 'value' + device ] ) {
		css[ 'align-items' ] = attributes.iconAlignment[ 'value' + device ];
	}
	return css;
};

export const get_badge_css = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.badgeTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};

	if ( attributes.badgePosition[ 'value' + device ] ) {
		if ( attributes.badgePosition[ 'value' + device ] === 'top-left' ) {
			if ( attributes._padding[ 'common' + device ] ) {
				css.top = `-${ attributes._padding[ 'common' + device ] }px`;
				css.left = `-${ attributes._padding[ 'common' + device ] }px`;
			} else if (
				! attributes._padding.common &&
				! attributes._padding.commonTablet &&
				! attributes._padding.commonMobile
			) {
				if (
					! attributes._padding.top &&
					! attributes._padding.topTablet &&
					! attributes._padding.topMobile
				) {
					css.top = '-30px';
				}
				if (
					! attributes._padding.left &&
					! attributes._padding.leftTablet &&
					! attributes._padding.leftMobile
				) {
					css.left = '-30px';
				}
			}
			css.bottom = 'auto';
			css.right = 'auto';
		} else if (
			attributes.badgePosition[ 'value' + device ] === 'top-right'
		) {
			if ( attributes._padding[ 'common' + device ] ) {
				css.top = `-${ attributes._padding[ 'common' + device ] }px`;
				css.right = `-${ attributes._padding[ 'common' + device ] }px`;
			} else if (
				! attributes._padding.common &&
				! attributes._padding.commonTablet &&
				! attributes._padding.commonMobile
			) {
				if (
					! attributes._padding.top &&
					! attributes._padding.topTablet &&
					! attributes._padding.topMobile
				) {
					css.top = '-30px';
				}
				if (
					! attributes._padding.right &&
					! attributes._padding.rightTablet &&
					! attributes._padding.rightMobile
				) {
					css.right = '-30px';
				}
			}
			css.left = 'auto';
			css.bottom = 'auto';
		} else if (
			attributes.badgePosition[ 'value' + device ] === 'bottom-left'
		) {
			if ( attributes._padding[ 'common' + device ] ) {
				css.bottom = `-${ attributes._padding[ 'common' + device ] }px`;
				css.left = `-${ attributes._padding[ 'common' + device ] }px`;
			} else if (
				! attributes._padding.common &&
				! attributes._padding.commonTablet &&
				! attributes._padding.commonMobile
			) {
				if (
					! attributes._padding.bottom &&
					! attributes._padding.bottomTablet &&
					! attributes._padding.bottomMobile
				) {
					css.bottom = '-30px';
				}
				if (
					! attributes._padding.left &&
					! attributes._padding.leftTablet &&
					! attributes._padding.leftMobile
				) {
					css.left = '-30px';
				}
			}
			css.top = 'auto';
			css.right = 'auto';
		} else if (
			attributes.badgePosition[ 'value' + device ] === 'bottom-right'
		) {
			if ( attributes._padding[ 'common' + device ] ) {
				css.bottom = `-${ attributes._padding[ 'common' + device ] }px`;
				css.right = `-${ attributes._padding[ 'common' + device ] }px`;
			} else if (
				! attributes._padding.common &&
				! attributes._padding.commonTablet &&
				! attributes._padding.commonMobile
			) {
				if (
					! attributes._padding.bottom &&
					! attributes._padding.bottomTablet &&
					! attributes._padding.bottomMobile
				) {
					css.bottom = '-30px';
				}
				if (
					! attributes._padding.right &&
					! attributes._padding.rightTablet &&
					! attributes._padding.rightMobile
				) {
					css.right = '-30px';
				}
			}
			css.left = 'auto';
			css.top = 'auto';
		}
	}
	//
	if ( attributes.badgePosition[ 'value' + device ] ) {
		if ( attributes.badgePosition[ 'value' + device ] === 'top-left' ) {
			if ( attributes._padding[ 'top' + device ] ) {
				css.top = `-${ attributes._padding[ 'top' + device ] }px`;
			} else if (
				! attributes._padding.top &&
				! attributes._padding.topTablet &&
				! attributes._padding.topMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.top = '-30px';
				}
			}
			if ( attributes._padding[ 'left' + device ] ) {
				css.left = `-${ attributes._padding[ 'left' + device ] }px`;
			} else if (
				! attributes._padding.left &&
				! attributes._padding.leftTablet &&
				! attributes._padding.leftMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.left = '-30px';
				}
			}
			css.bottom = 'auto';
			css.right = 'auto';
		} else if (
			attributes.badgePosition[ 'value' + device ] === 'top-right'
		) {
			if ( attributes._padding[ 'top' + device ] ) {
				css.top = `-${ attributes._padding[ 'top' + device ] }px`;
			} else if (
				! attributes._padding.top &&
				! attributes._padding.topTablet &&
				! attributes._padding.topMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.top = '-30px';
				}
			}
			if ( attributes._padding[ 'right' + device ] ) {
				css.right = `-${ attributes._padding[ 'right' + device ] }px`;
			} else if (
				! attributes._padding.right &&
				! attributes._padding.rightTablet &&
				! attributes._padding.rightMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.right = '-30px';
				}
			}
			css.left = 'auto';
			css.bottom = 'auto';
		} else if (
			attributes.badgePosition[ 'value' + device ] === 'bottom-left'
		) {
			if ( attributes._padding[ 'bottom' + device ] ) {
				css.bottom = `-${ attributes._padding[ 'bottom' + device ] }px`;
			} else if (
				! attributes._padding.bottom &&
				! attributes._padding.bottomTablet &&
				! attributes._padding.bottomMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.bottom = '-30px';
				}
			}
			if ( attributes._padding[ 'left' + device ] ) {
				css.left = `-${ attributes._padding[ 'left' + device ] }px`;
			} else if (
				! attributes._padding.left &&
				! attributes._padding.leftTablet &&
				! attributes._padding.leftMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.left = '-30px';
				}
			}
			css.top = 'auto';
			css.right = 'auto';
		} else if (
			attributes.badgePosition[ 'value' + device ] === 'bottom-right'
		) {
			if ( attributes._padding[ 'bottom' + device ] ) {
				css.bottom = `-${ attributes._padding[ 'bottom' + device ] }px`;
			} else if (
				! attributes._padding.bottom &&
				! attributes._padding.bottomTablet &&
				! attributes._padding.bottomMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.bottom = '-30px';
				}
			}
			if ( attributes._padding[ 'right' + device ] ) {
				css.right = `-${ attributes._padding[ 'right' + device ] }px`;
			} else if (
				! attributes._padding.right &&
				! attributes._padding.rightTablet &&
				! attributes._padding.rightMobile
			) {
				if (
					! attributes._padding.common &&
					! attributes._padding.commonTablet &&
					! attributes._padding.commonMobile
				) {
					css.right = '-30px';
				}
			}
			css.left = 'auto';
			css.top = 'auto';
		}
	}
	const typographyValue = parseArgs( attributes.badgeTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes.badgeTypographyGlobal
		? attributes.badgeTypographyGlobal
		: [];
	return {
		...css,
		color: getTextColorCSS( attributes?.badgeTextColor ),
		background: getTextColorCSS( attributes?.badgeBackground ),
		...getBorderCSS( attributes?.badgeBorder, device ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getPaddingCSS( attributes?.badgePadding, 'padding', device ),
	};
};
export const get_badge_hover_css = ( attributes, device = '' ) => {
	const css = {};
	return {
		...css,
		color: getTextColorCSS( attributes?.badgeTextColorH ),
		background: getTextColorCSS( attributes?.badgeTextColorH ),
		...getBorderHoverCSS( attributes?.badgeBorder, device ),
	};
};
export const get_badge_text_css = ( attributes ) => {
	return {
		...getTextShadowCSS( attributes?.badgeTextShadow ),
	};
};

export const get_icon_wrapper_extra_css = ( attributes, device = '' ) => {
	const css = {};
	const iconMarginUnit = parseArgs( attributes?.iconMargin, {
		unit: 'px',
	} );

	return {
		...css,
		...getMarginCSS( iconMarginUnit, 'margin', device ),
	};
};
export const get_icon_css_hover = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.iconTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
	if ( attributes.iconPrimaryColorH ) {
		css.fill = getTextColorCSS( attributes?.iconPrimaryColorH );
	}

	return css;
};
export const get_icon_background_css_hover = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.iconTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
	if ( attributes.iconBackgroundColorH ) {
		css.background = attributes.iconBackgroundColorH;
	}

	return css;
};

export const get_info_box_content = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.contentGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 10,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
	};

	if ( attributes.alignment[ 'value' + device ] ) {
		css[ 'align-items' ] = attributes.alignment[ 'value' + device ];
	}

	return css;
};

export const get_heading_text_css = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.headingTypography, {
		weight: '500',
	} );
	const css = [];
	if ( attributes.alignment[ 'value' + device ] === 'flex-start' ) {
		css[ 'text-align' ] = 'left';
	} else if ( attributes.alignment[ 'value' + device ] === 'flex-end' ) {
		css[ 'text-align' ] = 'right';
	} else {
		css[ 'text-align' ] = attributes.alignment[ 'value' + device ];
	}
	const headingMarginUnit = parseArgs( attributes?.headingMargin, {
		unit: 'px',
	} );
	const typographyGlobal = attributes.headingTypographyGlobal
		? attributes.headingTypographyGlobal
		: [];
	return {
		...css,
		color: getTextColorCSS( attributes?.headingTextColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getTextStrokeCSS( attributes?.headingTextStroke, device ),
		...getTextShadowCSS( attributes?.headingTextShadow ),
		...getMarginCSS( headingMarginUnit, 'margin', device ),
	};
};
export const get_heading_text_css_hover = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.headingTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
	if ( attributes.headingTextColorHover ) {
		css.color = getTextColorCSS( attributes?.headingTextColorHover );
	}
	return css;
};

export const get_sub_heading_text_css = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.subHeadingTypography, {
		weight: '400',
	} );
	const css = [];
	if ( attributes.alignment[ 'value' + device ] === 'flex-start' ) {
		css[ 'text-align' ] = 'left';
	} else if ( attributes.alignment[ 'value' + device ] === 'flex-end' ) {
		css[ 'text-align' ] = 'right';
	} else {
		css[ 'text-align' ] = attributes.alignment[ 'value' + device ];
	}
	const subHeadingMarginUnit = parseArgs( attributes?.subHeadingMargin, {
		unit: 'px',
	} );
	const typographyGlobal = attributes.subHeadingTypographyGlobal
		? attributes.subHeadingTypographyGlobal
		: [];
	return {
		...css,
		color: getTextColorCSS( attributes?.subHeadingTextColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getTextStrokeCSS( attributes?.subHeadingTextStroke, device ),
		...getTextShadowCSS( attributes?.subHeadingTextShadow ),
		...getMarginCSS( subHeadingMarginUnit, 'margin', device ),
	};
};
export const get_sub_heading_text_css_hover = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.subHeadingTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
	if ( attributes.subHeadingTextColorHover ) {
		css.color = getTextColorCSS( attributes?.subHeadingTextColorHover );
	}

	return css;
};

export const get_des_text_css = ( attributes, device = '' ) => {
	const css = [];
	if ( attributes.alignment[ 'value' + device ] === 'flex-start' ) {
		css[ 'text-align' ] = 'left';
	} else if ( attributes.alignment[ 'value' + device ] === 'flex-end' ) {
		css[ 'text-align' ] = 'right';
	} else {
		css[ 'text-align' ] = attributes.alignment[ 'value' + device ];
	}
	const typographyValue = parseArgs( attributes.desTypography, {
		weight: '400',
	} );
	const desMarginUnit = parseArgs( attributes?.desMargin, {
		unit: 'px',
	} );
	const typographyGlobal = attributes.desTypographyGlobal
		? attributes.desTypographyGlobal
		: [];
	return {
		...css,
		color: getTextColorCSS( attributes?.desTextColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getTextStrokeCSS( attributes?.desTextStroke, device ),
		...getTextShadowCSS( attributes?.desTextShadow ),
		...getMarginCSS( desMarginUnit, 'margin', device ),
	};
};
export const get_des_text_css_hover = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.desTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
	if ( attributes.desTextColorHover ) {
		css.color = getTextColorCSS( attributes?.desTextColorHover );
	}
	return css;
};
export const get_des_drop_text_css = ( attributes ) => {
	const css = {};
	if ( attributes.desDropCapsTextColor ) {
		css.color = getTextColorCSS( attributes?.desDropCapsTextColor );
	}

	return css;
};

export const getContainerCSS = ( attributes, device = '' ) => {
	const ratingMarginUnit = parseArgs( attributes?.ratingMargin, {
		unit: 'px',
	} );
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.ratingNumberGap,
			attributeObjectKey: 'value',
			defaultValue: 0,
			hasUnit: true,
			unitDefaultValue: 'px',
			isResponsive: true,
			property: 'gap',
			device,
		} ),
		...getMarginCSS( ratingMarginUnit, 'margin', device ),
	};

	return {
		...css,
		...getAlignmentCSS( attributes?.alignment, 'justify-content', device ),
	};
};
export const get_rating_number_css = ( attributes, device = '' ) => {
	const css = [];
	if ( attributes.ratingNumberPosition !== '' ) {
		if ( attributes.ratingNumberPosition === 'left' ) {
			css.order = '-5';
		} else {
			css.order = '10';
		}
	}
	const typographyValue = parseArgs( attributes.ratingNumberTypography, {
		weight: '400',
	} );
	const typographyGlobal = attributes.ratingNumberTypographyGlobal
		? attributes.ratingNumberTypographyGlobal
		: [];
	return {
		...css,
		color: getTextColorCSS( attributes?.ratingNumberColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
	};
};
export const get_ratings_css = ( attributes, device = '' ) => {
	const ratingsCSS = {
		...getRangeCSS( {
			attributeValue: attributes?.spacing,
			attributeObjectKey: 'value',
			defaultValue: 0,
			hasUnit: true,
			unitDefaultValue: 'px',
			isResponsive: true,
			property: 'gap',
			device,
		} ),
	};
	return ratingsCSS;
};
export const get_fill_rating_css = ( attributes ) => {
	const css = [];
	if ( attributes.ratingColor ) {
		css.fill = getTextColorCSS( attributes?.ratingColor );
	}

	return css;
};
export const get_unfill_rating_css = ( attributes ) => {
	const css = [];
	if ( attributes.ratingUnmarkedColor ) {
		css.fill = getTextColorCSS( attributes?.ratingUnmarkedColor );
	}

	return css;
};
export const get_fill_rating_css_hover = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.ratingTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
	if ( attributes.ratingColorHover ) {
		css.fill = getTextColorCSS( attributes?.ratingColorHover );
	}

	return css;
};
export const get_unfill_rating_css_hover = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.ratingTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
	if ( attributes.ratingUnmarkedColorHover ) {
		css.fill = getTextColorCSS( attributes?.ratingUnmarkedColorHover );
	}
	return css;
};

export const get_button_css = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.btnTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.btnIconSpace,
			attributeObjectKey: 'value',
			defaultValue: 10,
			unitDefaultValue: 'px',
			property: 'column-gap',
			device,
		} ),
	};
	const typographyValue = parseArgs( attributes.btnTypography, {
		weight: '400',
	} );
	const btnMarginUnit = parseArgs( attributes?.btnMargin, {
		unit: 'px',
	} );
	const typographyGlobal = attributes.btnTypographyGlobal
		? attributes.btnTypographyGlobal
		: [];
	return {
		...css,
		color: getTextColorCSS( attributes?.btnTextColor ),
		background: getTextColorCSS( attributes?.btnBackground ),
		...getBorderCSS( attributes?.btnBorder, device ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getPaddingCSS( attributes?.btnPadding, 'padding', device ),
		...getMarginCSS( btnMarginUnit, 'margin', device ),
	};
};
export const get_button_hover_css = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.btnTextColorH ),
		background: getTextColorCSS( attributes?.btnBackgroundH ),
		...getBorderHoverCSS( attributes?.btnBorder, device ),
	};
};
export const get_button_icon_hover_css = ( attributes ) => {
	const css = {};

	if ( attributes?.btnTextColorH ) {
		css.fill = getTextColorCSS( attributes?.btnTextColorH );
	}

	return css;
};
export const get_button_text_css = ( attributes ) => {
	return {
		...getTextShadowCSS( attributes?.btnTextShadow ),
	};
};
