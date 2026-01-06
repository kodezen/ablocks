import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getCellCSS = ( attributes ) => {
	const { textAlignment } = attributes;
	const cellCSS = {};
	if ( textAlignment ) {
		cellCSS[ 'text-align' ] = textAlignment;
	}

	return {
		background: getTextColorCSS( attributes?.cellColor ),
		...cellCSS,
	};
};
export const getCellHoverCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.cellColorH ) };
};
