import { getCSS as getFilterCSS } from '@Controls/css-filter/helper';

export const getVideoContainerCSS = ( attributes, device = '' ) => {
	const css = {};
	if (
		attributes?.aspectRatio !== '' &&
		attributes?.aspectRatio !== undefined
	) {
		css[ 'aspect-ratio' ] = attributes?.aspectRatio;
	}
	return {
		...css,
		...getFilterCSS( attributes?.cssFilter, device ),
	};
};
