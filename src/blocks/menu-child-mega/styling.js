import { getCSS as getRangeCSS } from '@Controls/range/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	const wrapperCSS = {
		...getRangeCSS( {
			attributeValue: attributes.positionX,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 0,
			property: 'left',
			unitDefaultValue: '%',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.width,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: 100,
			hasUnit: true,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.height,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes.height,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	if ( attributes?.height?.value ) {
		wrapperCSS[ 'overflow-y' ] = 'auto';
		wrapperCSS[ 'overflow-x' ] = 'hidden';
	}
	return wrapperCSS;
};
