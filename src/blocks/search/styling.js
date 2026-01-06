import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};

export const getSearchBarCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes.gap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'gap',
			hasUnit: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
		...getAlignmentCSS(
			attributes?.fullscreenButtonAlignment,
			'justify-content',
			device
		),
		...getBorderCSS(
			parseArgs( attributes?.searchBoxBorder, {
				unitWidth: 'px',
				unitRadius: 'px',
			} ),
			device
		),
	};
};
export const getSearchBarCSSHover = ( attributes, device = '' ) => {
	return {
		...getBorderHoverCSS(
			parseArgs( attributes?.searchBoxBorder, {
				unitWidthH: 'px',
				unitRadiusH: 'px',
			} ),
			device
		),
	};
};

export const getSearchResultList = ( attributes, device = '' ) => {
	const css = {};
	css.overflow = 'auto';
	// Set the position property
	if ( attributes?.position ) {
		css.position = attributes.position;
	}
	const OffsetLeft = {
		...getRangeCSS( {
			attributeValue: attributes.horizontalOffset,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'left',
			defaultValue: 230,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	const OffsetRight = {
		...getRangeCSS( {
			attributeValue: attributes.horizontalOffset,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'right',
			defaultValue: 230,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	const OffsetBottom = {
		...getRangeCSS( {
			attributeValue: attributes.verticalOffset,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'bottom',
			defaultValue: 230,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	const OffsetTop = {
		...getRangeCSS( {
			attributeValue: attributes.verticalOffset,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'top',
			defaultValue: 230,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};

	// Ensure offsets only apply when the position is not "default"
	if ( attributes?.position === 'default' ) {
		delete OffsetLeft.left;
		delete OffsetLeft.right;
		delete OffsetTop.top;
		delete OffsetBottom.bottom;
	}
	const listBorderUnit = parseArgs( attributes?.listBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const listPaddingUnit = parseArgs( attributes?.listPadding, {
		unit: 'px',
	} );
	return {
		...getRangeCSS( {
			attributeValue: attributes.listWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: '',
			hasUnit: true,
			unitDefaultValue: '%',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.listGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'gap',
			defaultValue: 0,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.searchItemHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'height',
			defaultValue: 300,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
		...OffsetLeft,
		...OffsetRight,
		...OffsetBottom,
		...OffsetTop,
		...css,
		...getDimensionCSS( listPaddingUnit, 'padding', device ),
		...getBorderCSS( listBorderUnit, device ),
	};
};

export const getsearchResultHoverCSS = ( attributes, device = '' ) => {
	const listBorderHoverUnit = parseArgs( attributes?.listBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( listBorderHoverUnit, device ),
	};
};

// List Item CSS generator  Start

export const getSearchResultItem = ( attributes, device = '' ) => {
	const itemBorderUnit = parseArgs( attributes?.itemBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const itemPaddingUnit = parseArgs( attributes?.itemPadding, {
		unit: 'px',
	} );
	return {
		...getRangeCSS( {
			attributeValue: attributes.itemWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: '',
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),

		...getRangeCSS( {
			attributeValue: attributes.itemGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'gap',
			defaultValue: '',
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
		...getDimensionCSS( itemPaddingUnit, 'padding', device ),
		...getBorderCSS( itemBorderUnit, device ),
	};
};

export const getsearchResultItemHoverCSS = ( attributes, device = '' ) => {
	const itemBorderHoverUnit = parseArgs( attributes?.itemBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( itemBorderHoverUnit, device ),
	};
};

export const getSearchResultTitle = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.searchResTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.searchResTypographyGlobal
		? attributes.searchResTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.searchResTColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getSearchResultImage = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes.thumbnailWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: '',
			hasUnit: true,
			unitDefaultValue: '%',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.thumbnailHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'height',
			defaultValue: '',
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};
// List Item CSS generator End

export const getInputCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.inputTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.inputTypographyGlobal
		? attributes.inputTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.inputTextColor ),
		background: getTextColorCSS( attributes?.inputBgColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.inputTextStroke, device ),
		...getTextShadowCSS( attributes?.inputTextShadow ),
	};
};
export const getLoadingSpinnerCss = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.loadingSpinnerColor ) };
};

export const getButtonBgCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.buttonBgColor ),
	};
};
export const getButtonBgHoverCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.buttonBgColorH ),
	};
};

export const getButtonCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.buttonTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.buttonTypographyGlobal
		? attributes.buttonTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.buttonTextColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.buttonTextStroke, device ),
		...getTextShadowCSS( attributes?.buttonTextShadow ),
		...getRangeCSS( {
			attributeValue: attributes.searchBtnWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			hasUnit: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const getButtonHoverCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.buttonTypographyH, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.buttonTypographyHGlobal
		? attributes.buttonTypographyHGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.buttonTextColorH ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getTextStrokeCSS( attributes?.buttonTextStrokeH, device ),
		...getTextShadowCSS( attributes?.buttonTextShadowH ),
	};
};

export const getIconCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.iconWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'width',
			defaultValue: 18,
			hasUnit: true,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};
