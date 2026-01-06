import { getCSS as getPaddingCSS } from '@Controls/dimensions/helper';
import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getContentTimelineShowDateCenterCSS = ( attribute, device ) => {
	const css = {};
	const showDateKey = device ? `showDate${ device }` : 'showDate';
	const showDate = attribute[ showDateKey ];
	const isCentered = attribute.contentPosition === 'center';
	if ( isCentered ) {
		css.display = showDate ? 'block' : 'none';
	}

	return css;
};
export const getContentTimelineShowDateLeftRightCSS = ( attribute, device ) => {
	const css = {};
	const showDateKey = device ? `showDate${ device }` : 'showDate';
	const showDate = attribute[ showDateKey ];
	const isLeftOrRight = attribute.contentPosition === 'left' || 'right';
	if ( isLeftOrRight ) {
		css.display = showDate ? 'block' : 'none';
	}
	if ( attribute.contentPosition === 'center' ) {
		css.display = 'block';
	}
	return css;
};
export const getContentTimelineShowDateMobileCSS = ( attributes, device ) => {
	const css = {};
	if ( device === '' || device === 'Tablet' ) {
		css.display = 'none';
	}
	if (
		attributes[ `showDate${ device }` ] === false &&
		device === 'Mobile'
	) {
		css.display = 'none';
	}
	if ( attributes[ `showDate${ device }` ] === true && device === 'Mobile' ) {
		css.display = 'block';
	}
	return css;
};
export const getContentTimelineShowDateLeftRightLineCSS = (
	attribute,
	device
) => {
	const css = {};
	const showDate = attribute[ `showDate${ device }` ] || null;

	if ( device === 'Mobile' ) {
		// Specific case for mobile content position left/right without date
		if ( attribute.contentPosition === 'left' ) {
			css.left = 'calc(35px / 2) !important';
		} else if ( attribute.contentPosition === 'right' ) {
			css.right = 'calc(35px / 2) !important';
		}
	} else if ( device ) {
		// Non-mobile styles (if needed)
		if ( attribute.contentPosition === 'left' ) {
			css.left = showDate
				? 'calc(30% / 2) !important'
				: 'calc(61px / 2) !important';
			css.right = 'auto !important';
		} else if ( attribute.contentPosition === 'right' ) {
			css.right = showDate
				? 'calc(30% / 2) !important'
				: 'calc(61px / 2) !important';
			css.left = 'auto !important';
		}
	} else {
		// Fallback for cases where device is not mobile and not defined
		// eslint-disable-next-line
		if (attribute.contentPosition === 'left') {
			css.left = showDate
				? 'calc(30% / 2) !important'
				: 'calc(61px / 2) !important';
			css.right = 'auto !important';
		} else if ( attribute.contentPosition === 'right' ) {
			css.right = showDate
				? 'calc(30% / 2) !important'
				: 'calc(61px / 2) !important';
			css.left = 'auto !important';
		}
	}

	return css;
};
export const getContentTimelineIconCSS = ( attributes, device = '' ) => {
	const css = {
		fill: getTextColorCSS( attributes?.iconColor ),
		...getRangeCSS( {
			attributeValue: attributes?.iconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 18,
			unitDefaultValue: 'px',
			property: 'width',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.iconSize,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 18,
			unitDefaultValue: 'px',
			property: 'height',
			device,
		} ),
	};
	return css;
};

export const getContentTimelineIconBackgroundCSS = ( attributes ) => {
	const css = {
		background: getTextColorCSS( attributes?.iconBackgroundColor ),
		...getRangeCSS( {
			attributeValue: attributes?.iconBackgroundSize,
			attributeObjectKey: 'value',
			defaultValue: 48,
			property: 'width',
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.iconBackgroundSize,
			attributeObjectKey: 'value',
			defaultValue: 48,
			property: 'height',
		} ),
	};
	return css;
};

export const getContentTimelineConnectorCSS = ( attributes, device = '' ) => {
	const css = {
		background: getTextColorCSS( attributes?.thicknessColor ),
		...getRangeCSS( {
			attributeValue: attributes?.thickness,
			attributeObjectKey: 'value',
			defaultValue: 3,
			property: 'width',
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.lineLeft,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			property: 'margin-left',
			device,
		} ),
		...getRangeCSS( {
			attributeValue: attributes?.lineRight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 0,
			unitDefaultValue: 'px',
			property: 'margin-right',
			device,
		} ),
	};
	return css;
};

export const getContentTimelineItemGapCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes?.itemGap,
			attributeObjectKey: 'value',
			hasUnit: true,
			defaultValue: 10,
			unitDefaultValue: 'px',
			property: 'margin-top',
			device,
		} ),
	};
	return css;
};

export const getContentTimelineContentCSS = ( attributes ) => {
	return {
		background: getTextColorCSS( attributes?.contentBackgroundColor ),
	};
};
export const getContentTimelineContentPaddingCSS = (
	attributes,
	device = ''
) => {
	const css = {};

	css.padding = '15px';

	return {
		...css,
		...getPaddingCSS( attributes?.contentPadding, 'padding', device ),
	}; // Directly return css as there is no need to spread it
};

export const getContentTimelineContentBackgroundCSS = ( attributes ) => {
	const css = {};
	if ( attributes?.contentBackgroundColor ) {
		css[ 'border-left-color' ] = getTextColorCSS(
			attributes?.contentBackgroundColor
		);
		css[ 'border-right-color' ] = getTextColorCSS(
			attributes?.contentBackgroundColor
		);
	}
	return css;
};

export const getContentTimelineDateCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.dateTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.dateTypographyGlobal
		? attributes.dateTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.dateColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};

export const getContentTimelineArrowCSS = ( attributes ) => {
	const css = {};
	if ( attributes?.arrowAlignment === 'top' ) {
		css.height = '0px';
		css.top = attributes?.iconBackgroundSize
			? `${ attributes?.iconBackgroundSize / 2 }px`
			: 0;
	}
	if ( attributes?.arrowAlignment === 'bottom' ) {
		css.height = attributes?.iconBackgroundSize
			? `${ attributes?.iconBackgroundSize / 2 }px`
			: 0;
		css.bottom = '0';
	}
	return {
		...css,
	};
};
export const getContentTimelineDateAlignmentCSS = ( attributes ) => {
	const css = {};
	if ( attributes?.arrowAlignment === 'top' ) {
		css[ 'margin-top' ] = attributes?.iconBackgroundSize
			? `${ attributes?.iconBackgroundSize / 4 }px`
			: 0;
	}
	if ( attributes?.arrowAlignment === 'bottom' ) {
		css[ 'margin-bottom' ] = attributes?.iconBackgroundSize
			? `${ attributes?.iconBackgroundSize / 4 }px`
			: 0;
	}
	return {
		...css,
	};
};
export const getContentTimelineDateMobileCSS = ( attributes, device ) => {
	const css = {};
	if ( attributes?.dateAlign ) {
		css[ 'text-align' ] = attributes?.dateAlign;
	}
	return {
		background: getTextColorCSS( attributes?.dateBackground ),
		...css,
		...getPaddingCSS( attributes?.datePadding, 'padding', device ),
		...getBorderCSS( attributes?.dateBorder, device ),
	};
};
export const getContentTimelineDateHoverMobileCSS = ( attributes, device ) => {
	return {
		...getBorderHoverCSS( attributes?.dateBorder, device ),
	};
};
