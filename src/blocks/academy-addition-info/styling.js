import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getMarginCSS } from '@Controls/dimensions/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';

export const getHeadingCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.headingTypography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.headingTypographyGlobal
		? attributes.headingTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.headingColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getHeadingHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.headingColorH ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.headingTransition,
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
export const getListCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.listTypography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.listTypographyGlobal
		? attributes.listTypographyGlobal
		: '';

	return {
		color: getTextColorCSS( attributes?.listColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getListHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.listColorH ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.listTransition,
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
export const getTabCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes?.tabTypography ?? '', {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.tabTypographyGlobal
		? attributes.tabTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.tabColor ) || '#111',
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getTabHoverCSS = ( attributes, device = '' ) => {
	return {
		color: getTextColorCSS( attributes?.tabColorH ) || '#111',
		...getRangeCSS( {
			attributeValue: attributes?.tabTransition,
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

export const getListActiveCSS = ( attributes, device = '' ) => {
	const buttonBorderUnit = parseArgs( attributes.listBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const buttonMarginUnit = parseArgs( attributes?.listMargin, {
		unit: 'px',
	} );

	return {
		...getBorderCSS( buttonBorderUnit, device ),
		...getMarginCSS( buttonMarginUnit, 'margin', device ),
	};
};

export const getListActiveHoverCSS = ( attributes, device = '' ) => {
	return { color: getTextColorCSS( attributes?.activeColorH ) || '#111' };
};
