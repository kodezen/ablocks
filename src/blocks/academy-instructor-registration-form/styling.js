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

export const getFormButtonCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.form_button_typhography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.form_button_typhographyGlobal
		? attributes.form_button_typhographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.form_button_color ),
		background: getTextColorCSS( attributes?.form_button_background ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( attributes?.form_button_border, device ),
	};
	return css;
};

export const getFormButtonHoverCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.form_button_hover_color ),
		background: getTextColorCSS( attributes?.form_button_hover_background ),
		...getBorderHoverCSS( attributes?.form_button_border, device ),
	};
	return css;
};

export const getInputFieldPlaceholderCss = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.input_field_placeholder_color ),
	};
};

export const getInputFieldCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.input_field_color ),
		background: getTextColorCSS( attributes?.input_field_bg_color ),
		...getBorderCSS( attributes?.form_field_border, device ),
	};
	return css;
};
export const getInputFieldHoverCss = ( attributes, device = '' ) => {
	const css = {
		...getBorderHoverCSS( attributes?.form_field_border, device ),
	};

	return css;
};

export const getFormCss = ( attributes, device = '' ) => {
	const css = {
		...getBackgroundCSS(
			attributes?.form_background,
			'background',
			device
		),
		...getDimensionCSS( attributes?.form_padding, 'padding', device ),
		...getBorderCSS( attributes?.form_border, device ),
	};

	return css;
};
export const getFormHoverCss = ( attributes, device = '' ) => {
	const css = {
		...getBackgroundHoverCSS(
			attributes?.form_background,
			'background',
			device
		),
		...getBorderHoverCSS( attributes?.form_border, device ),
	};

	return css;
};

export const getInputLabelCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.input_label_typhography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.input_label_typhographyGlobal
		? attributes.input_label_typhographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.input_label_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
