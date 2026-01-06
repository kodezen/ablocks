import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';

export const getReviewFormCSS = ( attributes, device = '' ) => {
	const buttonPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	const buttonBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		background: getTextColorCSS( attributes?.review_bg ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getRangeCSS( {
			attributeValue: attributes?.box_width,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
	};
};

export const getReviewFormHoverCSS = ( attributes, device = '' ) => {
	const buttonBorderHoverUnit = parseArgs( attributes.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		background: getTextColorCSS( attributes?.review_bg_hover ),
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
		...getRangeCSS( {
			attributeValue: attributes?.box_transition,
			attributeObjectKey: 'value',
			isResponsive: false,
			hasUnit: false,
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
};

export const getReviewButtonCSS = ( attributes, device = '' ) => {
	const buttonPaddingUnit = parseArgs( attributes?.button_padding, {
		unit: 'px',
	} );

	const typographyValue = parseArgs(
		attributes?.review_btn_typography ?? [],
		{
			weight: '400',
		}
	);
	const typographyValueGlobal = attributes.review_btn_typographyGlobal
		? attributes.review_btn_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.review_btn ),
		background: getTextColorCSS( attributes?.review_btn_bg ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getReviewButtonHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.review_btn_hover ),
		background: getTextColorCSS( attributes?.review_btn_hover_bg ),
		...getRangeCSS( {
			attributeValue: attributes?.btn_transition,
			attributeObjectKey: 'value',
			isResponsive: false,
			hasUnit: false,
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
};

export const getReviewStarCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.starColor ) || '#f4c150',
		...getRangeCSS( {
			attributeValue: attributes?.startSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 40,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
};
export const getReviewStarHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.starColorH ) || '#f4c150' };
};

export const getFormCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.formTypography ?? [], {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.formTypographyGlobal
		? attributes.formTypographyGlobal
		: '';

	const buttonBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		color: getTextColorCSS( attributes?.formColor ) || '#444',
		background: getTextColorCSS( attributes?.fromBg ) || '#E5E4E6',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getBorderCSS( buttonBorderUnit, device ),
	};
};

export const getFormHoverCSS = ( attributes, device = '' ) => {
	const buttonBorderHoverUnit = parseArgs( attributes.formBorder ?? [], {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		color: getTextColorCSS( attributes?.formColorH ) || '#444',
		background: getTextColorCSS( attributes?.fromBgH ) || '#E5E4E6',
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
		...getRangeCSS( {
			attributeValue: attributes?.formTransition,
			attributeObjectKey: 'value',
			isResponsive: false,
			hasUnit: false,
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
};

export const getFormButtonCSS = ( attributes, device = '' ) => {
	const buttonPaddingUnit = parseArgs( attributes?.formBtnPadding ?? [], {
		unit: 'px',
	} );

	const typographyValue = parseArgs( attributes?.formBtnTypography ?? [], {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.formBtnTypographyGlobal
		? attributes.formBtnTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.formBtnColor ),
		background: getTextColorCSS( attributes?.formBtnBg ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getFormButtonHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.formBtnColorH ),
		background: getTextColorCSS( attributes?.formBtnBgH ),
		...getRangeCSS( {
			attributeValue: attributes?.formBtnT,
			attributeObjectKey: 'value',
			isResponsive: false,
			hasUnit: false,
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
			device,
		} ),
	};
};
