import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import {
	getCSS as getPaddingCSS,
	getCSS as getMarginCSS,
} from '@Controls/dimensions/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	const wapperBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const wrapperPaddingUnit = parseArgs( attributes.padding, {
		unit: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.background ),
		...getRangeCSS( {
			attributeValue: attributes.width,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),

		...getPaddingCSS( wrapperPaddingUnit, 'padding', device ),
		...getBoxShadowCSS( attributes?.boxShadow, 'box-shadow', device ),
		...getBorderCSS( wapperBorderUnit, device ),
	};
};

export const getWrapperHoverCSS = ( attributes, device = '' ) => {
	const subMenuBorderHoverUnit = parseArgs( attributes?.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	const wrapperHoverCSS = {
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
		...getBorderHoverCSS( subMenuBorderHoverUnit, device ),
	};

	return wrapperHoverCSS;
};

export const getMenuitemCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.menuItemTypography, {
		weight: '400',
	} );
	const typographyglobal = attributes.menuItemTypographyGlobal
		? attributes.menuItemTypographyGlobal
		: '';
	const menuItemBorderUnit = parseArgs( attributes.menuItemBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const menuItemPaddingUnit = parseArgs( attributes.menuItemPadding, {
		unit: 'px',
	} );
	const menuItemMarginUnit = parseArgs( attributes.menuItemMargin, {
		unit: 'px',
	} );
	const menuItemCSS = {
		color: getTextColorCSS( attributes?.menuItemTextColor ),
		background: getTextColorCSS( attributes?.menuItemBackground ),
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
		...getBorderCSS( menuItemBorderUnit, device ),
		...getTypographyCSS( typographyValue, device, typographyglobal ),
		...getPaddingCSS( menuItemPaddingUnit, 'padding', device ),
		...getMarginCSS( menuItemMarginUnit, 'margin', device ),
	};

	if ( attributes.menuItemJustification[ 'value' + device ] ) {
		menuItemCSS[ 'justify-content' ] =
			attributes.menuItemJustification[ 'value' + device ];
	}
	if ( attributes?.menuItemTransition ) {
		menuItemCSS[ 'transition-duration' ] =
			attributes?.menuItemTransition + 's';
	}
	return menuItemCSS;
};

export const getMenuItemHoverCSS = ( attributes, device = '' ) => {
	const menuItemBorderHoverUnit = parseArgs( attributes.menuItemBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		color: getTextColorCSS( attributes?.menuItemTextColorH ),
		background: getTextColorCSS( attributes?.menuItemBackgroundH ),
		...getBorderHoverCSS( menuItemBorderHoverUnit, device ),
	};
};

export const getMenuItemLinkCSS = ( attributes ) => {
	const menuItemLinkCSS = {};
	if ( attributes?.menuItemTextColor ) {
		menuItemLinkCSS.color = `${ getTextColorCSS(
			attributes?.menuItemTextColor
		) } !important`;
	}

	return menuItemLinkCSS;
};

export const getMenuItemLinkHoverCSS = ( attributes ) => {
	return {
		color: `${ getTextColorCSS(
			attributes?.menuItemTextColorH
		) } !important`,
	};
};

export const getMenuItemDropdownIconCSS = ( attributes ) => {
	return { fill: getTextColorCSS( attributes?.menuItemTextColor ) };
};

export const getMenuItemDropdownIconHoverCSS = ( attributes ) => {
	return { fill: getTextColorCSS( attributes?.menuItemTextColorH ) };
};
