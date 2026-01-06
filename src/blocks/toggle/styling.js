import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';

export const getToggleBarWrapperCSS = ( attributes, device = '' ) => {
	const { toggleDirection, gap } = attributes;
	const toggleBarWrapperCSS = {
		...getRangeCSS( {
			attributeValue: gap,
			attributeObjectKey: 'value',
			defaultValue: 10,
			isResponsive: true,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	if ( toggleDirection ) {
		toggleBarWrapperCSS[ 'flex-direction' ] = toggleDirection;
	}

	return toggleBarWrapperCSS;
};

export const getToggleBarCSS = ( attributes, device = '' ) => {
	const { toggleBarBgColor, toggleBarPadding, toggleBarBorder, space } =
		attributes;
	const toggleBorderUnit = parseArgs( toggleBarBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const togglePaddingUnit = parseArgs( toggleBarPadding, {
		unit: 'px',
	} );
	const toggleBarCSS = {
		...getRangeCSS( {
			attributeValue: space,
			attributeObjectKey: 'value',
			defaultValue: 10,
			isResponsive: true,
			property: 'margin-bottom',
			unitDefaultValue: 'px',
			device,
		} ),
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
		...getPaddingCSS( togglePaddingUnit, 'padding', device ),
		...getBorderCSS( toggleBorderUnit, device ),
	};
	if ( toggleBarBgColor ) {
		toggleBarCSS[ 'background-color' ] =
			getTextColorCSS( toggleBarBgColor );
	}

	return toggleBarCSS;
};

export const getToggleBarHoverCSS = ( attributes, device = '' ) => {
	const toggleBorderHoverUnit = parseArgs( attributes?.toggleBarBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( toggleBorderHoverUnit, device ),
	};
};

export const getToggleLabelCSS = ( attributes, device = '' ) => {
	const { labelTypography } = attributes;
	const typographyValue = parseArgs( labelTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.labelTypographyGlobal
		? attributes.labelTypographyGlobal
		: '';
	const labelCSS = {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	return {
		color: getTextColorCSS( attributes?.labelNormalColor ),
		...labelCSS,
	};
};

export const getToggleLabelActiveCSS = ( attributes ) => {
	return { color: getTextColorCSS( attributes?.labelActiveColor ) };
};
export const toggleActiveBgColorCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.toggleActiveColor ) };
};
export const toggleActiveColorCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.toggleActiveBgColor ) };
};
export const toggleNormalColorCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.toggleNormalColor ) };
};
export const toggleNormalBgColorCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.toggleNormalBgColor ) };
};
