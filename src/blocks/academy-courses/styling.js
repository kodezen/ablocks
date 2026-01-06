import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import {
	getCSS as getBackgroundCSS,
	getHoverCSS as getBackgroundHoverCSS,
} from '@Controls/background/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getCourseCardCss = ( attributes, device = '' ) => {
	return {
		...getBackgroundCSS(
			attributes?.card_background,
			'background',
			device
		),
		...getBorderCSS( attributes?.card_border, device ),
		...getDimensionCSS( attributes?.card_margin, 'margin', device ),
		...getDimensionCSS( attributes?.card_padding, 'padding', device ),
	};
};

export const getCourseCardHoverCss = ( attributes, device = '' ) => {
	return {
		...getBackgroundHoverCSS(
			attributes?.card_background,
			'background',
			device
		),
		...getBorderHoverCSS( attributes?.card_border, device ),
		...getDimensionCSS( attributes?.card_hover_margin, 'margin', device ),
		...getDimensionCSS( attributes?.card_hover_padding, 'padding', device ),
	};
};

export const getWishListIconCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.wish_icon_color ),
		...getBackgroundCSS(
			attributes?.wish_icon_background,
			'background',
			device
		),
	};
	return css;
};

export const getWishListIconHoverCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.wish_icon_hover_color ),
		...getBackgroundHoverCSS(
			attributes?.wish_icon_background,
			'background',
			device
		),
	};
	return css;
};

export const getCourseCardCategoryCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.cat_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.cat_typographyGlobal
		? attributes.cat_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.category_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const courseCardCategoryDesktopHoverCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.category_hover_color ),
	};
};

export const getCourseCardTitleCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.title_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.title_typographyGlobal
		? attributes.title_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.title_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const courseCardTitleDesktopHoverCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.title_hover_color ),
	};
};

export const getCourseCardAuthorCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.author_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.author_typographyGlobal
		? attributes.author_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.author_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const courseCardAuthorDesktopHoverCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.author_hover_color ),
	};
};

export const getCourseCardRatingCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.rating_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.rating_typographyGlobal
		? attributes.rating_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.rating_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const courseCardRatingDesktopHoverCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.rating_hover_color ),
	};
};

export const getCourseCardPriceCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.price_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.price_typographyGlobal
		? attributes.price_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.price_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const courseCardPriceDesktopHoverCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.price_hover_color ),
	};
};
