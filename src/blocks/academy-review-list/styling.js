import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getAvatarCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.avatarHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 50,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.avatarWidth,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 50,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
	};
};

export const getAuthorCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.authorTypography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.authorTypographyGlobal
		? attributes.authorTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.authorColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getAuthorHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.authorHoverColor ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.authorTransition,
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

export const getDateTimeCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.dateTypography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.dateTypographyGlobal
		? attributes.dateTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.dateColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getDateTimeHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.dateHoverColor ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.dateTransition,
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
	const typographyValue = parseArgs( attributes?.desTypography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.desTypographyGlobal
		? attributes.desTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.desColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getDescriptionHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.desHoverColor ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.desTransition,
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

export const getSummaryCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.sumTypography ?? [], {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.sumTypographyGlobal
		? attributes.sumTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.sumColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getSummaryHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.sumColorH ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.sumTransition,
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

export const getSummaryIconCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.iconColor ) || '#f4c150',
		...getRangeCSS( {
			attributeValue: attributes?.iconSize,
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

export const getSummaryIconHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.btnTextColor ) || '#f4c150' };
};
