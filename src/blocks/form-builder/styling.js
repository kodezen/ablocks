import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getRowColumnDisplayCss = ( attributes, device = '' ) => {
	const css = {};
	const dirValue = attributes?.dir?.[ 'value' + device ];

	if ( dirValue === 'row' || dirValue === 'row-reverse' ) {
		css[ 'flex-direction' ] = dirValue;
		css[ 'align-items' ] = 'center';
	} else if ( dirValue === 'column' || dirValue === 'column-reverse' ) {
		css[ 'flex-direction' ] = dirValue;
		css[ 'flex-wrap' ] = 'wrap';
	}
	return {
		...css,
	};
};

export const getWrapperCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS( attributes?.alignment, 'text-align', device ),
	};
};
export const getChildBlockPositionCSS = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.formType !== 'multi-step' ) {
		css.display = 'flex';
		css[ 'flex-wrap' ] = 'wrap';
		css[ 'row-gap' ] = '2px'; // Top and bottom gap
		css[ 'column-gap' ] = device === 'Mobile' ? '4px' : '8px'; // Left and right gap
	}
	return {
		...css,
	};
};
export const getMultiStepAppenderRemove = ( attributes, device = '' ) => {
	const css = {};
	if ( attributes?.formType === 'multi-step' ) {
		css.display = 'none';
	}
	return {
		...css,
	};
};
export const getFieldCSS = ( attributes, device = '' ) => {
	const { rowsSpacing } = attributes;
	const fieldCSS = {
		...getRangeCSS( {
			attributeValue: rowsSpacing,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'margin-top',
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: rowsSpacing,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'margin-bottom',
			defaultValue: 0,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	return fieldCSS;
};

export const getLabelCSS = ( attributes, device = '' ) => {
	const { labelTypography, labelSpacing, showLabels, labelAlignment } =
		attributes;
	const typographyValue = parseArgs( labelTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.labelTypographyGlobal
		? attributes.labelTypographyGlobal
		: '';
	const labelCSS = {
		color: getTextColorCSS( attributes?.labelColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getAlignmentCSS( labelAlignment, 'text-align', device ),
		...getRangeCSS( {
			attributeValue: labelSpacing,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'margin-bottom',
			defaultValue: 10,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	if ( labelCSS[ 'margin-bottom' ] ) {
		labelCSS[ 'margin-bottom' ] =
			labelCSS[ 'margin-bottom' ] + ' !important';
	}
	if ( ! showLabels ) {
		labelCSS.display = 'none';
	}
	return labelCSS;
};
export const getHelperTextCSS = ( attributes, device = '' ) => {
	const {
		helperTextSpacing,
		showLabels,
		labelAlignment,
		helperTextTypography,
	} = attributes;
	const typographyValue = parseArgs( helperTextTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.helperTextTypographyGlobal
		? attributes.helperTextTypographyGlobal
		: '';
	const helperTextCSS = {
		color: getTextColorCSS( attributes?.helperTextColor ),
		...getAlignmentCSS( labelAlignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getRangeCSS( {
			attributeValue: helperTextSpacing,
			attributeObjectKey: 'value',
			isResponsive: true,
			property: 'margin-bottom',
			defaultValue: 10,
			unitDefaultValue: 'px',
			device,
		} ),
	};
	if ( ! showLabels ) {
		helperTextCSS.display = 'none';
	}
	if ( helperTextSpacing[ 'value' + device ] ) {
		helperTextCSS[ 'margin-top' ] = `${
			helperTextSpacing[ 'value' + device ] + 'px'
		}`;
		helperTextCSS[ 'margin-bottom' ] = `${
			helperTextSpacing[ 'value' + device ] + 'px'
		}`;
	}
	return helperTextCSS;
};

export const getInputCSS = ( attributes, device = '' ) => {
	const { inputTypography, inputBorder, inputPadding, inputAlignment } =
		attributes;
	const css = {};
	if ( inputBorder.borderStyle === 'default' ) {
		css.border = '1px solid #A7AAAD';
		css[ 'border-radius' ] = '5px';
	}
	css[ 'box-sizing' ] = 'border-box';
	const typographyValue = parseArgs( inputTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.inputTypographyGlobal
		? attributes.inputTypographyGlobal
		: '';

	const paddingUnit = parseArgs( inputPadding, {
		unit: 'px',
	} );
	const borderUnit = parseArgs( inputBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const inputCSS = {
		color: getTextColorCSS( attributes?.inputColor ),
		background: getTextColorCSS( attributes?.inputBgColor ),
		...css,
		...getAlignmentCSS( inputAlignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( borderUnit, device ),
		...getPaddingCSS( paddingUnit, 'padding', device ),
	};
	return inputCSS;
};

export const getInputHoverCSS = ( attributes, device = '' ) => {
	const { inputBorder } = attributes;
	const css = {};
	if ( inputBorder.borderStyle === 'default' ) {
		css.border = '1px solid #007cba';
		css[ 'border-radius' ] = '5px';
	}
	const inputFocusCSS = {
		...css,
		...getBorderHoverCSS( inputBorder, device ),
	};

	return inputFocusCSS;
};
export const getInputFocusCSS = ( attributes, device = '' ) => {
	const { inputBorder } = attributes;
	const css = {};
	if ( inputBorder.borderStyle === 'default' ) {
		css.border = '1px solid #007cba';
		css[ 'border-radius' ] = '5px';
	}
	const inputFocusCSS = {
		...css,
		...getBorderHoverCSS( inputBorder, device ),
	};

	return inputFocusCSS;
};

export const getInputPlaceholderCSS = ( attributes, device = '' ) => {
	const { inputAlignment, inputTypography } = attributes;
	const typographyValue = parseArgs( inputTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.inputTypographyGlobal
		? attributes.inputTypographyGlobal
		: '';
	const placeholderCSS = {
		color: getTextColorCSS( attributes?.inputPlaceholderColor ),
		...getAlignmentCSS( inputAlignment, 'text-align', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
	return placeholderCSS;
};

// Function to generate CSS for the Submit Button
export const getSubmitButtonCSS = ( attributes, device = '' ) => {
	const { buttonBorder, buttonTypography } = attributes;

	// Base styles for the button
	const typographyValue = parseArgs( buttonTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.buttonTypographyGlobal
		? attributes.buttonTypographyGlobal
		: '';
	const buttonPaddingUnit = parseArgs( attributes?.buttonPadding, {
		unit: 'px',
	} );
	const buttonBorderUnit = parseArgs( buttonBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const buttonCSS = {
		color: getTextColorCSS( attributes?.buttonColor ),
		background: getTextColorCSS( attributes?.buttonBgColor ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
	};
	return buttonCSS;
};

export const getAlignmentButtonCSS = ( attributes, device = '' ) => {
	const { buttonTextAlignment, buttonAlignment } = attributes;

	// Base styles for the button
	const allignmentButtonCSS = {
		...getAlignmentCSS( buttonTextAlignment, 'text-align', device ),
		...getAlignmentCSS( buttonAlignment, 'align-self', device ),
	};
	return allignmentButtonCSS;
};

export const getSubmitButtonHoverCSS = ( attributes, device = '' ) => {
	const { buttonBorder } = attributes;
	const buttonHoverCSS = {
		color: getTextColorCSS( attributes?.buttonHColor ),
		background: getTextColorCSS( attributes?.buttonBgHColor ),
		...getBorderHoverCSS( buttonBorder, device ),
	};
	return buttonHoverCSS;
};
export const getIconPositionCSS = ( attributes, device ) => {
	const { inputIconPosition } = attributes;
	return {
		...getRangeCSS( {
			attributeValue: inputIconPosition,
			isResponsive: false,
			property: 'top',
			defaultValue: 75,
			unitDefaultValue: '%',
			device,
		} ),
	};
};
export const getNevigetorCSS = ( attributes, device ) => {
	const navigatorPaddingUnit = parseArgs( attributes?.navigatorPadding, {
		unit: 'px',
	} );
	const typographyValue = parseArgs( attributes?.navigatorTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.navigatorTypographyGlobal
		? attributes.navigatorTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.navigatorColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getPaddingCSS( navigatorPaddingUnit, 'padding', device ),
		...getAlignmentCSS(
			attributes.navigatorAlignment,
			'text-align',
			device
		),
	};
};
export const getNavigatorSpacingCSS = ( attributes, device ) => {
	const { navigatorSpacing } = attributes;
	return {
		...getRangeCSS( {
			attributeValue: navigatorSpacing,
			isResponsive: false,
			property: 'margin-bottom',
			defaultValue: 20,
			unitDefaultValue: 'px',
			device,
		} ),
	};
};
export const getErrorStylesCSS = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.errorColor ),
		background: getTextColorCSS( attributes?.errorBackground ),
	};
};
export const getSuccessStylesCSS = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.successColor ),
		background: getTextColorCSS( attributes?.successBackground ),
	};
};

export const getSuccessErrorCommonStylesCSS = ( attribute, device ) => {
	const typographyValue = parseArgs( attribute?.successErrorTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attribute.successErrorTypographyGlobal
		? attribute.successErrorTypographyGlobal
		: '';
	const paddingUnit = parseArgs( attribute?.successErrorPadding, {
		unit: 'px',
	} );
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getPaddingCSS( paddingUnit, 'padding', device ),

		...getAlignmentCSS(
			attribute.successErrorAlignment,
			'text-align',
			device
		),
	};
};
