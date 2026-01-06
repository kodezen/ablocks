import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
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

export const getProductsCSS = ( attributes, device = '' ) => {
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

export const getProductsHoverCSS = ( attributes, device = '' ) => {
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

export const getProductsCardTitleCSS = ( attributes, device = '' ) => {
	const titleTypogaphy = parseArgs( attributes?.title_typography, {
		weight: '400',
	} );
	const titleTypographyGlobal = attributes?.title_typographyGlobal
		? attributes?.title_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes.title_color ),
		...getTypographyCSS( titleTypogaphy, device, titleTypographyGlobal ),
	};
};

export const getProdutsPriceCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.price_typography, {
		weight: '400',
	} );
	const typographyGlobal = attributes?.price_typographyGlobal
		? attributes?.price_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes.price_color ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
	};
};

export const getProductsCartButtonCSS = ( attributes, device = '' ) => {
	const typographyGlobal = attributes?.cart_button_typographyGlobal
		? attributes?.cart_button_typographyGlobal
		: '';
	const typographyValue = attributes?.cart_button_typography
		? getTypographyCSS(
				attributes?.cart_button_typography,
				device,
				typographyGlobal
		  )
		: [];
	return {
		color: getTextColorCSS( attributes.cart_button_text_color ),
		background: getTextColorCSS( attributes?.cart_button_color ),
		...typographyValue,
		...getRangeCSS( {
			attributeValue: attributes?.buttonWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			property: 'width',
			unitDefaultValue: '%',
			device,
		} ),
	};
};
export const getProductsCartButtonHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes.cart_button_text_hover_color ),
		background: getTextColorCSS( attributes?.cart_button_hover_color ),
	};
};
