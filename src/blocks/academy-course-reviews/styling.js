import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getFeedbackHeadingCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.heading_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.heading_typographyGlobal
		? attributes.heading_typographyGlobal
		: '';

	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		color: getTextColorCSS( attributes?.heading_color ),
	};
};

export const getFeedbackHeadingHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.heading_color_hover ) };
};

export const getFeedbackSectionCSS = ( attributes, device = '' ) => {
	const buttonPaddingUnit = parseArgs( attributes?.padding, {
		unit: 'px',
	} );
	const buttonBorderUnit = parseArgs( attributes.border, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.section_bg ) || '#fff',
		...getBorderCSS( buttonBorderUnit, device ),
		...getPaddingCSS( buttonPaddingUnit, 'padding', device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
		...getRangeCSS( {
			attributeValue: attributes?.section_width,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: '%',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.section_height,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 100,
			unitDefaultValue: '%',
			property: 'height',
			device,
		} ),
	};
};

export const getFeedbackSectionHoverCSS = ( attributes, device = '' ) => {
	const buttonBorderHoverUnit = parseArgs( attributes.border, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );

	return {
		background: getTextColorCSS( attributes?.section_bg_hover ) || '#fff',
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
		...getBorderHoverCSS( buttonBorderHoverUnit, device ),
		...getRangeCSS( {
			attributeValue: attributes?.transition,
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

export const getAvgRatingCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.avg_typography, {
		weight: '400',
	} );

	const typographyValueGlobal = attributes.avg_typographyGlobal
		? attributes.avg_typographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		color: getTextColorCSS( attributes?.avg_color ),
	};
};

export const getAvgRatingHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.avg_color_hover ),
		...getRangeCSS( {
			attributeValue: attributes?.avg_transition,
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

export const getRatingStarCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.rating_color ),
		...getRangeCSS( {
			attributeValue: attributes?.rating_size,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 16,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
};

export const getRatingStartHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.rating_color_hover ),
		...getRangeCSS( {
			attributeValue: attributes?.rating_transition,
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

export const getRatingTotalCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.total_typography, {
		weight: '400',
	} );

	const typographyValueGlobal = attributes.total_typographyGlobal
		? attributes.total_typographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.total_rating_color ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getRatingTotalHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.total_rating_hover ),
		...getRangeCSS( {
			attributeValue: attributes?.total_transition,
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

export const getFeedbackCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.listTypography, {
		weight: '400',
	} );

	const typographyValueGlobal = attributes.listTypographyGlobal
		? attributes.listTypographyGlobal
		: '';
	return {
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		color: getTextColorCSS( attributes?.listColor ),
	};
};

export const getFeedbackHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.listColorH ),
		...getRangeCSS( {
			attributeValue: attributes?.listT,
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

export const getStartCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.starColor ),
		...getRangeCSS( {
			attributeValue: attributes?.startSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 16,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
};

export const getStartHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.starColorH ),
		...getRangeCSS( {
			attributeValue: attributes?.startT,
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

export const getFillCSS = ( attributes, device = '' ) => {
	return { background: getTextColorCSS( attributes?.fillBg ) || '#e7e7e7' };
};

export const getFillHoverCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.fillBgH ) || '#e7e7e7',
		...getRangeCSS( {
			attributeValue: attributes?.fillT,
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
export const getFillActiveCSS = ( attributes, device = '' ) => {
	return { background: getTextColorCSS( attributes?.fillABg ) || '#f4c150' };
};

export const getFillActiveHoverCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.fillABgH ) || '#f4c150',
		...getRangeCSS( {
			attributeValue: attributes?.fillT,
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
