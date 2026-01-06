import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { parseArgs } from '@Utils/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getPaddingCSS,
	getCSS as getMarginCSS,
} from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';

export const getFilterWrapCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.filterAlignment ) {
		css[ 'justify-content' ] = attributes.filterAlignment;
	}
	return {
		...css,
		...getAlignmentCSS(
			attributes?.filterAlignment,
			'justify-content',
			device
		),
		...getRangeCSS( {
			attributeValue: attributes.filterButtonGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: false,
			defaultValue: 8,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const getFilterCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.filterButtonTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.filterButtonTypographyGlobal
		? attributes.filterButtonTypographyGlobal
		: '';
	const multiItemBorderUnit = parseArgs( attributes.filterButtonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const multiItemPaddingUnit = parseArgs( attributes.filterButtonPadding, {
		unit: 'px',
	} );
	const multiItemMarginUnit = parseArgs( attributes.filterButtonMargin, {
		unit: 'px',
	} );
	const css = {
		color: getTextColorCSS( attributes?.filterButtonColor ),
		background: getTextColorCSS( attributes?.filterButtonBackground ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( multiItemBorderUnit, device ),
		...getPaddingCSS( multiItemPaddingUnit, 'padding', device ),
		...getMarginCSS( multiItemMarginUnit, 'margin', device ),
	};

	return css;
};

export const getFilterHoverCSS = ( attributes, device = '' ) => {
	const multiItemBorderHoverUnit = parseArgs( attributes.filterButtonBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	const css = {
		color: getTextColorCSS( attributes?.filterButtonColorH ),
		background: getTextColorCSS( attributes?.filterButtonBackgroundH ),
		...getBorderHoverCSS( multiItemBorderHoverUnit, device ),
	};
	if ( attributes?.filterButtonTransition ) {
		css.transition = attributes?.filterButtonTransition + 's';
	}
	return css;
};
export const searchMenuCSS = ( attributes, device = '' ) => {
	const multiItemBorderUnit = parseArgs( attributes.searchMenuBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const multiItemPaddingUnit = parseArgs( attributes?.searchMenuPadding, {
		unit: 'px',
	} );
	const multiItemMarginUnit = parseArgs( attributes?.searchMenuMargin, {
		unit: 'px',
	} );

	return {
		color: getTextColorCSS( attributes?.searchMenuColor ),
		background: getTextColorCSS( attributes?.searchMenuBackground ),
		...getBorderCSS( multiItemBorderUnit, device ),
		...getPaddingCSS( multiItemPaddingUnit, 'padding', device ),
		...getMarginCSS( multiItemMarginUnit, 'margin', device ),
	};
};
export const searchMenuHoverCSS = ( attributes, device = '' ) => {
	const multiItemBorderHoverUnit = parseArgs( attributes.searchMenuBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	const css = {
		color: getTextColorCSS( attributes?.searchMenuColorH ),
		background: getTextColorCSS( attributes?.searchMenuBackgroundH ),
		...getBorderHoverCSS( multiItemBorderHoverUnit, device ),
	};
	if ( attributes?.searchMenuTransition ) {
		css.transition = attributes?.searchMenuTransition + 's';
	}
	return css;
};
export const searchInputPlaceholderCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.searchMenuColor ) };
};
export const getFilterActiveClassCSS = ( attributes, device = '' ) => {
	const multiItemActiveBorderUnit = parseArgs( attributes.activeClassBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		color: getTextColorCSS( attributes?.activeClassColor ),
		background: getTextColorCSS( attributes?.activeClassBackground ),
		...getBorderCSS( multiItemActiveBorderUnit, device ),
	};
};
export const getFilterActiveClassHoverCSS = ( attributes, device = '' ) => {
	const multiItemActiveBorderUnit = parseArgs( attributes.activeClassBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const css = { ...getBorderHoverCSS( multiItemActiveBorderUnit, device ) };
	return css;
};
export const filterableCardsWrapCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.itemGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: false,
			defaultValue: 10,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};

	if ( attributes.gridStyle === 'grid' ) {
		css.display = 'grid';
		if ( device === 'Tablet' ) {
			css[ 'grid-template-columns' ] = `repeat(2, 1fr)`;
		} else if ( device === 'Mobile' ) {
			css[ 'grid-template-columns' ] = `repeat(1, 1fr)`;
		} else if ( attributes?.gridColumns ) {
			css[
				'grid-template-columns'
			] = `repeat(${ attributes.gridColumns }, 1fr)`;
		}
	}
	if ( attributes.gridStyle === 'masonry' ) {
		if ( device === 'Tablet' ) {
			css[ 'column-count' ] = '2';
		} else if ( device === 'Mobile' ) {
			css[ 'column-count' ] = '1';
		} else if ( attributes?.gridColumns ) {
			css[ 'column-count' ] = attributes.gridColumns;
		}
	}

	return css;
};
export const filterableItemCards = ( attributes, device = '' ) => {
	let css = {};

	if ( attributes?.cardHeight && attributes.gridStyle === 'grid' ) {
		css.height = `${ attributes.cardHeight }px`;
	}

	if ( attributes.gridStyle === 'masonry' ) {
		css[ 'break-inside' ] = 'avoid';
		css.width = '100%';
		css = {
			...css,
			...getRangeCSS( {
				attributeValue: attributes.itemGap,
				attributeObjectKey: 'value',
				isResponsive: true,
				hasUnit: false,
				defaultValue: 10,
				property: 'margin-bottom',
				unitDefaultValue: 'px',
				device,
			} ),
		};
	}

	return css;
};

// style button
export const filterableCardMoreWrapper = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.loadMoreButtonGap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: false,
			defaultValue: '',
			property: 'margin-top',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	if ( attributes?.moreButtonAlignment ) {
		css[ 'justify-content' ] = attributes?.moreButtonAlignment;
	}
	return css;
};
export const filterableLoadMoreButton = ( attributes, device = '' ) => {
	const buttonPaddingUnit = parseArgs( attributes?.moreButtonPadding, {
		unit: 'px',
	} );
	const buttonBorderUnit = parseArgs( attributes.moreButtonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const typographyValue = parseArgs( attributes.moreButtonTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.moreButtonTypographyGlobal
		? attributes.moreButtonTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.loadMoreButtonTextColor ),
		background: getTextColorCSS( attributes?.loadMoreButtonBackground ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getBoxShadowCSS( attributes?.moreButtonboxShadow, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const filterableLoadMoreButtonHover = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes.loadMoreButtonTransition ) {
		css[
			'transition-duration'
		] = `${ attributes.loadMoreButtonTransition }s`;
	}
	const buttonBorderHoverUnit = parseArgs( attributes.moreButtonBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		color: getTextColorCSS( attributes?.loadMoreButtonTextColorH ),
		background: getTextColorCSS( attributes?.loadMoreButtonBackgroundH ),
		...css,
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
		...getBoxShadowHoverCSS( attributes?.moreButtonboxShadow, device ),
	};
};
