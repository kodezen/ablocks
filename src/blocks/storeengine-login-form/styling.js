import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import {
	getCSS as getBackgroundCSS,
	getHoverCSS as getBackgroundHoverCSS,
} from '@Controls/background/helper';
import { getCSS as getBorderCSS } from '@Controls/border/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getFormCardCss = ( attributes, device = '' ) => {
	const css = {
		...getBackgroundCSS( attributes?.form_bg_color, 'background', device ),
		...getBorderCSS( attributes?.form_border, device ),
		...getDimensionCSS( attributes?.form_padding, 'padding', device ),
	};
	return css;
};

export const getInputFieldCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.inputFieldColor ),
		background: getTextColorCSS( attributes?.input_field_bg_color ),
		...getBorderCSS( attributes?.input_field_border, device ),
		...getDimensionCSS(
			attributes?.input_field_padding,
			'padding',
			device
		),
	};
	return css;
};
export const getInputFieldPlaceholderCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.inputFieldColor ),
	};
};

export const getFormCardHoverCss = ( attributes, device = '' ) => {
	return {
		...getBackgroundHoverCSS(
			attributes?.form_bg_color,
			'background',
			device
		),
	};
};

export const getLoginButtonHoverCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.login_btn_hover_color ),
		background: getTextColorCSS( attributes?.login_btn_bg_hover_color ),
	};
};

export const getLoginFormButtonCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.login_btn_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.login_btn_typographyGlobal
		? attributes.login_btn_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.login_btn_bg_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	return css;
};

export const getFormTitleCss = ( attributes, device = '' ) => {
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
export const getFormFooterTitleCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs(
		attributes.form_footer_title_typography,
		{
			weight: '400',
		}
	);
	const typographyValueGlobal = attributes.form_footer_title_typographyGlobal
		? attributes.form_footer_title_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.form_footer_title_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const inputFieldLabelCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs(
		attributes.input_field_label_typography,
		{
			weight: '400',
		}
	);
	const typographyValueGlobal = attributes.input_field_label_typographyGlobal
		? attributes.input_field_label_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.input_field_label_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const inputFieldLabelHoverCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.input_field_label_hover_color ),
	};
};

export const formTitleDesktopHoverCss = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.title_hover_color ) };
};
