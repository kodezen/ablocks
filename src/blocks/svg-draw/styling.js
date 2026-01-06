import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getWrapperCSS = ( attributes = {}, device = '' ) => {
	const { alignment = {} } = attributes;
	const css = {};
	css.display = 'flex';
	if ( alignment[ 'value' + device ] ) {
		css[ 'justify-content' ] = alignment[ 'value' + device ];
	}
	return css;
};

export const getSvgCSS = ( attributes ) => {
	const css = {};
	if ( attributes.duration ) {
		css[ 'animation-duration' ] = `${ attributes.duration }s !important`;
	}
	return {
		stroke: getTextColorCSS( attributes?.svgDrawColor ),
		...css,
	};
};
