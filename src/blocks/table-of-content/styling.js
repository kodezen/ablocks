import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getTocTitleCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.titleTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.titleTypographyGlobal
		? attributes.titleTypographyGlobal
		: {};
	const css = {
		color: getTextColorCSS( attributes?.titleColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	return css;
};
export const getTocHeaderCss = ( attributes, device = '' ) => {
	const css = {
		background: getTextColorCSS( attributes?.headerBG ),
		...getBorderCSS( attributes?.headerBorder, device ),
		...getDimensionCSS( attributes?.header_padding, 'padding', device ),
	};
	return css;
};
export const getTocHeaderHoverCss = ( attributes, device = '' ) => {
	const css = {
		...getBorderHoverCSS( attributes?.headerBorder, device ),
	};
	return css;
};

export const getTocItemGapCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.contentTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.contentTypographyGlobal
		? attributes.contentTypographyGlobal
		: {};
	const css = {
		color: getTextColorCSS( attributes?.itemColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getRangeCSS( {
			attributeValue: attributes.listItemGap,
			isResponsive: false,
			property: 'line-height',
			defaultValue: 30,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};

	return css;
};

export const getTocItemCss = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.contentTypography, {
		weight: '400',
	} );
	const css = {
		color: getTextColorCSS( attributes?.itemColor ),
		...getTypographyCSS( typographyValue, device ),
	};
	if ( attributes?.itemColor ) {
		css.color = attributes?.itemColor;
	}

	return css;
};

export const getActiveTocItemCss = ( attributes, device = '' ) => {
	const css = {
		color: getTextColorCSS( attributes?.itemColor ),
	};
	if ( attributes?.activeColor ) {
		css.color = attributes?.activeColor;
	}

	return css;
};

export const getHeaderIconCss = ( attributes, device ) => {
	const css = {
		fill: getTextColorCSS( attributes?.iconColor ),
		...getRangeCSS( {
			attributeValue: attributes.iconSize,
			attributeObjectKey: 'value',
			isResponsive: false,
			property: 'font-size',
			defaultValue: 20,
			unitDefaultValue: 'px',
			device,
		} ),
	};

	return {
		...css,
		...getBorderCSS( attributes?.iconBorder, device ),
		...getBoxShadowCSS( attributes?.iconBoxShadow, device ),
		...getDimensionCSS( attributes?.icon_padding, 'padding', device ),
	};
};

export const getHeaderIconHoverCss = ( attributes, device = '' ) => {
	const css = {
		...getBorderHoverCSS( attributes?.iconBorder, device ),
		...getBoxShadowHoverCSS( attributes?.iconBoxShadow, device ),
	};

	return css;
};

export const getTocBodyCss = ( attributes, device = '' ) => {
	const css = {
		background: getTextColorCSS( attributes?.bodyBG ),
		...getDimensionCSS( attributes?.list_padding, 'padding', device ),
	};

	return css;
};

export const getMarkerListStyleCSS = ( attributes ) => {
	const css = {};
	const allowedListTypes = [
		'decimal',
		'disc',
		'circle',
		'square',
		'lower-alpha',
		'lower-roman',
		'none',
	];
	if ( allowedListTypes.includes( attributes?.markerView ) ) {
		css[ 'list-style-type' ] = attributes.markerView;
	}
	return css;
};
