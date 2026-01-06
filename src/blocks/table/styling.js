import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getTableCSS = ( attributes ) => {
	const { borderCollapse } = attributes;
	const css = [];
	if ( borderCollapse === 'collapse' ) {
		css[ 'border-collapse' ] = 'collapse';
	} else if ( borderCollapse === 'separate' ) {
		css[ 'border-collapse' ] = 'separate';
	}
	return css;
};

export const getTableBorder = ( attributes, device = '' ) => {
	const tableBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		...getBorderCSS( tableBorderUnit, device ),
	};
};
export const getTableBorderHover = ( attributes, device = '' ) => {
	const tableBorderHoverUnit = parseArgs( attributes.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( tableBorderHoverUnit, device ),
	};
};

export const getRowOddCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.rowOddColor ) };
};
export const getRowOddHoverCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.rowOddColorH ) };
};
export const getRowEvenCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.rowEvenColor ) };
};
export const getRowEvenHoverCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.rowEvenColorH ) };
};

// ---table header ---
export const getHeaderCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.headerColor ) };
};
export const getHeaderHoverCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.headerColorH ) };
};

// ---table body---
export const getBodyCSS = ( attributes ) => {
	const { bodyBg } = attributes;
	const css = {};
	if ( bodyBg ) {
		css.background = `${ getTextColorCSS( bodyBg ) } !important`;
	}
	return css;
};
export const getBodyHoverCSS = ( attributes ) => {
	const { bodyBgH } = attributes;
	const css = {};
	if ( bodyBgH ) {
		css.background = `${ getTextColorCSS( bodyBgH ) } !important`;
	}
	return css;
};
// ---table footer--
export const getFooterCSS = ( attributes ) => {
	const { footerColor } = attributes;
	const css = {};
	if ( footerColor ) {
		css.background = `${ getTextColorCSS( footerColor ) } !important`;
	}
	return css;
};
export const getFooterHoverCSS = ( attributes ) => {
	const { footerColorH } = attributes;
	const css = {};
	if ( footerColorH ) {
		css.background = `${ getTextColorCSS( footerColorH ) } !important`;
	}
	return css;
};
