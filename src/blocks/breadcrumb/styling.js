import { getCSS as getAlignmentCSS } from '@Controls/alignment/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getColorCSS } from '@Controls/color/helper';
import { parseArgs } from '@Utils/helper';

export const getWrapperCSS = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.breadcrumbSpaceBetween ) {
		css.gap = `${ attributes?.breadcrumbSpaceBetween }px`;
	}

	return {
		...css,
		...getAlignmentCSS(
			attributes?.positionBreadcrumb,
			'justify-content',
			device
		),
	};
};
export const getWrapperPositionCSS = ( attributes, device = '' ) => {
	return {
		...getAlignmentCSS(
			attributes?.positionBreadcrumb,
			'justify-content',
			device
		),
	};
};

export const getBreadcrunbTitleCSS = ( attributes, device = '' ) => {
	const css = {};
	const typographyValue = parseArgs( attributes.breadcrumbTitleTypography, {
		weight: '500',
	} );
	const typographyValueGlobal = attributes.breadcrumbTitleTypographyGlobal
		? attributes.breadcrumbTitleTypographyGlobal
		: '';
	if ( attributes?.breadcrumbTitlecolor ) {
		css.color = getColorCSS( attributes?.breadcrumbTitlecolor );
	}
	if ( attributes?.breadcrumbItemBackground ) {
		css.backgroundColor = getColorCSS(
			attributes?.breadcrumbItemBackground
		);
	}
	return {
		...css,
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
		...getAlignmentCSS(
			attributes?.taxonomyTitleDirection,
			'flex-direction',
			device
		),
		...getPaddingCSS(
			attributes?.breadcrumbItemPadding,
			'padding',
			device
		),
		...getPaddingCSS(
			attributes?.BreadcrumbBorderRadius,
			'border-radius',
			device
		),
	};
};
export const getBreadcrunbNormalTitleCSS = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.breadcrumbLinkcolor ) {
		css.color = getColorCSS( attributes?.breadcrumbLinkcolor );
	}

	return {
		...css,
	};
};
export const getBreadcrunbHoverTitleCSS = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.breadcrumbHoverLinkcolor ) {
		css.color = getColorCSS( attributes?.breadcrumbHoverLinkcolor );
	}

	return {
		...css,
	};
};
export const getBreadcrunbSeparatorCSS = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.breadcrumbseparatorcolor ) {
		css.color = getColorCSS( attributes?.breadcrumbseparatorcolor );
	}
	if ( attributes?.breadcrumbseparsize ) {
		css.fontsize = `${ attributes?.breadcrumbseparsize }px`;
	}
	return {
		...css,
	};
};

export const getBeforeTextImageCSS = ( attributes, device = '' ) => {
	const css = {};

	if ( attributes?.beforeBreadcrumbBackgroundcolor ) {
		css.backgroundColor = getColorCSS(
			attributes?.beforeBreadcrumbBackgroundcolor
		);
	}
	// const beforeBreadcrumbPaddingUnit = parseArgs( attributes?.beforeBreadcrumbPaddingcolor, {
	//     unit: 'px',
	// } );
	return {
		...css,
		...getPaddingCSS(
			attributes?.beforeBreadcrumbPaddingcolor,
			'padding',
			device
		),
		...getPaddingCSS(
			attributes?.beforeBreadcrumbBorderRadius,
			'border-radius',
			device
		),
	};
};
