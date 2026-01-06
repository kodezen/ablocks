import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getActiveContentParentCSS = ( attributes, device = '' ) => {
	const { contentWidth } = attributes;

	const css = {};

	if ( contentWidth.valueUnit === '%' ) {
		css.width = ` ${ contentWidth[ 'value' + device ] }${
			contentWidth[ 'valueUnit' + device ] || 'px'
		}`;
	}
	return {
		...css,
	};
};
export const getActiveContentCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.contentWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			defaultValue: '',
			hasUnit: true,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
	};
	return {
		...css,
		background: getTextColorCSS( attributes?.backgroundColor ),
		...getBorderCSS( attributes?.contentBorder, device ),
		...getPaddingCSS( attributes?.contentPadding, 'padding', device ),
	};
};

export const getActiveContentHoverCSS = ( attributes, device = '' ) => {
	return {
		...getBorderHoverCSS( attributes?.contentBorder, device ),
	};
};
