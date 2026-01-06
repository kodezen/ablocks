import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
export const getAvatarImageCSS = ( attributes, device = '' ) => {
	return {
		...getRangeCSS( {
			attributeValue: attributes?.avatarH,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 62,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.avatarW,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 62,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
	};
};

export const getTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.titleTypography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.titleTypographyGlobal
		? attributes.titleTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.titleColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getTitleHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.titleColorH ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.titleTransition,
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

export const getReviewTextCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.textTypography ?? [], {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.textTypographyGlobal
		? attributes.textTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.textColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getReviewIconCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.star_color ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.star_size,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 14,
			unitDefaultValue: 'px',
			property: 'font-size',
			device,
		} ),
	};
};

export const getInstructorCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.insTypography ?? [], {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.insTypographyGlobal
		? attributes.insTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.insColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
