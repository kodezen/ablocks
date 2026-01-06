import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getSearchBoxCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.search_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.search_typographyGlobal
		? attributes.search_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.search_box_color ),
		background: getTextColorCSS( attributes?.search_background_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( attributes?.search_border, device ),
	};
	return css;
};
export const getSearchBoxHoverCss = ( attributes, device = '' ) => {
	const css = {
		...getBorderHoverCSS( attributes?.search_border, device ),
	};

	return css;
};
export const getSearchBoxPlaceholderCss = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.search_placeholder_color ) };
};
export const getSearchBoxIconCss = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.search_icon_color ) };
};
