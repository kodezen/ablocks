import { getCSS as getDimensionCSS } from '@Controls/dimensions/helper';

export const getCertificateBGImage = ( attributes ) => {
	const css = {};
	if ( attributes?.backgroundImage ) {
		css[ 'background-image' ] = `url(${ attributes?.backgroundImage })`;
	}
	if ( attributes?.pageOrientation === 'P' ) {
		css[ 'background-size' ] = `inherit !important`;
		css[ 'background-repeat' ] = 'repeat !important';
		css[ 'background-position' ] = 'center !important';
		if ( attributes?.pageSize === 'A4' ) {
			css[ 'max-width' ] = `794px !important`;
			css.height = `1123px !important`;
		} else {
			css[ 'max-width' ] = `816px !important`;
			css.height = `1056px !important`;
		}
	} else if ( attributes?.pageSize === 'A4' ) {
		css.height = `794px !important`;
		css[ 'max-width' ] = `1123px !important`;
	} else {
		css.height = `816px !important`;
		css[ 'max-width' ] = `1056px !important`;
		css[ 'background-repeat' ] = 'round !important';
	}
	return css;
};
export const getWrapperSzie = ( attributes ) => {
	const css = {};
	if ( attributes?.pageOrientation === 'P' ) {
		if ( attributes?.pageSize === 'A4' ) {
			css[ 'max-width' ] = `794px !important`;
			css.height = `1123px !important`;
		} else {
			css[ 'max-width' ] = `816px !important`;
			css.height = `1056px !important`;
		}
	} else if ( attributes?.pageSize === 'A4' ) {
		css.height = `794px !important`;
		css[ 'max-width' ] = `1123px !important`;
	} else {
		css.height = `816px !important`;
		css[ 'max-width' ] = `1056px !important`;
	}
	return css;
};
export const getInnerBlockCss = ( attributes, device = '' ) => {
	const css = {
		...getDimensionCSS(
			attributes?.certificate_padding,
			'padding',
			device
		),
	};
	if ( attributes?.containerWidth ) {
		css.width = `${ attributes?.containerWidth }%`;
	}
	return css;
};
