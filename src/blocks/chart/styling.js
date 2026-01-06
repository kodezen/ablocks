import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};

export const getChartCSS = ( attributes, device = '' ) => {
	const { chartHeight, chartWidth, chartType } = attributes;
	const chartWidthCSS = {
		...getRangeCSS( {
			attributeValue: chartWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 95,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
	};
	if ( chartWidthCSS.width ) {
		chartWidthCSS.width = `${ chartWidthCSS.width } !important`;
	}
	const chartHeightCSS = {
		...getRangeCSS( {
			attributeValue: chartHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 620,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	if ( chartHeightCSS.height ) {
		chartHeightCSS.height = `${ chartHeightCSS.height } !important`;
	}
	return {
		...chartHeightCSS,
		...chartWidthCSS,
	};
};
