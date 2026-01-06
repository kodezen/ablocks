import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getOverviewHeadingCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.heading_typography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.heading_typographyGlobal
		? attributes.heading_typographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.heading_color ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getOverviewHeadingHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.heading_colorH ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.heading_transition,
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

export const getDescriptionCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.description_color ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.description_colorGlobal
		? attributes.description_colorGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.description_color ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getDescriptionHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.description_colorH ) || '#444',
		...getRangeCSS( {
			attributeValue: attributes?.description_transition,
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
