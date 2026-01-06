import { getCSS as getRangeCSS } from '@Controls/range/helper';

export const getInnerBlockCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.gap,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: false,
			defaultValue: 12,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
	};
	return css;
};
