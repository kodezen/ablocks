import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getStartButtonCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.start_btn_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.start_btn_typographyGlobal
		? attributes.start_btn_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.start_btn_color ),
		background: getTextColorCSS( attributes?.start_btn_bg_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getDimensionCSS( attributes?.start_btn_padding, 'padding', device ),
		...getBorderCSS( attributes?.start_btn_border, device ),
	};
	return css;
};
export const getStartButtonHoverCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.start_btn_color_hover ),
		background: getTextColorCSS( attributes?.start_btn_bg_hover_color ),
		...getBorderHoverCSS( attributes?.start_btn_border, device ),
	};
	return css;
};

export const getEnrollButtonCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.enroll_btn_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.enroll_btn_typographyGlobal
		? attributes.enroll_btn_typographyGlobal
		: '';
	const css = {
		color: getTextColorCSS( attributes?.enroll_btn_color ),
		background: getTextColorCSS( attributes?.enroll_btn_bg_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getDimensionCSS( attributes?.enroll_btn_padding, 'padding', device ),
		...getBorderCSS( attributes?.enroll_btn_border, device ),
	};
	return css;
};
export const getEnrollButtonHoverCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.enroll_btn_color_hover ),
		background: getTextColorCSS( attributes?.enroll_btn_bg_hover_color ),
		...getBorderHoverCSS( attributes?.enroll_btn_border, device ),
	};
	return css;
};

export const getMassageTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs(
		attributes?.massage_title_typography ?? '',
		{
			weight: '400',
		}
	);
	const typographyValueGlobal = attributes.massage_title_typographyGlobal
		? attributes.massage_title_typographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.massage_title_color ),
		background: getTextColorCSS( attributes?.massage_title_bg ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getModalCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.modalWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 150,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
	};
};

export const getModalListCSS = ( attributes, device = '' ) => {
	const css = {};
	css[ 'text-decoration' ] = 'none';

	const typographyValue = parseArgs( attributes?.list_typography, '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.list_typographyGlobal
		? attributes.list_typographyGlobal
		: '';

	return {
		...css,
		color: getTextColorCSS( attributes?.list_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getModalListHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.list_hover_color ) };
};
export const getPriceCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.price_typography, '', {
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

export const getPriceTitleHoverCSS = ( attributes, device = '' ) => {
	const css = {};
	css.color = attributes?.price_title_hover_color ?? '';

	return css;
};

export const getPriceTitleCSS = ( attributes, device = '' ) => {
	const css = {};
	css.color = attributes?.price_title_color ?? '';

	const typographyValue = parseArgs( attributes?.price_title_typography, '', {
		weight: '400',
	} );

	return {
		...css,
		...getTypographyCSS( typographyValue, device ),
	};
};

export const getEnrollInfoCSS = ( attributes, device = '' ) => {
	const css = {};
	css.color = attributes?.info_color ?? '#7b68ee';
	css.background = attributes?.info_bg ?? '#eae8fa';

	const typographyValue = parseArgs( attributes?.info_typography, '', {
		weight: '400',
	} );

	return {
		...css,
		...getTypographyCSS( typographyValue, device ),
	};
};

export const getEnrollInfoHoverCSS = ( attributes, device = '' ) => {
	const css = {};
	css.background = attributes?.info_bg_hover ?? '#eae8fa';
	css.color = attributes?.info_color_hover ?? '#7b68ee';

	return {
		...css,
		...getRangeCSS( {
			attributeValue: attributes?.bgTransition,
			attributeObjectKey: 'value',
			isResponsive: false,
			hasUnit: false,
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
};
