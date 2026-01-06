import { getCSS as getTypographyCSS } from '@Controls/typography/helper';
import { getCSS as getTextShadowCSS } from '@Controls/textShadow/helper';
import { getCSS as getTextStrokeCSS } from '@Controls/textStroke/helper';
import { getCSS as getRangeCSS } from '@Controls/range/helper';
import { parseArgs } from '@Utils/helper';
import { getCSS as getTextColorCSS } from '@Controls/color/helper';

export const getLabelCSS = ( attributes, device = '' ) => {
	const { labelPosition, isShowLabel, tickerLabelShape } = attributes;

	const labelCSS = {
		...getRangeCSS( {
			attributeValue: attributes?.labelPadding,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: 10,
			unitDefaultValue: 'px',
			property: 'padding',
			device,
		} ),
	};
	if ( labelPosition === 'right' ) {
		labelCSS.right = '0';
		labelCSS.left = 'auto';
	} else {
		labelCSS.left = '0';
		labelCSS.right = 'auto';
	}
	if ( isShowLabel ) {
		labelCSS.display = 'flex';
	} else {
		labelCSS.display = 'none';
	}

	switch ( tickerLabelShape ) {
		case 'small':
			labelCSS[ 'clip-path' ] =
				'polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)';
			break;
		case 'medium':
			labelCSS[ 'clip-path' ] =
				'polygon(0% 0%, 85% 0%, 100% 50%, 85% 100%, 0% 100%)';
			break;
		case 'large':
			labelCSS[ 'clip-path' ] =
				'polygon(0% 0%, 90% 0%, 100% 50%, 90% 100%, 0% 100%)';
			break;
		default:
			labelCSS[ 'clip-path' ] = '';
	}
	const typographyGlobal = attributes.labelTypographyGlobal
		? attributes.labelTypographyGlobal
		: '';
	return {
		color: getTextColorCSS( attributes?.labelColor ),
		background: getTextColorCSS( attributes?.labelBackgroundColor ),
		...labelCSS,
		...getTypographyCSS(
			attributes?.labelTypography,
			device,
			typographyGlobal
		),
		...getTextStrokeCSS( attributes?.labelTextStroke, device ),
		...getTextShadowCSS( attributes?.labelTextShadow ),
	};
};

export const getLabelHoverCSS = ( attributes ) => {
	const labelHoverCSS = {
		color: getTextColorCSS( attributes?.labelColorH ),
		background: getTextColorCSS( attributes?.labelBackgroundColorH ),
		...getRangeCSS( {
			attributeValue: attributes?.labelColorTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
		} ),
	};
	return labelHoverCSS;
};

export const getTickerColorCSS = ( attributes ) => {
	return {
		color: getTextColorCSS( attributes?.tickerColor ),
		background: getTextColorCSS( attributes?.tickerBgColor ),
	};
};

export const getTickerColorHoverCSS = ( attributes ) => {
	const tickerHoverCSS = {
		color: getTextColorCSS( attributes?.tickerColorH ),
		background: getTextColorCSS( attributes?.tickerBgColorH ),
		...getRangeCSS( {
			attributeValue: attributes?.tickerColorTransition,
			attributeObjectKey: 'value',
			defaultValue: 0,
			unitDefaultValue: 's',
			property: 'transition-duration',
		} ),
	};
	return tickerHoverCSS;
};

export const getTickerContentCSS = ( attributes, device = '' ) => {
	const { tickerHeight, isPositionSticky, stickyPosition } = attributes;
	const tickerHeightDefaultValue = parseArgs( tickerHeight, {
		value: 50,
		valueUnit: 'px',
	} );
	const tickerContentCSS = {
		...getRangeCSS( {
			attributeValue: tickerHeight,
			attributeObjectKey: 'value',
			isResponsive: true,
			hasUnit: true,
			defaultValue: tickerHeightDefaultValue.value,
			unitDefaultValue: tickerHeightDefaultValue.valueUnit,
			property: 'height',
			device,
		} ),
	};

	if ( isPositionSticky && stickyPosition === 'up' ) {
		tickerContentCSS.position = 'fixed';
		tickerContentCSS.top = '32px';
		tickerContentCSS.left = '0';
		tickerContentCSS.width = '100%';
	} else if ( isPositionSticky && stickyPosition === 'down' ) {
		tickerContentCSS.position = 'fixed';
		tickerContentCSS.bottom = '0';
		tickerContentCSS.left = '0';
		tickerContentCSS.width = '100%';
	}

	return tickerContentCSS;
};

export const getTickerNavigatorShowCSS = ( attributes ) => {
	const tickerNavigatorShowCSS = {};
	if ( attributes?.showTickerNavigator ) {
		tickerNavigatorShowCSS.display = 'flex';
	} else {
		tickerNavigatorShowCSS.display = 'none';
	}
	if ( attributes?.navigatorPosition === 'right' ) {
		tickerNavigatorShowCSS.right = '0';
		tickerNavigatorShowCSS.left = 'auto';
	} else {
		tickerNavigatorShowCSS.left = '0';
		tickerNavigatorShowCSS.right = 'auto';
	}
	return tickerNavigatorShowCSS;
};

export const getTickerNavigatorColorCSS = ( attributes ) => {
	return { background: getTextColorCSS( attributes?.navigatorBgColor ) };
};

export const getTickerListStylesCSS = ( attributes, device ) => {
	const tickerListStylesCSS = {};

	switch ( attributes?.tickerListStyle ) {
		case 'none':
			tickerListStylesCSS[ 'list-style' ] = 'none';
			break;
		case 'circle':
			tickerListStylesCSS[ 'list-style' ] = 'circle';
			break;
		case 'box':
			tickerListStylesCSS[ 'list-style' ] = 'square';
			break;
		default:
			tickerListStylesCSS[ 'list-style' ] = 'none';
	}
	const typographyGlobal = attributes.tickerTypographyGlobal
		? attributes.tickerTypographyGlobal
		: '';
	return {
		...tickerListStylesCSS,
		...getTypographyCSS(
			attributes?.tickerTypography,
			device,
			typographyGlobal
		),
		...getTextStrokeCSS( attributes?.tickerTextStroke, device ),
		...getTextShadowCSS( attributes?.tickerTextShadow ),
	};
};

export const getShowTimeCSS = ( attributes ) => {
	const timeShowCSS = {};
	if ( attributes?.isShowTime ) {
		timeShowCSS.display = 'inline';
	} else {
		timeShowCSS.display = 'none';
	}
	return timeShowCSS;
};
