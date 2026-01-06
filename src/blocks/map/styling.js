import { getCSS as getFilterCSS } from '@Controls/css-filter/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';

export const getMapSizeCSS = ( attributes, device = '' ) => {
	const { mapWidth, mapHeight } = attributes;
	const mapWidthDefaultValue = parseArgs( attributes.mapWidth, {
		value: 100,
		valueUnit: '%',
	} );
	const mapHeightDefaultValue = parseArgs( attributes.mapHeight, {
		value: 500,
		valueUnit: 'px',
	} );
	const mapSizeCSS = {
		...getRangeCSS( {
			attributeValue: mapWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: mapWidthDefaultValue.value,
			unitDefaultValue: mapWidthDefaultValue.valueUnit,
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: mapHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: mapHeightDefaultValue.value,
			unitDefaultValue: mapHeightDefaultValue.valueUnit,
			property: 'height',
			device,
		} ),
	};
	return {
		...mapSizeCSS,
		...getFilterCSS( attributes?.cssFilter, device ),
	};
};
