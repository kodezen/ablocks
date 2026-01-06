import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};

export const getDividerContainerCSS = ( attributes, device = '' ) => {
	const { gap, alignment } = attributes;
	// Generate CSS for the divider container
	const dividerContainerCSS = {
		...getRangeCSS( {
			attributeValue: gap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'padding-block-start',
			defaultValue: 10,
			unitDefaultValue: 'px',
			device,
		} ),
	};

	// Generate CSS for the divider
	const dividerCSS = {
		...getRangeCSS( {
			attributeValue: gap,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'padding-block-end',
			defaultValue: 10,
			unitDefaultValue: 'px',
			device,
		} ),
	};

	// Add alignment to the container if it exists for the specific device
	if ( alignment[ `value${ device }` ] ) {
		dividerContainerCSS[ 'justify-content' ] =
			alignment[ `value${ device }` ];
	}

	// Combine and return the CSS
	return {
		...dividerContainerCSS,
		...dividerCSS,
	};
};

export const getDividerCSS = ( attributes, device = '' ) => {
	const { width } = attributes;

	const dividerCSS = {
		...getRangeCSS( {
			attributeValue: width,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'value',
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: '%',
			device,
		} ),
	};
	const css = {};
	if (
		dividerCSS?.value &&
		( '100%' !== dividerCSS?.value + dividerCSS?.valueUnit ||
			device !== '' )
	) {
		css[
			'max-width'
		] = `min(100%, ${ dividerCSS?.value }${ dividerCSS?.valueUnit })!important`;
	}

	return css;
};

export const getDividerElementTextCSS = ( attributes, device = '' ) => {
	const dividerTextStyles = {
		...getRangeCSS( {
			attributeValue: attributes?.elementTextSpacing,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'padding-left',
			hasUnit: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.elementTextSpacing,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'padding-right',
			hasUnit: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	// Get text spacing values and units

	const typographyValue = parseArgs( attributes.elementTextTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.elementTextTypographyGlobal
		? attributes.elementTextTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.elementTextColor ),
		...( attributes?.elementTextTypography
			? getTypographyCSS( typographyValue, device, typographyValueGlobal )
			: {} ),
		...( attributes?.elementTextStroke
			? getTextStrokeCSS( attributes.elementTextStroke, device )
			: {} ),
	};
};
