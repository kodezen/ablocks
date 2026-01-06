import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { parseArgs } from '@Utils/helper';
import {
	getCSS as getPaddingCSS,
	getCSS as getMarginCSS,
} from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
export const getMenuCSS = ( attributes, device = '' ) => {
	const menuPaddingUnit = parseArgs( attributes.padding, {
		unit: 'px',
	} );
	const mainMenuCSS = {
		...getPaddingCSS( menuPaddingUnit, 'padding', device ),
		...getBoxShadowCSS( attributes?.boxShadow, 'box-shadow', device ),
	};

	if ( attributes?.alignment ) {
		mainMenuCSS[ 'justify-content' ] = attributes?.alignment;
	}
	return mainMenuCSS;
};
export const getSubMenuCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.menuItemBorder?.commonWidth ) {
		css[ 'margin-top' ] = `${ attributes?.menuItemBorder?.commonWidth }px`;
	}
	if ( attributes?.menuItemBorder?.bottomWidth ) {
		css[ 'margin-top' ] = `${ attributes?.menuItemBorder?.bottomWidth }px`;
	}

	const subMenuWrapperBorderUnit = parseArgs( attributes.subMenuBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const subMenuWrapperPaddingUnit = parseArgs( attributes.subMenuPadding, {
		unit: 'px',
	} );
	return {
		...css,
		...getRangeCSS( {
			attributeValue: attributes?.subMenuWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 250,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getPaddingCSS( subMenuWrapperPaddingUnit, 'padding', device ),
		...getBoxShadowCSS(
			attributes?.subMenuBoxShadow,
			'box-shadow',
			device
		),
		...getBorderCSS( subMenuWrapperBorderUnit, device ),
	};
};
export const getSubMenuHoverCSS = ( attributes, device = '' ) => {
	const subMenuBorderHoverUnit = parseArgs( attributes?.subMenuBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	const css = {
		...getBorderHoverCSS( subMenuBorderHoverUnit, device ),
		...getBoxShadowHoverCSS( attributes?.subMenuBoxShadow, device ),
	};
	return css;
};

export const getMainMenuHoverCSS = ( attributes, device = '' ) => {
	const mainMenuHoverCSS = {
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
	};

	return mainMenuHoverCSS;
};
export const getSubMenuResponsiveCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.subMenuItemTransition ) {
		css[ 'transition-duration' ] = attributes?.subMenuItemTransition + 's';
	}
	if (
		( device === 'Mobile' ||
			( attributes?.sideBarMenuDevice === 'tablet' &&
				device === 'Tablet' ) ) &&
		attributes?.subMenuResponsiveBg
	) {
		css.background = `${ getTextColorCSS(
			attributes?.subMenuResponsiveBg
		) } !important`;
	}
	return {
		background: getTextColorCSS( attributes?.subMenuItemBackground ),
		...css,
	};
};
export const getSubMenuResponsiveHoverCSS = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.subMenuItemTextColorH ),
		background: getTextColorCSS( attributes?.subMenuItemBackgroundH ),
	};
};
export const getSubMenuResponsiveTextCSS = ( attributes, device = '' ) => {
	const css = {};
	if (
		( device === 'Mobile' ||
			( attributes?.sideBarMenuDevice === 'tablet' &&
				device === 'Tablet' ) ) &&
		attributes?.subMenuResponsiveColor
	) {
		css.color = `${ getTextColorCSS(
			attributes?.subMenuResponsiveColor
		) } !important`;
	}
	return {
		color: getTextColorCSS( attributes?.subMenuItemTextColor ),
		...css,
	};
};

export const getMenuitemCSS = ( attributes, device = '' ) => {
	const multiItemPaddingUnit = parseArgs( attributes.menuItemPadding, {
		unit: 'px',
	} );
	const multiItemMarginUnit = parseArgs( attributes.menuItemMargin, {
		unit: 'px',
	} );
	const multiItemBorderUnit = parseArgs( attributes.menuItemBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const typographyValue = parseArgs( attributes.menuItemTypography, {
		weight: '400',
	} );
	const typographyglobal = attributes.menuItemTypographyGlobal
		? attributes.menuItemTypographyGlobal
		: '';
	const menuItemCSS = {
		...getBorderCSS( multiItemBorderUnit, device ),
		...getTypographyCSS( typographyValue, device, typographyglobal ),
		...getPaddingCSS( multiItemPaddingUnit, 'padding', device ),
		...getMarginCSS( multiItemMarginUnit, 'margin', device ),
	};
	if ( attributes[ 'menuItemDirection' + device ] ) {
		menuItemCSS[ 'flex-direction' ] =
			attributes[ 'menuItemDirection' + device ];
	}
	if ( attributes[ 'menuItemJustify' + device ] ) {
		menuItemCSS[ 'justify-content' ] =
			attributes[ 'menuItemJustify' + device ];
	}
	if ( attributes[ 'menuItemAlign' + device ] ) {
		menuItemCSS[ 'align-items' ] = attributes[ 'menuItemAlign' + device ];
	}
	if ( attributes?.menuItemTransition ) {
		menuItemCSS.transition = attributes?.menuItemTransition + 's';
	}
	if (
		( device === 'Mobile' ||
			( attributes?.sideBarMenuDevice === 'tablet' &&
				device === 'Tablet' ) ) &&
		attributes?.menuResponsiveBackground
	) {
		menuItemCSS.background = getTextColorCSS(
			attributes?.menuResponsiveBackground
		);
	}
	return {
		background: getTextColorCSS( attributes?.menuItemBackground ),
		color: getTextColorCSS( attributes?.menuItemTextColor ),
		...menuItemCSS,
	};
};

export const getMenuItemHoverCSS = ( attributes, device = '' ) => {
	const multiItemBorderHoverUnit = parseArgs( attributes.menuItemBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	const menuItemHoverCSS = {
		...getBorderHoverCSS( multiItemBorderHoverUnit, device ),
	};
	if ( attributes?.menuItemTextColorH ) {
		menuItemHoverCSS.color = getTextColorCSS(
			attributes?.menuItemTextColorH
		);
	}
	if ( attributes?.menuItemBackgroundH ) {
		menuItemHoverCSS.background = getTextColorCSS(
			attributes?.menuItemBackgroundH
		);
	}
	return menuItemHoverCSS;
};

export const getMenuItemLinkCSS = ( attributes, device = '' ) => {
	const menuItemLinkCSS = {};
	if ( attributes?.menuItemTextColor ) {
		menuItemLinkCSS.color = getTextColorCSS(
			attributes?.menuItemTextColor
		);
	}
	if (
		( device === 'Mobile' ||
			( attributes?.sideBarMenuDevice === 'tablet' &&
				device === 'Tablet' ) ) &&
		attributes?.menuResponsiveTextColor
	) {
		menuItemLinkCSS.color = `${ getTextColorCSS(
			attributes?.menuResponsiveTextColor
		) } !important`;
	}

	return menuItemLinkCSS;
};

export const getMenuItemLinkHoverCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.menuItemTextColorH ) };
};
export const getSubMenuStyleTextHoverCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.subMenuItemTextColorH ) };
};

export const getMenuItemDropdownIconCSS = ( attributes, device = '' ) => {
	const menuItemDropdownIconCSS = {};
	if ( attributes?.menuItemTextColor ) {
		menuItemDropdownIconCSS.fill = getTextColorCSS(
			attributes?.menuItemTextColor
		);
	}
	if (
		( device === 'Mobile' ||
			( attributes?.sideBarMenuDevice === 'tablet' &&
				device === 'Tablet' ) ) &&
		attributes?.menuResponsiveTextColor
	) {
		menuItemDropdownIconCSS.fill = `${ getTextColorCSS(
			attributes?.menuResponsiveTextColor
		) } !important`;
	}

	return menuItemDropdownIconCSS;
};

export const getMenuItemDropdownIconHoverCSS = ( attributes ) => {
	const menuItemDropdownIconHoverCSS = {};
	if ( attributes?.menuItemTextColor ) {
		menuItemDropdownIconHoverCSS.fill = getTextColorCSS(
			attributes?.menuItemTextColorH
		);
	}

	return menuItemDropdownIconHoverCSS;
};

export const getHamburgerWrapperCSS = ( attributes ) => {
	const hamburgerMenuCSS = {};

	if ( attributes?.hamburgerAlignment ) {
		hamburgerMenuCSS[ 'justify-content' ] = attributes?.hamburgerAlignment;
	}

	return hamburgerMenuCSS;
};

export const getHamburgerCSS = ( attributes, device = '' ) => {
	const heightHuber = 30 + attributes?.hamburgerHeight.value;
	const humburgePaddingUnit = parseArgs( attributes.hamburgerPadding, {
		unit: 'px',
	} );
	const humburgeBorderUnit = parseArgs( attributes.hamburgerBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const hamburgerCSS = {
		...getPaddingCSS( humburgePaddingUnit, 'padding', device ),
		...getBorderCSS( humburgeBorderUnit, device ),
	};
	if ( heightHuber ) {
		hamburgerCSS.height = `${ heightHuber }px`;
	}
	return {
		background: getTextColorCSS( attributes?.hamburgerBackground ),
		...hamburgerCSS,
	};
};

export const getHamburgerHoverCSS = ( attributes, device = '' ) => {
	const hamburgerBorderHoverUnit = parseArgs( attributes.hamburgerBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	const hamburgerCSS = {
		...getBorderHoverCSS( hamburgerBorderHoverUnit, device ),
	};

	return hamburgerCSS;
};

export const getHamburgerItemCSS = ( attributes, device = '' ) => {
	const hamburgerItemCSS = {
		...getRangeCSS( {
			attributeValue: attributes.hamburgerWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 30,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.hamburgerHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 3,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	return {
		background: getTextColorCSS( attributes?.hamburgerColor ),
		...hamburgerItemCSS,
	};
};

export const subMenuCSS = () => {
	const css = {};
	css[ 'margin-top' ] = '0px !important';
	css.display = 'none';
	return css;
};

export const getMegaMenuCSS = ( attributes, device = '' ) => {
	const css = {};
	css[ 'margin-top' ] = '0px !important';

	if ( attributes?.sideBarMenuDevice === 'tablet' && device === 'Tablet' ) {
		css.position = 'static !important';
	}

	return css;
};
