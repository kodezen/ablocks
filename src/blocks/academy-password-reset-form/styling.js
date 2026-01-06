import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getResetFormCss = ( attributes, device = '' ) => {
	const css = {
		background: getTextColorCSS( attributes?.form_background_color ),
		...getBorderCSS( attributes?.form_border, device ),
		...getDimensionCSS( attributes?.form_padding, 'padding', device ),
	};
	return css;
};
export const getResetFormHoverCss = ( attributes, device = '' ) => {
	const css = {
		background: getTextColorCSS( attributes?.form_background_hover_color ),
		...getBorderHoverCSS( attributes?.form_border, device ),
	};
	return css;
};

export const getResetFormLabelCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.label_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.label_typographyGlobal
		? attributes.label_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.label_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	return css;
};
export const getResetFormInputCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.input_field_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.input_field_typographyGlobal
		? attributes.input_field_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.input_field_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getDimensionCSS( attributes?.input_padding, 'padding', device ),
		...getBorderCSS( attributes?.input_border, device ),
	};
	return css;
};
export const getResetFormInputHoverCss = ( attributes, device = '' ) => {
	const css = {
		...getBorderHoverCSS( attributes?.input_border, device ),
	};

	return css;
};
export const getResetFormButtonCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.button_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.button_typographyGlobal
		? attributes.button_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.button_color ),
		background: getTextColorCSS( attributes?.button_background_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getDimensionCSS( attributes?.button_padding, 'padding', device ),
		...getBorderCSS( attributes?.button_border, device ),
	};
	return css;
};
export const getResetFormButtonHoverCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.button_hover_color ),
		background: getTextColorCSS(
			attributes?.button_background_hover_color
		),
		...getBorderHoverCSS( attributes?.button_border, device ),
	};
	return css;
};
export const getResetFormHeaderCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.form_title_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.form_title_typographyGlobal
		? attributes.form_title_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.form_title_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	return css;
};
export const getResetFormFooterCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs(
		attributes.form_footer_title_typography,
		{
			weight: '400',
		}
	);
	const typographyValueGlobal = attributes.form_footer_title_typographyGlobal
		? attributes.form_footer_title_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.form_footer_title_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	return css;
};
