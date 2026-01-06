import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getCurriculumHeadingCSS = ( attributes, device = '' ) => {
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

export const getCurriculumHeadingHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.heading_color_hover ) };
};

export const getSubCurriculumCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.title_typography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.title_typographyGlobal
		? attributes.title_typographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.title_color ),
		background: getTextColorCSS( attributes?.title_bg ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getSubCurriculumHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.title_color_hover ),
		background: getTextColorCSS( attributes?.title_bg_hover ),
	};
};
export const getLessonTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.contentTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.contentTypographyGlobal
		? attributes.contentTypographyGlobal
		: '';

	return {
		...getTypographyCSS( typographyValue, device, typographyValue ),
		color: getTextColorCSS( attributes?.contentColor ),
	};
};

export const getLessonTitleHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.contentColorH ) };
};

export const getLessonListCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.lesson_list_bg ) || '#fff',
	};
};

export const getLessonListHoverCSS = ( attributes, device = '' ) => {
	return {
		background: getTextColorCSS( attributes?.lesson_list_hover ) || '#fff',
	};
};

export const getIconCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.lock_icon_color ),
		...getRangeCSS( {
			attributeValue: attributes?.lock_icon_size,
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

export const getIconHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.lock_icon_hover ) };
};

export const getIconReadCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.read_icon_color ),
		...getRangeCSS( {
			attributeValue: attributes?.readIconSize,
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

export const getIconReadHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.read_icon_hover ) };
};
