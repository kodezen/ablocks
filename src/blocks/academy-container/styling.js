import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getMarginCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	const css = {};

	const { containerWidth } = attributes;

	const containerWidthCSS = {
		...getRangeCSS( {
			attributeValue: containerWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 250,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
	};
	if ( containerWidthCSS.width ) {
		containerWidthCSS.width = `${ containerWidthCSS.width } `;
	}
	return {
		...css,
		...containerWidthCSS,
		...getAlignmentCSS( attributes?.floatAlignment, 'float', device ),
		...getMarginCSS( attributes?.floatMargin, 'margin', device ),
	};
};
