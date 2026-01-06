import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';

export const getItemCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.itemSpace,
			attributeObjectKey: 'value',
			isResponsive: false,
			defaultValue: 10,
			property: 'margin-bottom',
			hasUnit: false,
			unitDefaultValue: 'px',
			device,
		} ),
	};

	const itemBorderUnit = parseArgs( attributes.itemBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...css,
		...getBorderCSS( itemBorderUnit, device ),
	};
};
export const getItemHoverCSS = ( attributes, device = '' ) => {
	const itemBorderHoverUnit = parseArgs( attributes.itemBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( itemBorderHoverUnit, device ),
	};
};
export const getTitleCSS = ( attributes, device = '' ) => {
	const typographyValueGlobal = attributes.headerTypographyGlobal
		? attributes.headerTypographyGlobal
		: '';
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.iconSpace,
			attributeObjectKey: 'value',
			isResponsive: false,
			defaultValue: 10,
			property: 'margin-left',
			device,
		} ),
	};
	const typographyValue = parseArgs( attributes.headerTypography, {
		weight: '400',
	} );
	return {
		color: getTextColorCSS( attributes?.headerTextColor ),
		...css,
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.headerTextStroke, device ),
		...getTextShadowCSS( attributes?.headerTextShadow ),
	};
};
export const getTitleHoverCSS = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.headerTextColorH ),
	};
};
export const getTitleActiveCSS = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.headerTextActiveColor ),
	};
};
export const getPanelCSS = ( attributes, device = '' ) => {
	const headerPaddingUnit = parseArgs( attributes.headerPadding, {
		unit: 'px',
	} );
	const headerBorderUnit = parseArgs( attributes.headerBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.headerBackgroundColor ),
		...getBorderCSS( headerBorderUnit, device ),
		...getPaddingCSS( headerPaddingUnit, 'padding', device ),
	};
};
export const getPanelHoverCSS = ( attributes, device = '' ) => {
	const headerBorderHoverUnit = parseArgs( attributes.headerBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.headerBackgroundColorH ),
		...getBorderHoverCSS( headerBorderHoverUnit, device ),
	};
};
export const getPanelActiveCSS = ( attributes ) => {
	return {
		background: getTextColorCSS( attributes?.headerBackgroundActiveColor ),
	};
};
export const getIconCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.iconSize,
			attributeObjectKey: 'value',
			isResponsive: false,
			defaultValue: 30,
			property: 'font-size',
			device,
		} ),
	};
	return {
		fill: getTextColorCSS( attributes?.iconColor ),
		...css,
	};
};
export const getIconHoverCSS = ( attributes ) => {
	return {
		fill: getTextColorCSS( attributes?.iconColorH ),
	};
};
export const getIconActiveCSS = ( attributes ) => {
	return {
		fill: getTextColorCSS( attributes?.iconActiveColor ),
	};
};
export const getContentCSS = ( attributes, device = '' ) => {
	const bodyPaddingUnit = parseArgs( attributes.bodyPadding, {
		unit: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.bodyBackground ),
		...getPaddingCSS( bodyPaddingUnit, 'padding', device ),
	};
};
export const getContentHoverCSS = ( attributes ) => {
	return {
		background: getTextColorCSS( attributes?.bodyBackgroundH ),
	};
};
