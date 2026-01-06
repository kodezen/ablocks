import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';

export const getInputPlaceholderCSS = ( attributes, device = '' ) => {
	const { inputPlaceholderColor, placeholderAlignment } = attributes;
	const placeholderCSS = {
		...getAlignmentCSS( placeholderAlignment, 'text-align', device ),
	};
	if ( inputPlaceholderColor ) {
		placeholderCSS.color = inputPlaceholderColor;
	}

	return placeholderCSS;
};
