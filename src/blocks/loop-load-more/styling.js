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
export const LoopLoadMoreWrapper = ( attributes, device = '' ) => {
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
export const LoopLoadMoreButton = ( attributes, device = '' ) => {
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
	const typographyGlobal = attributes.moreButtonTypographyGlobal
		? attributes.moreButtonTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.loadMoreButtonTextColor ),
		background: getTextColorCSS( attributes?.loadMoreButtonBackground ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getBoxShadowCSS( attributes?.moreButtonboxShadow, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
	};
};
export const LoopLoadMoreButtonHover = ( attributes, device = '' ) => {
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
