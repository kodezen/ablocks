import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getRowCSS = ( attributes ) => {
	const { rowColor } = attributes;
	const rowCSS = {};
	if ( rowColor ) {
		rowCSS.background = `${ getTextColorCSS( rowColor ) } !important`;
	}

	return rowCSS;
};
export const getRowCSSHover = ( attributes ) => {
	const { rowColorH } = attributes;
	const rowCSS = {};

	if ( rowColorH ) {
		rowCSS.background = `${ getTextColorCSS( rowColorH ) } !important`;
	}

	return rowCSS;
};
