import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
export const getWrapperCSS = ( attributes, device = '' ) => {
	const css = {};
	return {
		...css,
	};
};

export const getSettingStyle = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.sidebarBackground ) {
		css.background = getTextColorCSS( attributes?.sidebarBackground );
	}

	const sidebarBorderUnit = parseArgs( attributes.sidebarBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...css,
		...getBorderCSS( sidebarBorderUnit, device ),
	};
};
export const getUserSettingStyle = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.userTextColor ) {
		css.color = getTextColorCSS( attributes?.userTextColor );
	}
	if ( attributes?.sidebarUserBackground ) {
		css.background = getTextColorCSS( attributes?.sidebarUserBackground );
	}

	const userSidebarBorderUnit = parseArgs( attributes.userSidebarBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const userTypographyValue = parseArgs( attributes.userTypography, {
		weight: '400',
	} );
	const userTypographyGlobal = attributes.userTypographyGlobal
		? attributes.userTypographyGlobal
		: '';
	return {
		...css,
		...getBorderCSS( userSidebarBorderUnit, device ),
		...getTypographyCSS(
			userTypographyValue,
			device,
			userTypographyGlobal
		),
	};
};
export const getMenuListStyle = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.menuListTextColor ) {
		css.color = getTextColorCSS( attributes?.menuListTextColor );
	}
	if ( attributes?.menuListBackground ) {
		css.background = getTextColorCSS( attributes?.menuListBackground );
	}

	const menuListBorderUnit = parseArgs( attributes.menuListBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	const menuListTypographyValue = parseArgs( attributes.menuListTypography, {
		weight: '400',
	} );
	const menuListTypographyGlobal = attributes.menuListTypographyGlobal
		? attributes.menuListTypographyGlobal
		: '';
	return {
		...css,
		...getBorderCSS( menuListBorderUnit, device ),
		...getDimensionCSS( attributes?.menuListPadding, 'padding', device ),
		...getTypographyCSS(
			menuListTypographyValue,
			device,
			menuListTypographyGlobal
		),
	};
};
export const getMenuHoverListStyle = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.menuListHoverTextColor ) {
		css.color = getTextColorCSS( attributes?.menuListHoverTextColor );
	}
	if ( attributes?.menuListHoverBackground ) {
		css.background = getTextColorCSS( attributes?.menuListHoverBackground );
	}

	const menuListHoverBorderUnit = parseArgs( attributes.menuListBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...css,
		...getBorderHoverCSS( menuListHoverBorderUnit, device ),
	};
};
export const getMenuActiveListStyle = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.menuListActiveTextColor ) {
		css.color = getTextColorCSS( attributes?.menuListActiveTextColor );
	}
	if ( attributes?.menuListActiveBackground ) {
		css.background = getTextColorCSS(
			attributes?.menuListActiveBackground
		);
	}

	return {
		...css,
	};
};
export const getContentStyle = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.contentBackground ) {
		css.background = getTextColorCSS( attributes?.contentBackground );
	}

	const contentBorderUnit = parseArgs( attributes.contentBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...css,
		...getBorderCSS( contentBorderUnit, device ),
		...getDimensionCSS( attributes?.contentPadding, 'padding', device ),
	};
};
export const getContentHoverStyle = ( attributes, device = '' ) => {
	const css = {};

	const contentBorderHoverUnit = parseArgs( attributes.contentBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...getBorderHoverCSS( contentBorderHoverUnit, device ),
	};
};
export const getBreadcrumbStyle = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.breadcrumbColor ) {
		css.color = getTextColorCSS( attributes?.breadcrumbColor );
	}

	const breadcrumbtTypographyValue = parseArgs(
		attributes.breadcrumbtTypography,
		{
			weight: '400',
		}
	);
	const breadcrumbtTypographyGlobal = attributes.breadcrumbtTypographyGlobal
		? attributes.breadcrumbtTypographyGlobal
		: '';

	return {
		...css,
		...getTypographyCSS(
			breadcrumbtTypographyValue,
			device,
			breadcrumbtTypographyGlobal
		),
	};
};
export const getGapCss = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.bothGap ) {
		css.gap = `${ attributes?.bothGap }px`;
	}
	css.display = 'flex';
	if ( device === 'Tablet' ) {
		css[ 'flex-direction' ] = `column`;
	} else if ( device === 'Mobile' ) {
		css[ 'flex-direction' ] = `column`;
	} else {
		css[ 'flex-direction' ] = `row`;
	}

	return {
		...css,
	};
};
