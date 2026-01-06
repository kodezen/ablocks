import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import {
	getCSS as getPaddingCSS,
	getCSS as getMarginCSS,
} from '@Controls/dimensions/helper';
import {
	getCSS as getBorderCSS,
	getHoverCSS as getBorderHoverCSS,
} from '@Controls/border/helper';
import {
	getCSS as getBoxShadowCSS,
	getHoverCSS as getBoxShadowHoverCSS,
} from '@Controls/box-shadow/helper';
import { parseArgs, getResponsiveValue } from '@Utils/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getTabsCSS = ( attributes, device = '' ) => {
	const tabsCSS = {};
	const menuPosition = attributes?.tabsMenuPositioning[ 'value' + device ];

	if ( menuPosition === 'top' ) {
		tabsCSS[ 'flex-direction' ] = 'column';
	} else if ( menuPosition === 'bottom' ) {
		tabsCSS[ 'flex-direction' ] = 'column-reverse';
	} else if ( menuPosition === 'left' ) {
		tabsCSS[ 'flex-direction' ] = 'row';
	} else if ( menuPosition === 'right' ) {
		tabsCSS[ 'flex-direction' ] = 'row-reverse';
	}
	return tabsCSS;
};

export const getTabsPanelCSS = ( attributes, device = '' ) => {
	const tabsPanelCSS = {};
	const tabMenuAlignment = attributes?.tabMenuAlignment[ 'value' + device ];
	// Determine the tabsMenuPosition and apply styles accordingly
	const tabsMenuPosition = getResponsiveValue(
		attributes?.tabsMenuPositioning,
		'value',
		device
	);

	// Handle tabMenuAlign for the given device
	if ( tabsMenuPosition === 'top' || tabsMenuPosition === 'bottom' ) {
		if ( attributes?.tabsMenuDirection[ 'value' + device ] === 'row' ) {
			tabsPanelCSS[ 'justify-content' ] = tabMenuAlignment;
		} else if (
			attributes?.tabsMenuDirection[ 'value' + device ] === 'column'
		) {
			tabsPanelCSS[ 'align-items' ] = tabMenuAlignment;
		}
		if (
			tabMenuAlignment &&
			attributes?.tabsWidthType[ 'value' + device ] === 'auto'
		) {
			if ( tabMenuAlignment === 'flex-start' ) {
				tabsPanelCSS[ 'margin-right' ] = 'auto';
			} else if ( tabMenuAlignment === 'center' ) {
				tabsPanelCSS[ 'margin-inline' ] = 'auto';
			}
			if ( tabMenuAlignment === 'flex-end' ) {
				tabsPanelCSS[ 'margin-left' ] = 'auto';
			}
		}
	}

	if ( tabsMenuPosition === 'left' || tabsMenuPosition === 'right' ) {
		// For column layout
		tabsPanelCSS[ 'flex-direction' ] = 'column';
	} else if ( tabsMenuPosition === 'top' || tabsMenuPosition === 'bottom' ) {
		tabsPanelCSS[ 'flex-direction' ] = getResponsiveValue(
			attributes?.tabsMenuDirection,
			'value',
			device
		);
		if ( attributes?.tabWrap[ 'value' + device ] ) {
			tabsPanelCSS[ 'flex-wrap' ] =
				attributes.tabWrap[ 'value' + device ];
		}
	}

	const tabMenusPaddingUnit = parseArgs( attributes?.tabMenusPadding, {
		unit: 'px',
	} );
	const tabMenusMarginUnit = parseArgs( attributes?.tabMenusMargin, {
		unit: 'px',
	} );
	const tabMenusBorderUnit = parseArgs( attributes?.tabMenusBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );

	return {
		...tabsPanelCSS,
		background: getTextColorCSS( attributes?.tabMenusBackgroundColor ),
		...getMarginCSS( tabMenusMarginUnit, 'margin', device ),
		...getPaddingCSS( tabMenusPaddingUnit, 'padding', device ),
		...getBorderCSS( tabMenusBorderUnit, device ),
		...getRangeCSS( {
			attributeValue: attributes.tabsGap,
			attributeObjectKey: 'value',
			defaultValue: 10,
			isResponsive: true,
			hasUnit: true,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};
};

export const getTabsPanelHoverCSS = ( attributes, device = '' ) => {
	const tabMenusBorderHoverUnit = parseArgs( attributes?.tabMenusBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( tabMenusBorderHoverUnit, device ),
	};
};

export const getTabsMenuContentCSS = ( attributes, device = '' ) => {
	const css = {};
	css.display = 'flex';
	const iconPosition = getResponsiveValue(
		attributes?.iconPosition,
		'value',
		device
	);

	const tabsMenuPosition = getResponsiveValue(
		attributes?.tabsMenuPositioning,
		'value',
		device
	);

	if (
		( tabsMenuPosition === 'top' || tabsMenuPosition === 'bottom' ) &&
		attributes?.tabsContentWidthType[ 'value' + device ] === '100%'
	) {
		css.width = '100%';
	}

	if ( iconPosition === 'top' ) {
		css[ 'flex-direction' ] = 'column !important';
		if ( attributes?.menuContentAlignment[ 'value' + device ] ) {
			css[ 'align-items' ] =
				attributes?.menuContentAlignment[ 'value' + device ];
		}
	}
	if ( iconPosition === 'bottom' ) {
		css[ 'flex-direction' ] = 'column-reverse !important';
		if ( attributes?.menuContentAlignment[ 'value' + device ] ) {
			css[ 'align-items' ] =
				attributes?.menuContentAlignment[ 'value' + device ];
		}
	}
	if ( iconPosition === 'left' ) {
		css[ 'flex-direction' ] = 'row !important';
		css[ 'align-items' ] = 'center';
		if ( attributes?.menuContentAlignment[ 'value' + device ] ) {
			css[ 'justify-content' ] =
				attributes?.menuContentAlignment[ 'value' + device ];
		}
	}
	if ( iconPosition === 'right' ) {
		css[ 'flex-direction' ] = 'row-reverse !important';
		css[ 'align-items' ] = 'center';
		if ( attributes?.menuContentAlignment[ 'value' + device ] ) {
			css[ 'justify-content' ] =
				attributes?.menuContentAlignment[ 'value' + device ];
		}
	}
	const contentPaddingUnit = parseArgs( attributes?.menuContentPadding, {
		unit: 'px',
	} );
	const contentMenuBorderUnit = parseArgs( attributes?.menuContentBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	return {
		background: getTextColorCSS( attributes?.tabBackgroundColor ),
		...css,
		...getBorderCSS( attributes?.menuContentBorder, device ),
		...getBoxShadowCSS( attributes?.boxShadow, device ),
		...getPaddingCSS( contentPaddingUnit, 'padding', device ),
		...getBorderCSS( contentMenuBorderUnit, device ),
	};
};
export const getTabsMenuContentActiveCSS = ( attributes, device = '' ) => {
	const tabsMenuContentActiveCSS = {};

	if ( attributes?.activeColorOptions === 'background' ) {
		tabsMenuContentActiveCSS[ 'background-color' ] = `${ getTextColorCSS(
			attributes?.tabActiveBackgroundColor
		) } !important`;
	} else if ( attributes?.activeColorOptions === 'border' ) {
		tabsMenuContentActiveCSS[ 'border-color' ] = `${ getTextColorCSS(
			attributes?.activeBorderColor
		) } !important`;
	}
	return tabsMenuContentActiveCSS;
};
export const getTabsMenuContentHoverCSS = ( attributes, device = '' ) => {
	const contentMenuBorderHoverUnit = parseArgs(
		attributes?.menuContentBorder,
		{
			unitWidthH: 'px',
			unitRadiusH: 'px',
		}
	);
	return {
		...getBoxShadowHoverCSS( attributes?.boxShadow, device ),
		...getBorderHoverCSS( contentMenuBorderHoverUnit, device ),
	};
};

export const getTabsTitleCSS = ( attributes, device = '' ) => {
	const typographyValue = parseArgs( attributes.titleTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.titleTypographyGlobal
		? attributes.titleTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.titleTextColor ),
		...getTypographyCSS( typographyValue, device, typographyValueGlobal ),
	};
};
export const getTabsActiveTitleCSS = ( attributes ) => {
	const css = {};
	if ( attributes?.titleTextActiveColor ) {
		css.color = `${ getTextColorCSS(
			attributes?.titleTextActiveColor
		) } !important`;
	}
	return {
		...css,
	};
};
export const getTabsSubtitleCSS = ( attributes, device = '' ) => {
	const tabsSubtitleCSS = {};

	// Set width based on the tabsMenuPosition
	if ( attributes?.showActiveSubTitle === true ) {
		tabsSubtitleCSS.display = 'none';
	}
	const tabsContentWidthType = getResponsiveValue(
		attributes?.tabsContentWidthType,
		'value',
		device
	);
	const tabsMenuPosition = getResponsiveValue(
		attributes?.tabsMenuPositioning,
		'value',
		device
	);
	if ( device === 'Mobile' ) {
		tabsSubtitleCSS.width = '100%';
	} else if (
		( tabsMenuPosition === 'top' || tabsMenuPosition === 'bottom' ) &&
		tabsContentWidthType === 'auto'
	) {
		tabsSubtitleCSS[ 'max-width' ] = '160px';
	}

	// Apply typography settings
	const typographyValue = parseArgs( attributes.subTitleTypography, {
		weight: '400',
	} );
	const typographyValueGlobal = attributes.subTitleTypographyGlobal
		? attributes.subTitleTypographyGlobal
		: '';
	if ( typographyValue ) {
		Object.assign(
			tabsSubtitleCSS,
			getTypographyCSS( typographyValue, device, typographyValueGlobal )
		);
	}

	// Apply text color
	if ( attributes?.subTitleTextColor ) {
		tabsSubtitleCSS.color = getTextColorCSS(
			attributes?.subTitleTextColor
		);
	}

	return tabsSubtitleCSS;
};
export const getTabsActiveSubtitleTextCSS = ( attributes ) => {
	const tabsSubtitleTextActiveCSS = {};
	if ( attributes?.showActiveSubTitle === true ) {
		tabsSubtitleTextActiveCSS.display = 'block';
	}
	if ( attributes?.subTitleTextActiveColor ) {
		tabsSubtitleTextActiveCSS.color = `${ getTextColorCSS(
			attributes?.subTitleTextActiveColor
		) } !important`;
	}
	return tabsSubtitleTextActiveCSS;
};

export const getTabsContentCSS = ( attributes, device = '' ) => {
	const contentPaddingUnit = parseArgs( attributes?.contentPadding, {
		unit: 'px',
	} );
	const contentMarginUnit = parseArgs( attributes?.contentMargin, {
		unit: 'px',
	} );
	const contentBorderUnit = parseArgs( attributes?.contentBorder, {
		unitWidth: 'px',
		unitRadius: 'px',
	} );
	const tabsContentCSS = {
		...getMarginCSS( contentMarginUnit, 'margin', device ),
		...getPaddingCSS( contentPaddingUnit, 'padding', device ),
		...getBorderCSS( contentBorderUnit, device ),
	};

	// Apply max-width based on device and tabsMenuPosition
	if ( device === 'Mobile' ) {
		tabsContentCSS[ 'max-width' ] = '100%';
	} else if (
		attributes?.tabsMenuPositioning[ 'value' + device ] === 'top' ||
		attributes?.tabsMenuPositioning[ 'value' + device ] === 'bottom'
	) {
		tabsContentCSS[ 'max-width' ] = '100% !important';
	} else if (
		attributes?.tabsMenuPositioning[ 'value' + device ] === 'left' ||
		attributes?.tabsMenuPositioning[ 'value' + device ] === 'right'
	) {
		tabsContentCSS[ 'flex-grow' ] = 3;
	}
	return tabsContentCSS;
};

export const getTabsContentHoverCSS = ( attributes, device = '' ) => {
	const contentBorderHoverUnit = parseArgs( attributes?.contentBorder, {
		unitWidthH: 'px',
		unitRadiusH: 'px',
	} );
	return {
		...getBorderHoverCSS( contentBorderHoverUnit, device ),
	};
};
export const getIconPositionCSS = ( attributes, device = '' ) => {
	const iconPositionMarginUnit = parseArgs( attributes?.iconPositionMargin, {
		unit: 'px',
	} );
	return {
		...getMarginCSS( iconPositionMarginUnit, 'margin', device ),
	};
};
export const progressBarStyleCSS = ( attributes ) => {
	return {
		background: getTextColorCSS( attributes?.progressBarColor ),
	};
};

export const contentGapCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.contentGap,
			attributeObjectKey: 'value',
			defaultValue: 2,
			isResponsive: true,
			hasUnit: true,
			property: 'gap',
			unitDefaultValue: 'px',
			device,
		} ),
	};
	if ( attributes?.menuContentAlignment[ 'value' + device ] ) {
		css[ 'text-align' ] =
			attributes?.menuContentAlignment[ 'value' + device ];
	}
	return css;
};
export const getTabsWidthCSS = ( attributes, device = '' ) => {
	const tabsMenuPosition = getResponsiveValue(
		attributes?.tabsMenuPositioning,
		'value',
		device
	);
	if ( tabsMenuPosition === 'top' || tabsMenuPosition === 'bottom' ) {
		const css = {};

		css.width = getResponsiveValue(
			attributes?.tabsWidthType,
			'value',
			device
		);
		return css;
	}

	if ( tabsMenuPosition === 'left' || tabsMenuPosition === 'right' ) {
		const css = {
			...getRangeCSS( {
				attributeValue: attributes.tabsWidth,
				attributeObjectKey: 'value',
				defaultValue: 30,
				isResponsive: true,
				hasUnit: true,
				property: 'width',
				unitDefaultValue: '%',
				device,
			} ),
		};
		return css;
	}
};

export const getContentWidthCSS = ( attributes, device = '' ) => {
	const css = {
		...getRangeCSS( {
			attributeValue: attributes.contentWidth,
			attributeObjectKey: 'value',
			defaultValue: 70,
			isResponsive: true,
			hasUnit: true,
			property: 'max-width',
			unitDefaultValue: '%',
			device,
		} ),
	};
	if (
		attributes?.tabsMenuPositioning[ 'value' + device ] === 'top' ||
		attributes?.tabsMenuPositioning[ 'value' + device ] === 'bottom'
	) {
		css[ 'max-width' ] = '100% !important';
	}
	return {
		background: getTextColorCSS( attributes?.contentBackgroundColor ),
		...css,
	};
};
export const getIconSpacingCSS = ( attributes, device = '' ) => {
	let spacingCSS = {};
	if ( attributes?.iconPosition[ 'value' + device ] === 'left' ) {
		spacingCSS = {
			...getRangeCSS( {
				attributeValue: attributes.spacing,
				attributeObjectKey: 'value',
				defaultValue: 0,
				isResponsive: true,
				hasUnit: true,
				property: 'margin-right',
				unitDefaultValue: 'px',
			} ),
		};
	} else if ( attributes?.iconPosition[ 'value' + device ] === 'right' ) {
		spacingCSS = {
			...getRangeCSS( {
				attributeValue: attributes.spacing,
				attributeObjectKey: 'value',
				defaultValue: 0,
				isResponsive: true,
				hasUnit: true,
				property: 'margin-left',
				unitDefaultValue: 'px',
			} ),
		};
	} else if ( attributes?.iconPosition[ 'value' + device ] === 'bottom' ) {
		spacingCSS = {
			...getRangeCSS( {
				attributeValue: attributes.spacing,
				attributeObjectKey: 'value',
				defaultValue: 0,
				isResponsive: true,
				hasUnit: true,
				property: 'margin-top',
				unitDefaultValue: 'px',
			} ),
		};
	} else if ( attributes?.iconPosition[ 'value' + device ] === 'top' ) {
		spacingCSS = {
			...getRangeCSS( {
				attributeValue: attributes.spacing,
				attributeObjectKey: 'value',
				defaultValue: 0,
				isResponsive: true,
				hasUnit: true,
				property: 'margin-bottom',
				unitDefaultValue: 'px',
			} ),
		};
	}
	return spacingCSS;
};
