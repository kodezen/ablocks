import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { parseArgs } from '@Utils/helper';
export const getShareCSS = ( attributes, device = '' ) => {
	const { horizontalAlignment } = attributes;
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.spaceBetween,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 20,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
	};
	const stack = attributes[ `stack${ device }` ] || attributes?.stack;
	const verticalAlignment =
		attributes[ `verticalAlignment${ device }` ] ||
		attributes?.verticalAlignment;
	// Handle stack behavior
	if ( stack === 'vertical' ) {
		css[ 'flex-direction' ] = 'column';
		if ( verticalAlignment ) {
			css[ 'align-items' ] = verticalAlignment;
		}
	} else if ( stack === 'horizontal' ) {
		css[ 'flex-direction' ] = 'row';
		if ( horizontalAlignment ) {
			css[ 'justify-content' ] = horizontalAlignment;
		}
	}

	return {
		...css,
		...getAlignmentCSS(
			attributes?.horizontalAlignment,
			'justify-content',
			device
		),
	};
};

export const getSharesBarCSS = ( attributes, device = '' ) => {
	const css = {
		background: getTextColorCSS( attributes?.buttonBackground ),
		...getRangeCSS( {
			attributeValue: attributes.shareSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 46,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.shareSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 46,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	return {
		...getBorderCSS( attributes?.border, device ),
		...css,
	};
};
export const getSocialHoverCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.buttonHover ),
		...getBorderHoverCSS( attributes?.border, device ),
	};
};
// itemBorder
export const getItemBorderCSS = ( attributes, device = '' ) => {
	return {
		...getBorderCSS( attributes?.itemBorder, device ),
		...getBoxShadowCSS( attributes?.shareItemShadow ),
	};
};
export const getItemBorderHoverCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.backgroundH ),
		...getBorderHoverCSS( attributes?.itemBorder, device ),
		...getBoxShadowHoverCSS( attributes?.shareItemShadow ),
	};
};

export const getShareIconCSS = ( attributes, device = '' ) => {
	const { shareButtonIconColor } = attributes;

	const css = {
		...getRangeCSS( {
			attributeValue: attributes.shareIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 16,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.shareIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 16,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};

	if ( shareButtonIconColor ) {
		css.fill = `${ getTextColorCSS( shareButtonIconColor ) } !important`;
	}

	return {
		...css,
	};
};
export const getShareIconHoverCSS = ( attributes ) => {
	const css = {};
	if ( attributes?.shareButtonIconColorH ) {
		css.fill = `${ getTextColorCSS(
			attributes?.shareButtonIconColorH
		) } !important`;
	}
	return css;
};
export const shareItemIconSVG = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.shareItemIconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 43,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	return css;
};
export const getShareItemIconCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.itemIconWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 43,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.itemIconHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 42,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	return {
		...css,
	};
};
export const getItemTextCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.itemTextWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 80,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.itemTextHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 42,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	return {
		...css,
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.textStroke, device ),
		...getTextShadowCSS( attributes?.textShadow ),
	};
};
