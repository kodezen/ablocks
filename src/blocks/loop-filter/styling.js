import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getPaddingCSS,
	getCSS as getMarginCSS,
} from '@Controls/dimensions/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const filterButtonAlignment = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.FilterBtnGap,
			attributeObjectKey: 'value',
			hasUnit: true,
			defaultValue: 10,
			unitDefaultValue: 'px',
			property: 'gap',
			device,
		} ),
	};
	css.display = 'flex';
	css.width = '100%';
	css[ 'flex-wrap' ] = 'wrap';
	if ( attributes.buttonAlignment ) {
		css[ 'flex-direction' ] = attributes.buttonAlignment;
	}
	if ( attributes.filterBtnAlignment[ 'value' + device ] ) {
		css[ 'align-items' ] =
			attributes.filterBtnAlignment[ 'value' + device ];
	}
	if ( attributes.rowAlignBtn[ 'value' + device ] ) {
		css[ 'justify-content' ] = attributes.rowAlignBtn[ 'value' + device ];
	}
	return css;
};

export const getNormalButtonStyle = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.typography, {
		weight: '400',
	} );
	const typographyGlobal = attributes.typographyGlobal
		? attributes.typographyGlobal
		: '';
	const buttonBorderUnit = parseArgs( attributes.filterBtnBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const filterButtonMarginUnit = parseArgs( attributes?.filterButtonMargin, {
		unit: 'px',
	} );
	const filterButtonPaddingUnit = parseArgs(
		attributes?.filterButtonPadding,
		{
			unit: 'px',
		}
	);
	return {
		color: getTextColorCSS( attributes?.filterBtnTextColor ),
		background: getTextColorCSS( attributes?.filterBtnBgColor ),
		...getTypographyCSS( typographyValue, device, typographyGlobal ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getMarginCSS( filterButtonMarginUnit, 'margin', device ),
		...getPaddingCSS( filterButtonPaddingUnit, 'padding', device ),
	};
};
export const getNormalHoverButtonStyle = ( attributes, device = '' ) => {
	const buttonBorderHoverUnit = parseArgs( attributes.filterBtnBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
	};
};
export const getACtivebButtonStyle = ( attributes, device = '' ) => {
	const buttonBorderUnit = parseArgs( attributes.activeBtnBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		color: getTextColorCSS( attributes?.activeBtnTextColor ),
		background: getTextColorCSS( attributes?.activeBtnBgColor ),
		...getBorderCSS( buttonBorderUnit, device ),
	};
};

export const getActiveButtonStyleHover = ( attributes, device = '' ) => {
	const buttonBorderHoverUnit = parseArgs( attributes.activeBtnBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
	};
};
